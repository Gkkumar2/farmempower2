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

    const resource = await prisma.resourceT.findUnique({
      where: { id },
    });

    if (resource?.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.resourceT.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Resource deleted successfully" });
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
    const { name,category, quantity, acquisitionDate, condition, notes } = await req.json();

    const resource = await prisma.resourceT.findUnique({
      where: { id },
    });

    if (resource?.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedResource = await prisma.resourceT.update({
      where: { id },
      data: {
        name,
        category,
        quantity,
        acquisitionDate: new Date(acquisitionDate),
        condition,
        notes,
      },
    });

    return NextResponse.json(updatedResource);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
