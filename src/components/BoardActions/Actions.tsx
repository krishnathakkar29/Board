"use client";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmModal from "./ConfirmModal";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProp {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: ActionsProp) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { onOpen } = useRenameModal();

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/boards/${id}`)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete("/api/create-board", {
        data: {
          id,
        },
      });
      //   console.log("Board created successfully:", response.data);
      toast.success("Board deleted");
      router.refresh();
    } catch (error) {
      console.log("Error deleting board:", error);
      toast.error("Failed to delete board");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={handleCopyLink}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>

        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of its content"
          disabled={loading}
          onConfirm={handleDelete}
        >
          <Button
            className="p-3 cursor-pointer w-full justify-start font-normal"
            variant="ghost"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
