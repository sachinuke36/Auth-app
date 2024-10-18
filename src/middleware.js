// export { auth as middleware } from "@/auth"

import { auth } from "./auth";
import { NextResponse } from 'next/server';


const middleware = async(req)=>{
   const user =  await auth()
   if (!user && req.nextUrl.pathname !== '/api/auth/signin') {
    return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl.origin));
 }
 
return NextResponse.next();

}

export default middleware;

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}