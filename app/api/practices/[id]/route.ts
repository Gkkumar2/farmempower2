import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
    }

    const practice = await prisma.practice.findUnique({
      where: { id },
      include: {
        stepsInvolved: true,
        examples: true,
        additionalResources: true,
      },
    });

    if (!practice) {
      return NextResponse.json({ error: 'Practice not found' }, { status: 404 });
    }

    return NextResponse.json(practice, { status: 200 });
  } catch (error) {
    console.error('Error fetching practice:', error);
    return NextResponse.json({ error: 'Failed to fetch practice details' }, { status: 500 });
  }
}
