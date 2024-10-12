"use client";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {};

const JoinCreateOrg = (props: Props) => {
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleJoinCreate = async (action: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/create-join-org", {
        name: orgName,
        action,
      });

      if (response.status == 200) {
        toast.success(response.data.message);
        router.refresh();
      }
    } catch (error: any) {
      console.error("Error creating organisation:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Tabs defaultValue="create" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="create">Create An Organisation</TabsTrigger>
        <TabsTrigger value="join">Join An Organisation</TabsTrigger>
      </TabsList>
      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>Create</CardTitle>
            <CardDescription>Create An Organisation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of the Organisation"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleJoinCreate("create")}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>Create</span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="join">
        <Card>
          <CardHeader>
            <CardTitle>Join</CardTitle>
            <CardDescription>Join An Organisation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of the Organisation"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleJoinCreate("join")} disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>Join Now!</span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default JoinCreateOrg;
