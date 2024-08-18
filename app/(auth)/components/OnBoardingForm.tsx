"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SyncLoader from "react-spinners/SyncLoader";
import toast from "react-hot-toast";
import { createNewBoard, createTask } from "@/app/actions/boardAction";
import Input from "@/components/ui/inputs";
import Button from "@/components/ui/buttons";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const OnboardingForm = ({
  user,
  boardId,
}: {
  user: string | null | undefined;
  boardId: string | null;
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (boardId !== null) {
      router.replace("/myKanban");
    }
  }, []);

  const stepOneSubmit = () => {
    setStep(2);
  };

  const stepTwoSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      router.replace("/myKanban");
      toast.success(`Welcome to your new board ${user}`);
      setLoading(false);
    }, 5000);
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-[500px] items-center justify-center pt-[82px] w-[90%] mx-auto max-w-[1450px] text-gray-900 bg-gray-100 dark:bg-gray-800"
    >
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          <h1 className="mb-10 text-4xl font-bold uppercase text-gray-900 dark:text-white">
            Hey {user} 👋 Let's Give Your Board a Name!
          </h1>
          <form
            className="flex flex-col gap-10 items-center"
            action={createNewBoard}
            onSubmit={stepOneSubmit}
          >
            <Input
              type="text"
              name="boardname"
              placeholder="My Board Name..."
              disabled={loading}
            />
            <Button text="Continue" type="submit" />
          </form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          <h1 className="mb-10 text-4xl font-bold uppercase text-gray-900 dark:text-white">
            Now Let's Add your first task! 😊
          </h1>
          <form
            onSubmit={stepTwoSubmit}
            action={createTask}
            className="flex flex-col gap-10 items-center"
          >
            <Input
              type="text"
              name="task"
              placeholder="My First Task..."
              disabled={loading}
            />
            <Input
              type="hidden"
              value={boardId!}
              name="boardId"
            />

            <div className="flex justify-between w-4/5 mb-10">
              <Button
                text="&#8592; Go Back"
                onClick={goBack}
                disabled={loading}
              />
              <Button
                text="Continue"
                type="submit"
                disabled={loading}
              />
            </div>
            {loading && (
              <div className="flex gap-3 items-center text-gray-900 dark:text-white">
                <SyncLoader color="#000" />
                <span>Getting Your Board Ready</span>
              </div>
            )}
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OnboardingForm;
