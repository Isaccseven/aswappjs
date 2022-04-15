import moment from 'moment';
import 'moment/locale/de';
import React, {useEffect, useState} from 'react';

const Stundenplan= () => {

    const [apiData, setApiData] = useState([]);

    async function getApiData(){
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
        <table className="border border-slate-500 p-2">
            <thead>
            <tr>
                <th className="border border-slate-600 text-center">Fach</th>
                <th className="border border-slate-600 text-center">Von</th>
                <th className="border border-slate-600 text-center">Bis</th>
                <th className="border border-slate-600 text-center">Datum</th>
                <th className="border border-slate-600 text-center">Raum</th>
                <th className="border border-slate-600 text-center">Typ</th>
            </tr>
            </thead>
            {apiData.map((key) => {
                return (
                    <tbody key={key.key}>
                    <tr>
                        <td className="border border-slate-700 text-center p-3">{key.fach}</td>
                        <td className="border border-slate-700 text-center p-3">{
                            moment(key.from).format('LT')
                        }</td>
                        <td className="border border-slate-700 text-center p-3">{
                            moment(key.to).format('LT')
                        }</td>
                        <td className="border border-slate-700 text-center p-3">{
                            moment(key.date).format('LL')
                        }</td>
                        <td className="border border-slate-700 text-center p-3">{key.raum}</td>
                        <td className="border border-slate-700 text-center p-3">{key.type}</td>
                    </tr>
                    </tbody>
                )
            })}
        </table>
    );

}

export default Stundenplan;