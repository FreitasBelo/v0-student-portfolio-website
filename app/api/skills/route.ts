import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET() {
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
  try {
    const session = await auth()
    if (!session) {
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
