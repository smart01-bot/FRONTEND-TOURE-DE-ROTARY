'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Tour de Dar — useStories Hook
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useMemo } from 'react'
import { getPublicStories } from '@/lib/supabase/stories'
import type { PublicStory } from '@/lib/supabase/stories'
import type { Category } from '@/types'

export function useStories() {
  const [stories, setStories] = useState<PublicStory[]>([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState<Category | 'all'>('all')

  const reload = useCallback(async () => {
    const data = await getPublicStories()
    setStories(data)
    setLoading(false)
  }, [])

  useEffect(() => { void reload() }, [reload])

  const filtered = useMemo(
    () => (filter === 'all' ? stories : stories.filter(s => s.category === filter)),
    [stories, filter],
  )

  return { stories: filtered, allCount: stories.length, loading, filter, setFilter }
}
