" use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import Actions from "./BoardActions/Actions";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  id: string;
  title: string;
  userId: string;
  username: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isFavourite: boolean;
};

interface FooterProps {
  isFavourite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: (boardId: string) => void;
  disabled: boolean;
  boardId: string;
}

function Overlay() {
  return (
    <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black"></div>
  );
}

function Footer({
  isFavourite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
  boardId,
}: FooterProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick(boardId);
  };
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4",
            isFavourite ? "fill-blue-600" : "text-blue-600"
          )}
        />
      </button>
    </div>
  );
}

const BoardCard = ({
  createdAt,
  id,
  imageUrl,
  title,
  updatedAt,
  userId,
  username,
  isFavourite,
}: Props) => {
  const { user } = useUser();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const authorLabel = user?.id === userId ? "You" : username;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const toggleFavourite = async (boardId: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/favourite", {
        boardId,
      });

      console.log("Board created successfully:", response.data);
      toast.success(response.data.message);
      router.refresh();
    } catch (error) {
      console.log("Error favourite board:", error);
      toast.error("Failed to favourite board");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Link href={`/boards/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-center overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          isFavourite={isFavourite}
          onClick={toggleFavourite}
          disabled={loading}
          boardId={id}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default BoardCard;
