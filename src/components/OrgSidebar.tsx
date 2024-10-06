"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import logo from "../assets/logo.svg";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type Props = {};

const OrgSidebar = (props: Props) => {
  const searchParams = useSearchParams();

  const favourites = searchParams.get("favourites");
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px]  pt-5 ">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src={logo} alt="Logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <div className="space-y-1 w-full"></div>
      <div className="space-y-1 w-full">
        <Button
          variant="ghost"
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team Boards
          </Link>
        </Button>
        <Button
          variant={favourites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: {
                favourites: "true",
              },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Favourite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
