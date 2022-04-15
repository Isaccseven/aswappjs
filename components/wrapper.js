import React, {useState} from 'react';
import NavigationListItem from "./navigationlistitem";
import Image from 'next/image'
import {signOut, useSession} from "next-auth/react";
import Notenliste from "./notenliste";
import Stundenplan from "./stundenplan";
import aswlogo from "../public/asw_toplogo.png";

export default function Wrapper() {
    const {data: session, status} = useSession()
    const [menuItem, setMenuItem] = useState(0);

    return (
        <div className="flex flex-wrap bg-gray-100 w-full h-full">
            <div className="w-3/12 bg-white rounded p-3 shadow-lg">
                <div className="flex items-center space-x-4 p-2 mb-5">
                    <Image className="h-12 rounded-full"
                           src={aswlogo}
                           alt={session.username}
                           width={300}
                           height={150}
                    />
                    <div>
                        <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
                            {session.username}
                        </h4>
                        <button className="bg-gray-500 p-1 text-white rounded" onClick={() => signOut()}>Log Out
                        </button>
                        <span className="text-sm tracking-wide flex items-center space-x-1">
                </span>
                    </div>
                </div>


                <ul className="space-y-2 text-sm mb-2">
                    <button onClick={() => setMenuItem(0)}>
                        <NavigationListItem itemname="Dashboard"/>
                    </button>
                </ul>

                <ul className="space-y-2 text-sm mb-2">
                    <button onClick={() => setMenuItem(1)}>
                        <NavigationListItem itemname="Notenliste"/>
                    </button>
                </ul>

                <ul className="space-y-2 text-sm mb-2">
                    <button onClick={() => setMenuItem(2)}>
                        <NavigationListItem itemname="Stundenplan"/>
                    </button>
                </ul>

            </div>

            <div className="w-9/12">
                <div className="p-7">
                    {(function () {
                        if (menuItem === 0) {
                            return <span>Empty</span>
                        } else if (menuItem === 1) {
                            return <Notenliste></Notenliste>
                        } else if (menuItem === 2) {
                            return <Stundenplan></Stundenplan>
                        } else {
                            return <span>Neither</span>
                        }
                    })()}
                </div>
            </div>
        </div>
    );

}

{/*
{(function () {
                        if (menuItem === 0) {
                            return <span>rwar</span>
                        } else if (menuItem === 1) {
                            return <Notenliste></Notenliste>
                        } else if (menuItem === 2) {
                            return <Stundenplan></Stundenplan>
                        } else {
                            return <span>Neither</span>
                        }
                    })()}
*/
}