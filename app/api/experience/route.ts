import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experience" },
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
    const experience = await prisma.experience.create({
      data: {
        company: data.company,
        position: data.position,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        current: data.current || false,
        order: data.order || 0,
      },
    })
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    )
  }
}
