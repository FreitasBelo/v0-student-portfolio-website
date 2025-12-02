import React from "react"
import Link from "next/link"

export const metadata = {
  title: "Security — Portfolio",
  description: "Security dashboard and penetration testing results",
}

export default function SecurityPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Security & Protection</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-muted-foreground">
          This section summarizes the security work for the portfolio: WAF/Arcjet protection,
          rate limiting, bot detection, and MCP integration demonstrations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Live Protections</h2>
        <ul className="list-disc ml-6">
          <li>Arcjet — Shield, Bot Detection, Token Bucket rate limits</li>
          <li>Clerk — Authentication for admin routes</li>
          <li>Prisma + Neon — Secure DB access with parameterized queries</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Penetration Test Results</h2>
        <p className="text-muted-foreground">See the detailed test results and reproduction steps:</p>
        <Link href="/security/pt-results" className="text-primary hover:underline">Penetration Test Results</Link>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">MCP Integration</h2>
        <p className="text-muted-foreground">Interactive MCP tool-calling demos and OAuth flow examples:</p>
        <Link href="/mcp-integration" className="text-primary hover:underline">MCP Integration Demo</Link>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Executive Dashboard</h2>
        <p className="text-muted-foreground">Download a summary report or open the dashboard for metrics.</p>
        <Link href="/admin/security/dashboard" className="text-primary hover:underline">Open Security Dashboard</Link>
      </section>
    </main>
  )
}
