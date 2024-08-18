import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resources = await prisma.resourceT.findMany({
      where: { userId },
    });
    return NextResponse.json(resources);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {name, category, quantity, acquisitionDate, condition, notes } = await req.json();

    if (!category || quantity === undefined || !acquisitionDate || !condition) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newResource = await prisma.resourceT.create({
      data: {
        name,
        userId,
        category,
        quantity: parseInt(quantity, 10),
        acquisitionDate: new Date(acquisitionDate),
        condition,
        notes,
      },
    });

    return NextResponse.json(newResource);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
