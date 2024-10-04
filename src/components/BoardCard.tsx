" use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

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
  onClick: () => void;
  disabled: boolean;
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
}: FooterProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
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

  const authorLabel = user?.id === userId ? "You" : username;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const toggleFavourite = () => {};
  return (
    <Link href={`/boards/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-center overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          isFavourite={isFavourite}
          onClick={toggleFavourite}
          disabled={false}
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
