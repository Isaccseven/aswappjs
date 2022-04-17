export default function NotenlisteTableHeader() {
    return <thead className="border-b">
    <tr>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            #
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Lehrveranstaltung
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Status
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Note
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Bewertung
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Ects
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Credits
        </th>
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Versuch
        </th>

    </tr>
    </thead>;
}