import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {useState} from "react";

export default NextAuth(
    {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "EDU"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Basic dXNlcjphcGlfa2V5");
                myHeaders.append("Content-Type", "application/json");


                var raw = JSON.stringify({
                    "username": credentials.username,
                    "password": credentials.password
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };


                const userData = {
                    username: credentials.username,
                    password: credentials.password
                }

                const result = await fetch("https://web-development-c65f.up.railway.app/api/v1/grades", requestOptions)

                if(result.ok){
                    return userData
                } else {
                    return result.error();
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account,user }) {
            if (account) {
                token.user = user
            }
            return token
        },
        async session({ session, token, }) {
            session.username = token.user.username
            session.password = token.user.password
            return session
        }
    },
    theme: {
        colorScheme: "light",
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
})