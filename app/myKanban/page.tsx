import { auth } from "@clerk/nextjs/server";
import { prisma } from "../utils/prisma";
import { redirect } from "next/navigation";
import Board from "@/components/Boards";

const page = async () => {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    // If userId is null or undefined, redirect to the sign-in page
    redirect('/sign-in');
    return null;
  }

  const board = await prisma.kanbanBoard.findFirst({
    where: {
      userId: userId!,
    },
    include: {
      tasks: true,
    },
  });

  return (
    <>
      <Board board={board} />
    </>
  );
};

export default page;
