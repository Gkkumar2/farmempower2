
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../utils/prisma";

export const getBoardIdForUser = async () => {
  const {userId}: {userId: string | null} = auth()
  const board = await prisma.kanbanBoard.findFirst({
    where: {userId: userId!}
  })

  return board ? board.id : null
}