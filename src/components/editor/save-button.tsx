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
import { downloadEditingFile } from "@/services/download"
import { pushReadmeToGithub } from "@/services/github"
import { Session, User } from "@/types"
import {
  ChevronDownIcon,
  DownloadIcon,
  ShareIcon,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export function SaveButton({editorRef}: {editorRef: any}) {

  const { data: session } = useSession();
  const [user, setUser] = useState<User>(session?.user as User);
  const [username, setUsername] = useState<string>(user.username);
  const [token, setToken] = useState<string>((session as Session)?.accessToken);

  return (
    <ButtonGroup>
      <Button variant="outline" onClick={() => {pushReadmeToGithub({markdown: editorRef.exportToMarkdown(), user, token})}}>
        <ShareIcon />
        Upload to GitHub
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!">
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {downloadEditingFile(editorRef, user)}}>
              <DownloadIcon />
              Download File
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
