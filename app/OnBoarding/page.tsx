

import { getBoardIdForUser } from "@/app/actions/getBoardId";
import OnboardingForm from "../(auth)/components/OnBoardingForm";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const boardId = await getBoardIdForUser();
  const user = await currentUser();
  const userName = user?.firstName ?? "";
  return (
    <div className="bg-[url('/bg.jpeg')] h-[102vh] relative w-full bg-cover mt-[75px] overflow-hidden">
      <OnboardingForm user={userName} boardId={boardId} />
    </div>
  );
};

export default page;