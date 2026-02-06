"use client";
import type { NextPage } from 'next'
import { useSession, signIn, signOut } from "next-auth/react"

const Edit: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div>
        {
            session && session.user ?
                <h1>Edit Page</h1>
                :
                <span>You need to be authenticated to watch this page</span>
        }
    </div>
  )
}

export default Edit;