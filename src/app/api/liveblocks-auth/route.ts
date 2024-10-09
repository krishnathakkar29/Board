import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_IEHg5dHie3v4Vvs3itCR8ojTrfRh4OHksR8GZGkyCwA4arnsI8i2t8l45JwAgGvs",
});

export async function POST(req: Request) {
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

    const { room } = await req.json();

    const board = await prisma.board.findUnique({
      where: {
        id: room,
      },
    });

    const userInfo = {
      name: user.firstName || "Anonymous",
      picture: user.imageUrl,
    };

    const session = liveblocks.prepareSession(user.id, { userInfo });

    if (room) {
      session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {}
}
