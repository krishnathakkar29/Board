import Canvas from "@/components/Canvas/Canvas";
import { Loading } from "@/components/Canvas/loading";
import Room from "@/components/Room";
import React from "react";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const page = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />;
    </Room>
  );
};

export default page;
