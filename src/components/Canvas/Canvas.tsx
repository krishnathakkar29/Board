"use client";
import React from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useSelf } from "@liveblocks/react";

type Props = {
  boardId: string;
};

const Canvas = ({ boardId }: Props) => {
  const info = useSelf((me) => me.info);
  console.log(info);
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
