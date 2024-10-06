import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { boardId } = await req.json();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingFavourite = await prisma.favourite.findUnique({
      where: {
        userId_boardId: {
          userId: user.id,
          boardId,
        },
      },
    });

    if (existingFavourite) {
      await prisma.favourite.delete({
        where: { id: existingFavourite.id },
      });

      return NextResponse.json(
        { message: "Removed from favourites" },
        { status: 200 }
      );
    } else {
      const favourite = await prisma.favourite.create({
        data: {
          userId: user.id,
          boardId,
        },
      });

      return NextResponse.json(
        { message: "Added to favourites", favourite },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error toggling favorite for the board:", error);
    return NextResponse.json(
      { message: "Failed to toggle favorite" },
      { status: 500 }
    );
  }
}
