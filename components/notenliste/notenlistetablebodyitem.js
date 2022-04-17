export default function NotenlisteTableBodyItem(props) {
    return <tr className="bg-white border-b">
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
            {props.index}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
            {props.item.lehrveranstaltung}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
            {props.item.status}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
            {props.item.note}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
            {props.item.bewertung}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
            {props.item.ects}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
            {props.item.credits}
        </td>

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
            {props.item.versuch}
        </td>

    </tr>;
}