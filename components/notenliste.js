import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";


const Notenliste = (props) => {
    const { data: session } = useSession()
    const [apiData, setApiData] = useState([]);

    async function getApiData(){
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
            console.log("notenliste",data)
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
        <table className="border-collapse border border-slate-500">
            <thead>
            <tr>
                <th className="border border-slate-600">Lehrveranstaltung</th>
                <th className="border border-slate-600">Status</th>
                <th className="border border-slate-600">Note</th>
                <th className="border border-slate-600">Bewertung</th>
                <th className="border border-slate-600">Ects</th>
                <th className="border border-slate-600">Credits</th>
                <th className="border border-slate-600">Versuch</th>
            </tr>
            </thead>
            {apiData.map((key) => {
                return (
                    <tbody key={key.key}>
                    <tr key={key}>
                        <td className="border border-slate-700 text-center">{key.lehrveranstaltung}</td>
                        <td className="border border-slate-700 text-center">{key.status}</td>
                        <td className="border border-slate-700 text-center">{key.note}</td>
                        <td className="border border-slate-700 text-center">{key.bewertung}</td>
                        <td className="border border-slate-700 text-center">{key.ects}</td>
                        <td className="border border-slate-700 text-center">{key.credits}</td>
                        <td className="border border-slate-700 text-center">{key.versuch}</td>
                    </tr>
                    </tbody>
                )
            })}
        </table>
    );

}

export default Notenliste;