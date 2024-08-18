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

    const plant = await prisma.plant.findUnique({
      where: { id },
    });

    if (plant?.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.plant.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Plant deleted successfully" });
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
    const { type, variety, quantity, datePlanted, harvestDate, status, notes } = await req.json();

    const plant = await prisma.plant.findUnique({
      where: { id },
    });

    if (plant?.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedPlant = await prisma.plant.update({
      where: { id },
      data: {
        type,
        variety,
        quantity,
        datePlanted: new Date(datePlanted),
        harvestDate: new Date(harvestDate),
        status,
        notes,
      },
    });

    return NextResponse.json(updatedPlant);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
