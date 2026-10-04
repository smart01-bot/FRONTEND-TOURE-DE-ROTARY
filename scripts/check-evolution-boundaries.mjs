import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { resolve, relative, join } from 'node:path'
const root = fileURLToPath(new URL('../', import.meta.url))
const baseline = JSON.parse(readFileSync(resolve(root, 'docs/visual-evolution/PROTECTED-BASELINE.json'), 'utf8'))
const failures = []
for (const [file, expected] of Object.entries(baseline.files)) {
  try {
    const actual = createHash('sha256').update(readFileSync(resolve(root, file))).digest('hex')
    if (actual !== expected) failures.push(`Protected file changed: ${file}`)
  } catch { failures.push(`Protected file missing: ${file}`) }
}
function pages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? pages(path) : entry.name === 'page.tsx' ? [relative(root, path)] : []
  })
}
const actualRoutes = pages(resolve(root, 'src/app')).sort()
if (JSON.stringify(actualRoutes) !== JSON.stringify(baseline.routes)) failures.push('Route inventory changed; review additive routes and update the documented contract explicitly.')
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else console.log(`Protected boundary PASS: ${Object.keys(baseline.files).length} files unchanged; ${actualRoutes.length} route files retained.`)
