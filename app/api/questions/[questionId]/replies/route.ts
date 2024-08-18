// api/questions/[questionId]/replies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

// POST: Add a reply to a question
export async function POST(req: NextRequest) {
  try {
    const { content, email, userName, profileImg } = await req.json();
    const questionId = req.url.split('/').slice(-2, -1)[0]; // Extract questionId from URL

    const reply = await prisma.reply.create({
      data: {
        content,
        email,
        userName,
        profileImg,
        questionId,
      },
    });

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
  }
}

// GET: Fetch all replies for a specific question
export async function GET(req: NextRequest) {
  try {
    const questionId = req.url.split('/').slice(-2, -1)[0]; // Extract questionId from URL

    const replies = await prisma.reply.findMany({
      where: { questionId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ replies }, { status: 200 });
  } catch (error) {
    console.error('Error fetching replies:', error);
    return NextResponse.json({ error: 'Failed to fetch replies' }, { status: 500 });
  }
}

