import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";


const Notenliste = (props) => {
    const {data: session} = useSession()
    const [apiData, setApiData] = useState([]);

    async function getApiData() {
        let body = JSON.stringify({
            username: session.username,
            password: session.password
        })
        try {
            const res = await fetch(`https://grade-scraper.herokuapp.com/getGrades`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            });
            const data = await res.json();
            return data
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const handleSubmit = async () => {
            setApiData(await getApiData())
        }
        handleSubmit()
    }, [])


    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="border-b">
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
                            </thead>
                            <tbody>
                            {apiData.map((key, index) => {
                                return (
                                    <tr className="bg-white border-b" key={key}>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {index}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.lehrveranstaltung}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.status}
                                        </td>


                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.note}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.bewertung}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.ects}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.credits}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.versuch}
                                        </td>

                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Notenliste;