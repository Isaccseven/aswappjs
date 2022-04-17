export default function extractedChartData(getLabel, getData) {
    return {
        labels: getLabel(),
        datasets: [
            {
                label: 'Einzelne Noten',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                data: getData(),
            }
        ]
    };
}