'use client'

import { forwardRef, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import {
  Bus,
  CircleParking,
  ClipboardCheck,
  Cross,
  Droplets,
  Flag,
  LocateFixed,
  MapPin,
  Minus,
  Plus,
  RefreshCw,
  Route,
  ShieldCheck,
  Users,
} from 'lucide-react'
import {
  COURSE_MAP_LAYERS,
  COURSE_MAP_MARKERS,
  COURSE_ROUTES,
  COURSE_SEQUENCE,
  MAP_MARKER_LEGEND,
  getCourseMapLayer,
  type CourseMapMarker,
  type CourseMapView,
  type CourseRoute,
  type MapCoordinate,
  type MapMarkerKind,
} from '@/config/course-map'

type Connectivity = 'checking' | 'online' | 'offline'

const MARKER_ICONS: Record<MapMarkerKind, typeof MapPin> = {
  start: Flag,
  finish: Flag,
  transition: RefreshCw,
  safety: ShieldCheck,
  aid: Cross,
  hydration: Droplets,
  medical: Cross,
  parking: CircleParking,
  transport: Bus,
  spectator: Users,
  'check-in': ClipboardCheck,
  landmark: MapPin,
}

export default function CourseMapExperience() {
  const [activeView, setActiveView] = useState<CourseMapView>('swim')
  const [connectivity, setConnectivity] = useState<Connectivity>('checking')
  const [fitRequest, setFitRequest] = useState(0)
  const [userCoordinate, setUserCoordinate] = useState<MapCoordinate | null>(null)
  const [locationMessage, setLocationMessage] = useState('')
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateConnectivity = () => setConnectivity(navigator.onLine ? 'online' : 'offline')
    updateConnectivity()
    window.addEventListener('online', updateConnectivity)
    window.addEventListener('offline', updateConnectivity)
    return () => {
      window.removeEventListener('online', updateConnectivity)
      window.removeEventListener('offline', updateConnectivity)
    }
  }, [])

  const layer = getCourseMapLayer(activeView)
  const routes = useMemo(
    () => COURSE_ROUTES.filter(route => route.views.includes(activeView)),
    [activeView],
  )
  const markers = useMemo(
    () => COURSE_MAP_MARKERS.filter(marker => marker.views.includes(activeView)),
    [activeView],
  )
  const hasMapData = routes.some(route => route.coordinates.length >= 2) || markers.length > 0

  function changeView(view: CourseMapView) {
    setActiveView(view)
    setUserCoordinate(null)
    setLocationMessage('')
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = COURSE_MAP_LAYERS.length - 1
    let nextIndex: number | null = null
    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = lastIndex
    if (nextIndex === null) return

    event.preventDefault()
    const nextView = COURSE_MAP_LAYERS[nextIndex].id
    changeView(nextView)
    document.getElementById(`course-map-tab-${nextView}`)?.focus()
  }

  function fitRoute() {
    if (!hasMapData) return
    setFitRequest(current => current + 1)
    canvasRef.current?.focus()
    setLocationMessage(`${layer.label} map fitted to the published data.`)
  }

  function requestLocation() {
    if (!hasMapData) return
    if (!('geolocation' in navigator)) {
      setLocationMessage('Location is not available in this browser.')
      return
    }

    setLocationMessage('Checking your location…')
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserCoordinate([position.coords.longitude, position.coords.latitude])
        setLocationMessage('Your location is shown for this visit only.')
      },
      () => setLocationMessage('Location was not shared. You can continue without it.'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    )
  }

  return (
    <section aria-labelledby="course-map-heading" className="bg-sand px-5 py-6">
      <div className="mx-auto max-w-wide">
        <h2 id="course-map-heading" className="sr-only">Interactive course map</h2>

        <div className="rounded-card bg-white p-2 shadow-card" role="tablist" aria-label="Map view">
          <div className="grid grid-cols-4 gap-1">
            {COURSE_MAP_LAYERS.map((option, index) => {
              const active = option.id === activeView
              return (
                <button
                  key={option.id}
                  type="button"
                  id={`course-map-tab-${option.id}`}
                  role="tab"
                  aria-selected={active}
                  aria-controls="course-map-panel"
                  onClick={() => changeView(option.id)}
                  onKeyDown={event => handleTabKey(event, index)}
                  className={`min-h-12 rounded-button px-1.5 font-sans text-[10px] font-bold uppercase tracking-[.05em] transition-colors sm:text-caption ${active ? 'bg-navy text-white' : 'text-ink-muted hover:bg-sand'}`}
                >
                  <span aria-hidden className="mx-auto mb-1 block h-1 w-6 rounded-pill" style={{ backgroundColor: option.colour }} />
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Race sequence">
          {COURSE_SEQUENCE.map((step, index) => (
            <div key={`${step.label}-${index}`} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeView(step.view)}
                className={`min-h-11 rounded-pill border px-3 font-num text-[11px] font-bold ${activeView === step.view ? 'border-bronze bg-bronze text-navy' : 'border-sand-dark bg-white text-navy'}`}
              >
                {step.label}
              </button>
              {index < COURSE_SEQUENCE.length - 1 && <span aria-hidden className="text-ink-ghost">→</span>}
            </div>
          ))}
        </div>

        {connectivity === 'offline' && (
          <div role="status" className="mt-4 rounded-card border border-bronze/35 bg-bronze-50 px-4 py-3 font-sans text-caption text-navy">
            You are offline. Published map data already loaded with this page remains available; updates require a connection.
          </div>
        )}

        <div
          id="course-map-panel"
          role="tabpanel"
          aria-labelledby={`course-map-tab-${activeView}`}
          className="mt-4 overflow-hidden rounded-card bg-white shadow-card lg:grid lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,.75fr)]"
        >
          <div className="relative min-w-0 bg-navy-900 p-3 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[.08em] text-white/45">Active view</p>
                <p className="mt-1 font-serif text-[20px] font-bold text-white">{layer.label}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={fitRoute}
                  disabled={!hasMapData}
                  title={!hasMapData ? 'Official route geometry is not published' : undefined}
                  className="inline-flex min-h-11 items-center gap-2 rounded-button border border-white/20 px-3 font-sans text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Route size={15} aria-hidden /> Fit route
                </button>
                <button
                  type="button"
                  onClick={requestLocation}
                  disabled={!hasMapData}
                  title={!hasMapData ? 'Location becomes available after a verified map is published' : undefined}
                  className="inline-flex min-h-11 items-center gap-2 rounded-button border border-white/20 px-3 font-sans text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <LocateFixed size={15} aria-hidden /> My location
                </button>
              </div>
            </div>

            {connectivity === 'checking' ? (
              <MapLoading />
            ) : (
              <CourseMapCanvas
                ref={canvasRef}
                routes={routes}
                markers={markers}
                layerColour={layer.colour}
                unavailableReason={layer.unavailableReason}
                fitRequest={fitRequest}
                userCoordinate={userCoordinate}
              />
            )}

            {locationMessage && (
              <p className="mt-3 font-sans text-caption text-white/65" aria-live="polite">{locationMessage}</p>
            )}
          </div>

          <aside className="relative z-10 -mt-4 rounded-t-[24px] bg-white px-5 pb-5 pt-6 font-sans text-body-sm text-ink-muted lg:mt-0 lg:rounded-none lg:border-l lg:border-sand-dark">
            <p className="font-serif text-[19px] font-bold text-navy">{layer.label} details</p>
            <p className="mt-2 leading-relaxed">{layer.description}</p>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-card bg-sand p-3">
                <dt className="text-caption text-ink-subtle">Routes published</dt>
                <dd className="mt-1 font-num text-[18px] font-bold text-navy">{routes.length}</dd>
              </div>
              <div className="rounded-card bg-sand p-3">
                <dt className="text-caption text-ink-subtle">Locations published</dt>
                <dd className="mt-1 font-num text-[18px] font-bold text-navy">{markers.length}</dd>
              </div>
            </dl>

            {!hasMapData && (
              <div className="mt-4 rounded-card border border-sand-dark bg-sand-light p-4">
                <p className="font-bold text-navy">Map unavailable</p>
                <p className="mt-1 leading-relaxed">{layer.unavailableReason}</p>
              </div>
            )}

            <div className="mt-5">
              <p className="font-bold text-navy">Transitions in this view</p>
              <ul className="mt-2 space-y-2">
                {layer.relatedTransitions.map(transition => (
                  <li key={transition} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                    <span>{transition} · location TBD</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="font-bold text-navy">Source status</p>
              <p className="mt-1 leading-relaxed">
                {hasMapData ? 'Published records include their organiser source and review date.' : 'No reviewed organiser map source is published for this view.'}
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <MapLegend />
          <AccessibleMapList routes={routes} markers={markers} unavailableReason={layer.unavailableReason} />
        </div>
      </div>
    </section>
  )
}

function MapLoading() {
  return (
    <div role="status" aria-label="Loading map status" className="flex min-h-[390px] animate-pulse items-center justify-center rounded-card border border-white/10 bg-white/[.04] sm:min-h-[500px]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 rounded-full bg-white/10" />
        <p className="mt-3 font-sans text-caption text-white/45">Loading map status…</p>
      </div>
    </div>
  )
}

type CanvasProps = {
  routes: readonly CourseRoute[]
  markers: readonly CourseMapMarker[]
  layerColour: string
  unavailableReason: string
  fitRequest: number
  userCoordinate: MapCoordinate | null
}

const CourseMapCanvas = forwardRef<HTMLDivElement, CanvasProps>(function CourseMapCanvas(
  { routes, markers, layerColour, unavailableReason, fitRequest, userCoordinate },
  ref,
) {
  const [zoom, setZoom] = useState(1)

  useEffect(() => setZoom(1), [fitRequest, routes, markers])

  const routeCoordinates = routes.flatMap(route => [...route.coordinates])
  const coordinates = [...routeCoordinates, ...markers.map(marker => marker.coordinate)]
  const project = createProjection(coordinates)
  const hasMapData = coordinates.length > 0

  return (
    <div ref={ref} tabIndex={-1} className="relative min-h-[390px] overflow-hidden rounded-card border border-white/10 bg-[#0a1630] sm:min-h-[500px]">
      <svg viewBox="0 0 1000 600" className="absolute inset-0 h-full w-full" role="img" aria-label={hasMapData ? 'Published course geometry and event locations' : 'Course map unavailable'}>
        <defs>
          <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,.045)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1000" height="600" fill="url(#map-grid)" />
        {hasMapData && (
          <g transform={`translate(500 300) scale(${zoom}) translate(-500 -300)`}>
            {routes.map(route => (
              <polyline
                key={route.id}
                points={route.coordinates.map(coordinate => project(coordinate).join(',')).join(' ')}
                fill="none"
                stroke={layerColour}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              >
                <title>{route.name}</title>
              </polyline>
            ))}
            {markers.map(marker => {
              const [x, y] = project(marker.coordinate)
              const colour = MAP_MARKER_LEGEND.find(item => item.kind === marker.kind)?.colour ?? '#C8953C'
              return (
                <g key={marker.id} transform={`translate(${x} ${y})`}>
                  <circle r="15" fill={colour} stroke="white" strokeWidth="4" vectorEffect="non-scaling-stroke" />
                  <title>{marker.name}</title>
                </g>
              )
            })}
            {userCoordinate && (() => {
              const [x, y] = project(userCoordinate)
              return (
                <g transform={`translate(${x} ${y})`}>
                  <circle r="22" fill="rgba(79,195,247,.25)" />
                  <circle r="8" fill="#4FC3F7" stroke="white" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                  <title>Your approximate location</title>
                </g>
              )
            })()}
          </g>
        )}
      </svg>

      {!hasMapData && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="max-w-sm">
            <MapPin className="mx-auto text-bronze" size={34} strokeWidth={1.6} aria-hidden />
            <p className="mt-4 font-serif text-[22px] font-bold text-white">Course map unavailable</p>
            <p className="mt-2 font-sans text-body-sm leading-relaxed text-white/55">{unavailableReason}</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-3 right-3 flex flex-col gap-2">
        <button type="button" onClick={() => setZoom(value => Math.min(3, value + 0.5))} disabled={!hasMapData || zoom >= 3} aria-label="Zoom in" className="flex h-11 w-11 items-center justify-center rounded-button border border-white/15 bg-navy text-white shadow-card disabled:cursor-not-allowed disabled:opacity-35">
          <Plus size={18} aria-hidden />
        </button>
        <button type="button" onClick={() => setZoom(value => Math.max(1, value - 0.5))} disabled={!hasMapData || zoom <= 1} aria-label="Zoom out" className="flex h-11 w-11 items-center justify-center rounded-button border border-white/15 bg-navy text-white shadow-card disabled:cursor-not-allowed disabled:opacity-35">
          <Minus size={18} aria-hidden />
        </button>
      </div>

      <p className="absolute bottom-3 left-3 rounded-pill bg-navy/90 px-3 py-2 font-sans text-[10px] font-semibold text-white/55">
        Dar es Salaam · verified event data only
      </p>
    </div>
  )
})

function createProjection(coordinates: readonly MapCoordinate[]) {
  if (coordinates.length === 0) {
    return (coordinate: MapCoordinate): [number, number] => {
      void coordinate
      return [500, 300]
    }
  }

  const longitudes = coordinates.map(coordinate => coordinate[0])
  const latitudes = coordinates.map(coordinate => coordinate[1])
  const minLongitude = Math.min(...longitudes)
  const maxLongitude = Math.max(...longitudes)
  const minLatitude = Math.min(...latitudes)
  const maxLatitude = Math.max(...latitudes)
  const longitudeSpan = Math.max(maxLongitude - minLongitude, 0.001)
  const latitudeSpan = Math.max(maxLatitude - minLatitude, 0.001)

  return ([longitude, latitude]: MapCoordinate): [number, number] => [
    80 + ((longitude - minLongitude) / longitudeSpan) * 840,
    520 - ((latitude - minLatitude) / latitudeSpan) * 440,
  ]
}

function MapLegend() {
  return (
    <section className="rounded-card bg-white p-5 shadow-card" aria-labelledby="map-legend-heading">
      <h3 id="map-legend-heading" className="font-serif text-[19px] font-bold text-navy">Map legend</h3>
      <p className="mt-1 font-sans text-caption text-ink-subtle">Markers appear only after their locations are verified.</p>
      <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3">
        {MAP_MARKER_LEGEND.map(item => {
          const Icon = MARKER_ICONS[item.kind]
          return (
            <li key={item.kind} className="flex min-w-0 items-center gap-2 font-sans text-caption text-ink-muted">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: item.colour }}>
                <Icon size={14} aria-hidden />
              </span>
              <span className="truncate">{item.label}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function AccessibleMapList({ routes, markers, unavailableReason }: { routes: readonly CourseRoute[]; markers: readonly CourseMapMarker[]; unavailableReason: string }) {
  return (
    <section className="rounded-card bg-white p-5 shadow-card" aria-labelledby="map-list-heading">
      <h3 id="map-list-heading" className="font-serif text-[19px] font-bold text-navy">Route and location list</h3>
      <p className="mt-1 font-sans text-caption text-ink-subtle">Text alternative to the visual map.</p>
      {routes.length === 0 && markers.length === 0 ? (
        <p className="mt-4 rounded-card bg-sand p-4 font-sans text-body-sm leading-relaxed text-ink-muted">{unavailableReason}</p>
      ) : (
        <div className="mt-4 space-y-4 font-sans text-body-sm text-ink-muted">
          {routes.map(route => (
            <article key={route.id}>
              <p className="font-bold text-navy">{route.name}</p>
              <p className="mt-1">{route.description}</p>
              <p className="mt-1 text-caption">Source: {route.source} · reviewed {route.reviewedOn}</p>
            </article>
          ))}
          {markers.map(marker => (
            <article key={marker.id}>
              <p className="font-bold text-navy">{marker.name}</p>
              <p className="mt-1">{marker.description}</p>
              <p className="mt-1 text-caption">Source: {marker.source} · reviewed {marker.reviewedOn}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
