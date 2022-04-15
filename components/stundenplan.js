import moment from 'moment';
import 'moment/locale/de';
import React, {useEffect, useState} from 'react';

const Stundenplan = () => {

    const [apiData, setApiData] = useState([]);

    async function getApiData() {
        const res = await fetch(`https://getcalendarapidata.herokuapp.com/getCalendarData`, {
            method: 'GET',
        });
        const data = await res.json();
        return data
    }

    useEffect(() => {
        moment.locale('de');
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
                            </thead>
                            <tbody>
                            {apiData.map((key, index) => {
                                return (
                                    <tr className="bg-white border-b" key={key}>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {index}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.fach}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {moment(key.from).format('LT')}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {moment(key.to).format('LT')}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {moment(key.date).format('LL')}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.raum}
                                        </td>

                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {key.type}
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

export default Stundenplan;