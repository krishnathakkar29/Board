import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const boards = await prisma.board.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(boards, { status: 201 });
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
