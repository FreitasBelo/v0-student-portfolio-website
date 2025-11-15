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
    const experience = await prisma.experience.findUnique({
      where: { id },
    })
    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experience" },
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
    const experience = await prisma.experience.update({
      where: { id },
      data: {
        company: data.company,
        position: data.position,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        current: data.current,
        order: data.order,
      },
    })
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update experience" },
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
    await prisma.experience.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Experience deleted" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    )
  }
}
