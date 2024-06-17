import { User } from "@/models/user";
import { connectToDB } from "@/utils/database";
import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({ session }){
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()
            return session;
        },
        async signIn({ profile }){
            try {
                await connectToDB();
    
                // Check If a user already exists
                const userExists = await User.findOne({ email: profile.email })
    
    
                // if Not, create a new User
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        userName: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
})

export {handler as GET, handler as POST}