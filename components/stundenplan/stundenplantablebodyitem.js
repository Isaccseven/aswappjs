import moment from "moment";
import React from "react";

export default function StundenplanTableBodyItem(props) {
    return <tr className="bg-white border-b">
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {props.index}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {props.item.fach}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {moment(props.item.from).format("LT")}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {moment(props.item.to).format("LT")}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {moment(props.item.date).format("LL")}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {props.item.raum}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {props.item.type}
        </td>

    </tr>;
}