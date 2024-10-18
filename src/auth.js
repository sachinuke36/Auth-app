export const runtime = 'nodejs'

import NextAuth, { AuthError } from "next-auth"
import Google from "next-auth/providers/google"
import { connectDB } from "./app/api/db/db";
import { User } from "./models/userModel";
import GitHub from "next-auth/providers/github"



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  }),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET

  })
],
  callbacks:{
    signIn: async({user, account})=>{
      const {email, name, image, id} = user;
      // console.log("user", user);
      await connectDB();
      const userExists = await User.find({email});
      // console.log("userExists", userExists);

      if(account?.provider === 'google'){
        try {
          if(!userExists[0]){
            await User.create({
              email, name, googleId:id, image
            })
          }else if(userExists[0] && !userExists[0].googleId){
            await User.updateOne({email},{googleId:id})
          }
          return true;
        } catch (error) {
          console.log(error);
          throw new AuthError("Error while creating user!")
        }
      }

      if(account?.provider ==='github'){
        try {
          if(!userExists[0]){
             await User.create({email, name, githubId:id, image,})
            }else if (userExists[0] && !userExists[0].githubId){
              await User.updateOne({email},{githubId:id})
            }
          return true
        } catch (error) {
          console.log(error);
          throw new AuthError("Error while creating user!")
        }
       
      }
      return false
    }
  }
})

