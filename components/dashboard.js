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

import { Line } from 'react-chartjs-2';
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

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
        <div className="shadow-lg rounded-lg overflow-hidden">
            <Line
                options={options}
                data={chartData}
                type={"bar"}/>
        </div>
    );
}