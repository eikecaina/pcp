import React from 'react';
import ReactDOM from 'react-dom';
import { AgChartsReact } from 'ag-charts-react';

const PcpProcessResources: React.FC = () => {

    // Chart Options: Control & configure the chart
    const [chartOptions, setChartOptions] = React.useState({
        // Data: Data to be displayed in the chart
        data: [
            { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
            { month: 'Mar', avgTemp: 6.3, iceCreamSales: 402000 },
            { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
            { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
            { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
            { month: 'Nov', avgTemp: 1.9, iceCreamSales: 600000 },
        ],
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
    });

    return (
        <div style={{ width: 400 }}>

            <AgChartsReact options={chartOptions as any} />
        </div>
    );
}


export default PcpProcessResources;