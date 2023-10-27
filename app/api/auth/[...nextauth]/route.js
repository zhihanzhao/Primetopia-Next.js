import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";



const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({ session }){

    },
    async signIn({ profile }){
        try {
            await connectToDB();
            //verify the User 
            //Create a user 

        } catch (error) {
            console.log(error);
        }

    }

})

export{ handler as GET, handler as POST}