import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
];

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const randomImage = Math.floor(Math.random() * images.length);

    const board = await prisma.board.create({
      data: {
        imageUrl: images[randomImage],
        title,
        userId: user.id,
        username: user.username || user.firstName!,
      },
    });

    console.log(board);

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to create a board",
      },
      { status: 500 }
    );
  }
}
