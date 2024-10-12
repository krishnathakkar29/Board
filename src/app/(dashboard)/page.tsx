import { auth } from "@/auth";
import JoinCreateOrg from "@/components/Dashboard/JoinCreateOrg";
import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

type DashboardProps = {
  searchParams: {
    search?: string;
    favourites?: string;
  };
};

const page = async ({ searchParams }: DashboardProps) => {
  const { user } = (await auth()) as { user: Session["user"] };
  console.log(user);

  const u = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  console.log("skldbfbfauiobfguoisbooibasiofiubsuiogb\n", u);

  if (!user) {
    return redirect("/sign-up");
  }

  if (!user.organisationId) {
    return (
      <div className="flex-1 h-[calc(100%-80px)] p-6 flex items-center justify-center">
        <JoinCreateOrg />
      </div>
    );
  }

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      hi there
      {/* <BoardList query={searchParams} data={boardsWithFavouriteStatus} /> */}
    </div>
  );
};

export default page;

// const boards = await prisma.board.findMany({
//   where: {
//     userId: user.id,
//     title: {
//       contains: searchParams.search || "",
//       mode: "insensitive",
//     },
//   },
// });

// const favourites = await prisma.favourite.findMany({
//   where: {
//     userId: user.id,
//   },
//   select: {
//     boardId: true,
//   },
// });

// const boardsWithFavouriteStatus = boards.map((board) => ({
//   ...board,
//   isFavourite: favourites.some((fav) => fav.boardId === board.id),
// }));

// console.log(boardsWithFavouriteStatus);
