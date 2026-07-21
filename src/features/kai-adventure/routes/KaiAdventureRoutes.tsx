import { Link, Navigate, Route, Routes } from "react-router-dom";

function ScaffoldScreen() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-background px-6 py-12 text-foreground">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/70 blur-3xl" />
      </div>
      <section className="relative mx-auto flex w-full max-w-5xl flex-col justify-end pb-8 md:pb-16" aria-labelledby="scaffold-title">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">A Heart Hero Expansion</p>
        <h1 id="scaffold-title" className="max-w-3xl font-display text-5xl font-bold leading-[0.96] tracking-tight md:text-7xl">
          Kai's Adventure is waking up.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          The path is mapped. The first light arrives in the next build phase.
        </p>
        <Link
          to="/map"
          className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-border bg-secondary px-6 py-3 font-bold text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Check the map route
        </Link>
      </section>
    </main>
  );
}

export function KaiAdventureRoutes() {
  return (
    <Routes>
      <Route index element={<ScaffoldScreen />} />
      <Route path="map" element={<ScaffoldScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
