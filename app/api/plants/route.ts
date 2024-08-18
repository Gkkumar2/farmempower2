import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const plants = await prisma.plant.findMany({
      where: { userId },
    });
    return NextResponse.json(plants);
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
      const body = await req.json();
      console.log('Request body:', body);  // Log the request body for debugging
  
      const { type, variety, quantity, datePlanted, harvestDate, status, notes } = body;
  
      // Additional validation to check for missing fields
      if (!type || !variety || !quantity || !datePlanted || !harvestDate || !status) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      const newPlant = await prisma.plant.create({
        data: {
          userId,
          type,
          variety,
          quantity: parseInt(quantity, 10),  // Ensure quantity is an integer
          datePlanted: new Date(datePlanted),
          harvestDate: new Date(harvestDate),
          status,
          notes,
        },
      });
  
      return NextResponse.json(newPlant);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error('Error creating plant:', errorMessage);  // Log the error message for debugging
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }