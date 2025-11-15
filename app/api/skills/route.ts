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
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
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
    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        category: data.category,
        level: data.level || 50,
        order: data.order || 0,
      },
    })
    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    )
  }
}
