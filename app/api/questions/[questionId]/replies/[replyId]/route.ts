// api/questions/[questionId]/replies/[replyId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { questionId: string, replyId: string } }) {
  const { replyId } = params;

  try {
    const deletedReply = await prisma.reply.delete({
      where: { id: replyId },
    });

    return NextResponse.json({ deletedReply }, { status: 200 });
  } catch (error) {
    console.error('Error deleting reply:', error);
    return NextResponse.json({ error: 'Failed to delete reply' }, { status: 500 });
  }
}
