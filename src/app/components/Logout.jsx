"use client"
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"

export const runtime = 'nodejs'

const Logout = () => {
  return (
    <Button onClick={()=>signOut()}>Log out</Button>
  )
}

export default Logout
