"use client"
import React from "react"

const sample = `POST /api/mcp/demo\nContent-Type: application/json\n\n{ "action": "inspect_url", "url": "https://example.com" }\n\nResponse: {"status":"ok","inspected":true}`

export default function McpDemo() {
  return (
    <div className="p-4 bg-muted rounded-md">
      <p className="mb-2">MCP Demo (mocked):</p>
      <pre className="text-sm bg-surface rounded p-2 overflow-auto">{sample}</pre>
      <p className="mt-2 text-muted-foreground">This component shows a mocked tool-call for presentations. Use the API endpoint to integrate real MCP calls.</p>
    </div>
  )
}
