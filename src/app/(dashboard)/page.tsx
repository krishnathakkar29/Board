import BoardList from "@/components/BoardList";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type DashboardProps = {
  searchParams: {
    search?: string;
    favourites?: string;
  };
};

const page = async ({ searchParams }: DashboardProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-up");
  }

  const boards = await prisma.board.findMany({
    where: {
      userId: user.id,
      title: {
        contains: searchParams.search || "",
        mode: "insensitive",
      },
    },
  });

  const favourites = await prisma.favourite.findMany({
    where: {
      userId: user.id,
    },
    select: {
      boardId: true,
    },
  });
  
  const boardsWithFavouriteStatus = boards.map((board) => ({
    ...board,
    isFavourite: favourites.some((fav) => fav.boardId === board.id),
  }));

  console.log(boardsWithFavouriteStatus);
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      <BoardList query={searchParams} data={boardsWithFavouriteStatus} />
    </div>
  );
};

export default page;
