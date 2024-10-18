import { auth, signOut } from "@/auth";
import React from "react";
import Logout from "./components/Logout";
import Image from "next/image";

export const runtime = 'nodejs'

const Home = async() => {
  const session = await auth();
  // console.log(session);

  return (
    <div className='flex flex-col gap-2 mt-[20%] items-center justify-center'>
<Image 
  src={session.user.image} 
  alt="User Image" 
  width={200} 
  height={200} 
  className='rounded-full'
/>      <h1 className=' text-[22px] font-extrabold '>Welcome {session.user?.name}</h1>
      <p>{session.user.email}</p>
      <Logout/>
    </div>
  )
}

export default Home

