import React from "react"

export const metadata = {
  title: "Penetration Test Results",
}

export default function PtResults() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Penetration Test Results</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Rate Limiting</h2>
        <p className="text-muted-foreground">Repeated requests to <code>/api/projects</code> triggered Arcjet rate limiting after 5 requests. See reproduction script <code>scripts/run-rate-test.sh</code>.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Bot Detection</h2>
        <p className="text-muted-foreground">Requests with User-Agent <code>Googlebot</code> and <code>BadBot</code> were blocked (403) by Arcjet detectBot rules.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">SQLi / XSS Tests</h2>
        <p className="text-muted-foreground">SQLMap probes and crafted POST payloads were blocked by Arcjet Shield and the API returned safe responses. Prisma prevents SQLi via parameterized queries.</p>
      </section>
    </main>
  )
}
