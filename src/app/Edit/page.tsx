"use client";
import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import { Editor } from '@/components/editor/editor';
import { useEffect, useRef } from 'react';
import { getReadmeContent, getReadmeRepo } from '@/services/github';

const Edit: NextPage = () => {
  const { data: session } = useSession();

  const editorRef = useRef(null);

  let markdown;

  useEffect(() =>{
    const call = async() =>{
      const repo = await getReadmeRepo(session?.user?.username, session?.accessToken);
      const data = await getReadmeContent(session?.user?.username, session?.accessToken);
      markdown = data?.success ? data?.content : "";
      console.log(markdown)
      editorRef.current.injectMarkdown(markdown);
    };
    call();
  }, [])

  return (
    <div>
        {
            session && session.user ?
                <Editor ref={editorRef}/>
                :
                <span>You need to be authenticated to watch this page</span>
        }
    </div>
  )
}

export default Edit;