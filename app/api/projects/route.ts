import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { apiProtection, adminProtection } from "@/lib/arcjet"

export async function GET(request: Request) {
  // Arcjet API protection for read operations
  const decision = await apiProtection.protect(request, { requested: 1 })
  
  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  // Arcjet admin protection for mutations
  const decision = await adminProtection.protect(request, { requested: 1 })
  
  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }

  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image || null,
        link: data.link || null,
        github: data.github || null,
        tags: data.tags || [],
        featured: data.featured || false,
        order: data.order || 0,
      },
    })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
