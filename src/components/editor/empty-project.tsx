"use client";

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Session, User } from "@/types";
import { IconFolderCode } from "@tabler/icons-react"
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "sonner";
import { createGitHubProject } from "@/services/github";
import { OctokitResponse } from "@octokit/types";
import { useSession } from "next-auth/react";

export function EmptyProject({setRepo}: {setRepo: Dispatch<SetStateAction<object>>}) {
  const { data: session } = useSession();
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  const [isPushing, setIsPushing] = useState<boolean>(false);

  const handleProjectCreation = (markdown?: string) =>{
    setIsPushing(true);
    toast.promise<{ data: OctokitResponse<object, number> | undefined }>(
      () =>
        new Promise(async(resolve) =>{
          const user = session?.user as User;
          const token = (session as Session)?.accessToken;
          const data = await createGitHubProject({markdown, user, token});
          resolve(data?.data);
        }),
      {
        loading: "Loading...",
        success: (data) => {setIsPushing(false); setRepo(data); return markdown ? "File has been imported" : "Empty project created"},
        error: () => {setIsPushing(false); return `Error`},
      }
    )
  };

  const handleProjectCreationFromFile = (files: FileList | null ) =>{
    //Check if file
    if (!files) return;

    //Check if .md
    const file = files[0];
    if (!file.name.endsWith(".md")) return;

    const fileReader = new FileReader();

    let content = "";

    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = e => {
      content = e?.target?.result as string;
      handleProjectCreation(content);
    };
  };

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Project Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created your project yet. Get started by creating
          your project from scratch or with importing file by clicking in the buttons below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button disabled={isPushing} onClick={() => handleProjectCreation()}>Create Project</Button>
        <Button disabled={isPushing} variant="outline" onClick={() => fileUploaderRef.current?.click()}>Import File</Button>
        <Input ref={fileUploaderRef} hidden type="file" accept=".md" placeholder={"Import File"} onChange={(e) => handleProjectCreationFromFile(e?.target?.files)}/>
      </EmptyContent>
    </Empty>
  )
}