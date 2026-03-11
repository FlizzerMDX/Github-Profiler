"use client";
import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import { Editor } from '@/components/editor/editor';
import { useEffect, useRef, useState } from 'react';
import { getReadmeRepo } from '@/services/github';

import { User, Session } from '@/types/index';
import { ShadcnTemplateRef } from '@/components/editor';
import { EmptyProject } from '@/components/editor/empty-project';

const Edit: NextPage = () => {
  const { data: session } = useSession();
  const [repo, setRepo] = useState<object>({});
  const [endCall, setEndCall] = useState<boolean>(false);

  const editorRef = useRef<ShadcnTemplateRef>(null);

  useEffect(() =>{
    const call = async() =>{
      const userSession = session as Session;
      const repo = await getReadmeRepo((session?.user as User)?.username, userSession?.accessToken);
      setRepo(repo?.data);
      setEndCall(true);
    };
    call();
  }, [session])

  return (
    <>
        { 
          session && session.user && (
          <Editor ref={editorRef} session={session as Session} hidden={!endCall} repo={repo}/>
          )
        }
        {
            session && session.user ?
                !repo && (<EmptyProject setRepo={setRepo}/>)
                :
                <span>You need to be authenticated to watch this page</span>
        }
    </>
  )
}

export default Edit;