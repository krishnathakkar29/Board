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

  const findBoards = await prisma.board.findMany({
    where: {
      userId: user.id,
      title: {
        contains: searchParams.search || "",
      },
    },
  });

  console.log(findBoards);
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      <BoardList query={searchParams} data={findBoards} />
    </div>
  );
};

export default page;
