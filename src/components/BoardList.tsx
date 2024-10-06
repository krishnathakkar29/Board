"use client";

import { Board } from "@prisma/client";
import EmptyBoards from "./EmptyBoards";
import EmptyFavourites from "./EmptyFavourites";
import EmptySearch from "./EmptySearch";
import BoardCard from "./BoardCard";
import NewBoardButton from "./NewBoardButton";

type Props = {
  query: {
    search?: string;
    favourites?: string;
  };
  data: (Board & { isFavourite: boolean })[];
};

const BoardList = ({ query, data }: Props) => {
  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favourites ? "Favourite Boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favourites) {
    return <EmptyFavourites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favourites ? "Favourite Boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton />
        {data.map((item, index) => (
          <BoardCard
            key={index}
            id={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            username={item.username}
            userId={item.userId}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            isFavourite={item.isFavourite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
