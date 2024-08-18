import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const livestock = await prisma.livestock.findMany({
      where: { userId },
    });
    return NextResponse.json(livestock);
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
    const { type, breed, quantity, dateAcquired, age, healthStatus, notes } = await req.json();

    if (!type || !breed || !quantity || !dateAcquired || !age || !healthStatus) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newLivestock = await prisma.livestock.create({
      data: {
        userId,
        type,
        breed,
        quantity: parseInt(quantity, 10),
        dateAcquired: new Date(dateAcquired),
        age: parseInt(age, 10),
        healthStatus,
        notes,
      },
    });

    return NextResponse.json(newLivestock);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
