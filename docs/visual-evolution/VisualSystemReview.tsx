/** Development-only specimen. Not imported by any product route. No operational data. */
import {
  VisualSurface, SectionHeading, VisualButton, VisualLink, VisualCard, VisualGrid,
  StatusIndicator, DisciplineLabel, ImagePanel, EventTile, RoutePanel,
  SponsorSurface, ParticipantCard,
} from '@/components/visual-system'

export default function VisualSystemReview() {
  return <main id="main-content" style={{ maxWidth: 1440, margin: 'auto' }}>
    <h1 style={{ padding: 24, background: 'white', color: '#0d1b3d' }}>Visual system review — no event data or operations</h1>
    {(['public', 'participant', 'admin'] as const).map(mode =>
      <VisualSurface key={mode} mode={mode} style={{ padding: 'clamp(16px, 3vw, 40px)' }}>
        <SectionHeading eyebrow={mode} title="Movement. Community. Purpose.">
          <p>Presentation specimen. Availability and permissions remain owned by each real journey.</p>
        </SectionHeading>
        <VisualGrid>
          {(['swim', 'bike', 'run'] as const).map(discipline => <EventTile key={discipline} discipline={discipline}
            title="A long event heading that wraps on a small screen"
            action={<VisualLink href="/course-map">View existing course information</VisualLink>}>
            <p>Approved information is supplied by Tour. No sample route or distance is displayed.</p>
          </EventTile>)}
          <RoutePanel title="Course publication" status={<StatusIndicator>Not published</StatusIndicator>}>
            <p>Geometry remains with the existing course-map contract.</p>
          </RoutePanel>
          <ParticipantCard name="Identity supplied by the authorized caller" status={<StatusIndicator tone="info">Read only specimen</StatusIndicator>}>
            <p>No participant record, bib, story or consent is inferred here.</p>
          </ParticipantCard>
          <SponsorSurface name="Approved name supplied by caller" tier="Approved tier supplied by caller">
            <p>This specimen does not identify or claim a sponsor.</p>
          </SponsorSurface>
          <VisualCard>
            <p id={`${mode}-reason`}>Operation unavailable in a design specimen.</p>
            <VisualButton disabled aria-describedby={`${mode}-reason`}>Unavailable action</VisualButton>
            <VisualLink variant="secondary" href="/race-info">Race information</VisualLink>
            <VisualLink variant="quiet" href="/privacy">Privacy</VisualLink>
          </VisualCard>
          <VisualCard>
            <StatusIndicator tone="success">Success label specimen</StatusIndicator>{' '}
            <StatusIndicator tone="warning">Warning label specimen</StatusIndicator>{' '}
            <StatusIndicator tone="danger">Error label specimen</StatusIndicator>{' '}
            <DisciplineLabel discipline="swim" />
          </VisualCard>
          <ImagePanel src="/assets/auth/dar-city-bridge.jpg" alt="Dar es Salaam waterfront and bridge"
            caption="Existing repository image; provenance still requires the asset-register review." />
        </VisualGrid>
        <VisualSurface mode={mode} tone="dark" style={{ padding: 24, marginTop: 24 }}>
          <SectionHeading level={3} title="Readable after dark" />
          <ParticipantCard name="Long content remains readable and wraps without changing identity permissions">
            <VisualLink href="/privacy">Read privacy information</VisualLink>
          </ParticipantCard>
        </VisualSurface>
      </VisualSurface>,
    )}
  </main>
}
