import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getNotenApiData } from "../../services/notenservice";
import Loader from "../loader";
import extractedOptions from "./options";
import extractedChartData from "./chartdata";

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

export default function Dashboard() {
  const { data: session } = useSession();
  const [apiData, setApiData] = useState([]);
  const [bachelorNote, setBachelorNote] = useState(0);
  const [loading, setLoading] = useState(true);

  function getLabel() {
    let filtered = [];
    apiData.map((vorlesung) => {
      filtered.push(vorlesung.at(0));
    });
    return filtered;
  }

  function getData() {
    let filtered = [];
    apiData.map((vorlesung) => {
      if (vorlesung.at(2) === "Bestanden") {
        filtered.push(1);
      } else {
        filtered.push(parseFloat(vorlesung.at(2).replace(/,/g, ".")));
      }
    });
    return filtered;
  }

  function calculateBachelorGrade() {
    let gesamtValue = 0;
    let bachelorValue = 0;
    apiData.map((vorlesung) => {
      if (vorlesung.at(2) !== "Bestanden" && vorlesung.at(5).length > 0) {
        let note = parseInt(vorlesung.at(2));
        let creditsRaw = vorlesung.at(5).split("/");
        bachelorValue += note * creditsRaw[0];
        let gesamtValueRaw = vorlesung.at(5).split("/");
        gesamtValue += parseInt(gesamtValueRaw[1]);
      }
    });
    let durchschnittsnote = bachelorValue / gesamtValue;
    setBachelorNote(durchschnittsnote.toFixed(2));
  }

  useEffect(() => {
    const handleSubmit = async () => {
      setApiData(await getNotenApiData(session).then(setLoading(false)));
    };
    handleSubmit();
  }, [session]);

  const options = extractedOptions();

  const chartData = extractedChartData(getLabel(), getData());

  return loading ? (
    <Loader />
  ) : (
    <div className="shadow-lg rounded-lg flex flex-col items-center overflow-hidden my-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
        onClick={() => calculateBachelorGrade()}
      >
        Durchschnittsnote berechnen
      </button>
      <div className="p-5 bg-gray-500 text-white rounded-2xl my-4">
        Durchschnittsnote: {bachelorNote}
      </div>
      <Line options={options} data={chartData} type="bar" />
    </div>
  );
}
