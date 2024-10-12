import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await auth();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, action } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Organization name is required" },
        { status: 400 }
      );
    }

    if (action == "create") {
      const organisation = await prisma.organisation.create({
        data: {
          name,
          userId: user.user.id,
        },
      });

      console.log(organisation);

      const updatedUser = await prisma.user.update({
        where: {
          id: user.user.id,
        },
        data: {
          organisationId: organisation.id,
        },
      });

      return NextResponse.json(
        { message: "Organisation created successfully", organisation },
        { status: 200 }
      );
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.user.id,
        },
        data: {
          name: name,
        },
      });
      return NextResponse.json(
        { message: "Joined organisation successfully", user: updatedUser },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(" Organisation Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
