import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;

    const livestock = await prisma.livestock.findUnique({
      where: { id },
    });

    if (livestock?.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.livestock.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Livestock deleted successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const { type, breed, quantity, dateAcquired, age, healthStatus, notes } = await req.json();

    const livestock = await prisma.livestock.findUnique({
      where: { id },
    });

    if (livestock?.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedLivestock = await prisma.livestock.update({
      where: { id },
      data: {
        type,
        breed,
        quantity,
        dateAcquired: new Date(dateAcquired),
        age,
        healthStatus,
        notes,
      },
    });

    return NextResponse.json(updatedLivestock);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
