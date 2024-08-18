// api/questions/[questionId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { questionId: string } }) {
  const { questionId } = params;

  try {
    const deletedQuestion = await prisma.question.delete({
      where: { id: questionId },
    });

    return NextResponse.json({ deletedQuestion }, { status: 200 });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 });
  }
}
