"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import React from "react";
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
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        console.log(result);
        setError(result.error || "Invalid email or password");
      } else {
        setError("");
        router.push("/");
      }
    } catch (error) {
      console.log("Error in client sign-in", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange} // Update state for email
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange} // Update state for password
            />
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Show error message if login fails */}
            <Button type="submit">Login</Button>
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
            New to us? <Link href="/sign-up">Register Now</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
