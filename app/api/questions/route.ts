// api/questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

export async function POST(req: NextRequest) {
  try {
    const { title, content, category, email, userName, profileImg } = await req.json();

    const question = await prisma.question.create({
      data: {
        title,
        content,
        category,
        email,
        userName,
        profileImg,
      },
    });

    return NextResponse.json({ question }, { status: 200 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        createdAt: 'desc', // Order by createdAt in descending order (newest first)
      },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        email: true,
        userName: true,
        profileImg: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
