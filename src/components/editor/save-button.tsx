"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { downloadEditingFile } from "@/services/download"
import { getReadmeContent, pushReadmeToGithub } from "@/services/github"
import { Session, User } from "@/types"
import {
  ChevronDownIcon,
  DownloadIcon,
  ShareIcon,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { OctokitResponse } from "@octokit/types";
import { EditorCommands } from "./ShadcnTemplate"

export function SaveButton({editorRef}: {editorRef: EditorCommands}) {

  const { data: session } = useSession();
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [readMe, setReadMe] = useState<{ success: boolean; content: string; }>();

  useEffect(() =>{
    const call = async() =>{
      setReadMe(await getReadmeContent((session?.user as User)?.username, (session as Session)?.accessToken));
    };
    call();
  }, [session]);

  return (
    <ButtonGroup>
      <Button variant="outline" disabled={isPushing || readMe?.content.trim() === editorRef.exportToMarkdown().trim()} onClick={() => {
          if (readMe?.content.replaceAll("\n", "") === editorRef.exportToMarkdown().replaceAll("\n", "")){
            toast.info("There is no changes to push");
            return;
          }
          setIsPushing(true);
          toast.promise<{ data: OctokitResponse<object, number> | undefined }>(
            () =>
              new Promise(async(resolve) =>{
                const user = session?.user as User;
                const token = (session as Session)?.accessToken;
                const data = await pushReadmeToGithub({markdown: editorRef.exportToMarkdown(), user, token});
                resolve(data?.data);
              }),
            {
              loading: "Loading...",
              success: () => {setIsPushing(false); return `Changes has been pushed`},
              error: "Error",
            }
          )
        }}>
        <ShareIcon />
        Upload to GitHub
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!" disabled={isPushing}>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {downloadEditingFile(editorRef, session?.user as User)}}>
              <DownloadIcon />
              Download File
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}