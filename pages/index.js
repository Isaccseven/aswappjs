import {signIn, signOut, useSession} from "next-auth/react";
import Wrapper from "../components/wrapper";
import {useRouter} from "next/router";


export default function Home() {
    const {data: session, status} = useSession()
    const router = useRouter()

    if (status === "authenticated") {
        return (
            <Wrapper/>
        );
    }

    if (status === "unauthenticated") {
        return (
            router.push("/api/auth/signin")
        );
    }
    return <>test</>
}
