import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { apiProtection, adminProtection } from "@/lib/arcjet"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Arcjet API protection for read operations
  const decision = await apiProtection.protect(request, { requested: 1 })
  
  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }

  try {
    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id },
    })
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    const data = await request.json()
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link,
        github: data.github,
        tags: data.tags,
        featured: data.featured,
        order: data.order,
      },
    })
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    await prisma.project.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Project deleted" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
