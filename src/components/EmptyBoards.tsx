"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

const EmptyBoards = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createBoard = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/create-board", {
        title: "Untitled 1",
      });

      console.log("Board created successfully:", response.data);
      toast.success("Board created");
      router.push(`boards/${response.data.id}`)
      router.refresh();
    } catch (error) {
      console.log("Error creating board:", error);
      toast.error("Failed to create board");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <p>EmptyBoards</p>
      <Button onClick={createBoard} disabled={loading}>
        Create Board
      </Button>
    </div>
  );
};

export default EmptyBoards;
