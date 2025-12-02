import React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

const McpDemo = dynamic(() => import("../../components/mcp-demo"), { ssr: false })

export const metadata = {
  title: "MCP Integration",
  description: "Demonstrations of MCP tool-calling and OAuth flows",
}

export default function McpIntegrationPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">MCP Integration</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="text-muted-foreground">This page demonstrates mocked MCP tool-calling and OAuth flows for presentations.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Interactive Demo</h2>
        <McpDemo />
      </section>

      <section>
        <h2 className="text-lg font-semibold">Resources</h2>
        <ul className="list-disc ml-6">
          <li><Link href="/security/pt-results" className="text-primary">Penetration Test Results</Link></li>
          <li><Link href="/security" className="text-primary">Security Landing</Link></li>
        </ul>
      </section>
    </main>
  )
}
