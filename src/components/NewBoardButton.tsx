"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  disabled?: boolean;
};

const NewBoardButton = ({ disabled }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/create-board", {
        title: "Untitled 1",
      });

      console.log("Board created successfully:", response.data);
      toast.success("Board created");
      router.refresh();
    } catch (error) {
      console.log("Error creating board:", error);
      toast.error("Failed to create board");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (disabled || loading) &&
          "opacity-65 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};

export default NewBoardButton;
