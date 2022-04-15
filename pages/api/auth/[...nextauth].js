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
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

                var urlencoded = new URLSearchParams();
                urlencoded.append("login-form", "login-form");
                urlencoded.append("login-referer", "");
                urlencoded.append("password", credentials.password);
                urlencoded.append("user", credentials.username);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: 'follow'
                };

                const userData = {
                    username: credentials.username,
                    password: credentials.password
                }

                const result = await fetch("https://asw-dualesstudium.academyfive.net/community/login", requestOptions)

                if(result){
                    return userData
                } else {
                    return null;
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