import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

import {Line} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {number} from "tailwindcss/lib/util/dataTypes";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard(props) {
    const {data: session} = useSession()
    const [apiData, setApiData] = useState([]);
    const [bachelorNote,setBachelorNote] = useState(0);

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
            setApiData(data)
        } catch (err) {
            console.log(err);
        }
    }

    function calculateBachelorGrade(){
        let gesamtValue = 0;
        let bachelorValue = 0;
        apiData.map(item=>{
                if(item.note !== "Bestanden" && item.credits.length > 0 ){
                    let note = parseFloat(item.note.replace(/,/g, '.'))
                    let creditsRaw = item.credits.split('/')
                    bachelorValue += note * creditsRaw[0]
                    let gesamtValueRaw = item.credits.split('/')
                    gesamtValue += parseInt(gesamtValueRaw[1])
                }
        })
        let durchschnittsnote = bachelorValue/gesamtValue
        setBachelorNote(durchschnittsnote.toFixed(5))
    }


    useEffect(() => {
        const handleSubmit = async () => {
            await getApiData()
        }
        handleSubmit()
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Notenverlauf'
            }
        }
    }

    const chartData = {
        labels: Object.values(apiData).map(function (value, index) {
            return apiData[index].lehrveranstaltung
        }),
        datasets: [
            {
                label: 'Einzelne Noten',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                data: Object.values(apiData).map(function (value, index) {
                    let raw = apiData[index].note.replace(/,/g, '.')
                    return parseFloat(raw) || 2.0
                }),
            }
        ]
    };

    return (
            <div className="shadow-lg rounded-lg flex flex-col items-center overflow-hidden my-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
                        onClick={()=>calculateBachelorGrade()}
                >Durchschnittsnote berechnen</button>
                <div className="p-5 bg-gray-500 text-white rounded-2xl my-4">Durchschnittsnote: {bachelorNote}</div>
                <Line
                    options={options}
                    data={chartData}
                    type={"bar"}/>
            </div>
    );
}