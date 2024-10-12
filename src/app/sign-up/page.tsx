"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("/api/signup", formData);

      console.log(response.data);
      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-dvh">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <Input
              type="text"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit">Signup</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <span>or</span>

          <form action="">
            <Button type="submit" variant={"outline"}>
              Login with Google
            </Button>
          </form>
          <span>or</span>
          <p>
            Already Signed Up? <Link href="/sign-in">Sign In</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
