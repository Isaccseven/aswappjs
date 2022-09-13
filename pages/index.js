import {useSession} from "next-auth/react";
import Wrapper from "../components/wrapper";
import {useRouter} from "next/router";


export default function Home() {
    const {data: session, status} = useSession()
    const router = useRouter()
    try {
        if (status === "authenticated") {
            return (
                <Wrapper/>
            );
        }
    } catch (e) {
        console.log(e)
    }

    try {
        if (status === "unauthenticated") {
            return (
                router.push("/api/auth/signin")
            );
        }
    } catch (e) {
        console.log(e)
    }
    return <></>
}
