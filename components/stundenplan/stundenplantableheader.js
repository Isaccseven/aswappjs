import React from "react";

export default function StundenplanTableHeader() {
    return <thead className="border-b">
    <tr>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            #
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Fach
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Von
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Bis
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Datum
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Raum
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Typ
        </th>
    </tr>
    </thead>;
}