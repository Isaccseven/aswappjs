import '../styles/globals.css'
import React, {useEffect} from "react";
import {SessionProvider, useSession} from "next-auth/react";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}) {

    return (
        <SessionProvider session={pageProps.session}>
                    <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp


