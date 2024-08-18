"use client";
import axios from "axios";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";
import { FaPlus } from "react-icons/fa";
import { BoardTypes, Task } from "@/app/types/types";
import Modal from "./ui/Modal";
import Column from "./ui/Column";
import { createTask } from "@/app/actions/boardAction";
import { Button } from "./ui/button";

const Board: React.FC<{ board: BoardTypes | null }> = ({ board }) => {
  const [tasks, setTask] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    if (board) {
      setTask(board.tasks);
      setLoading(false);
    } else {
      router.push("/onboarding");
    }
  }, [board]);

  const openModal = () => {
    setIsCreate(true);
  };

  const closeModal = () => {
    setIsCreate(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const draggedTask = tasks!.find((task) => task.id === draggableId);

    let updatedStatus: string;

    switch (destination.droppableId) {
      case "todo":
        updatedStatus = "TODO";
        break;
      case "inProgress":
        updatedStatus = "IN_PROGRESS";
        break;
      case "completed":
        updatedStatus = "DONE";
        break;
      default:
        updatedStatus = draggedTask!.status;
    }

    try {
      axios.post("/api/updateTaskStatus", {
        taskId: draggableId,
        newStatus: updatedStatus,
      });
    } catch (error) {
      console.log(error);
    }

    const updatedTask = tasks!.map((task) => {
      if (task.id === draggableId) {
        return {
          ...task,
          status: updatedStatus,
        };
      }
      return task;
    });

    setTask(updatedTask);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <SyncLoader color="#fff" />
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 py-10 relative h-[700px] bg-gradient-to-r from-black via-gray-500 to-slate-600">
      <h1 className="font-bold text-center mb-10 text-4xl text-white drop-shadow-md">
        {board!.name}
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap-10">
          <Button
            className="bg-green-700 rounded-full hover:bg-green-600 text-white font-bold p-4 absolute right-10 bottom-10 shadow-lg"
            onClick={openModal}
          >
            <FaPlus />
          </Button>
          {isCreate && (
            <Modal
              closeModal={closeModal}
              title="Create New Task"
              isCreate={isCreate}
              action={createTask}
              value={board!.id}
            />
          )}
          <Column
            title="Todo"
            tasks={tasks!.filter((task) => task.status === "TODO")}
            droppableId="todo"
            className="bg-white bg-opacity-90 rounded-lg shadow-md"
          />
          <Column
            title="In Progress"
            tasks={tasks!.filter((task) => task.status === "IN_PROGRESS")}
            droppableId="inProgress"
            className="bg-white bg-opacity-90 rounded-lg shadow-md"
          />
          <Column
            title="Completed"
            tasks={tasks!.filter((task) => task.status === "DONE")}
            droppableId="completed"
            className="bg-white bg-opacity-90 rounded-lg shadow-md"
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
