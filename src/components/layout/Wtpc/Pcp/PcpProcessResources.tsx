import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { Calendar, CalendarProps, Card, Col, Divider, Form, List, Radio, Row, Select, theme } from 'antd';
import { Dayjs } from 'dayjs';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('DD/MM/YYYY'), mode);
};

const PcpProcessResources: React.FC = () => {
    const { token } = theme.useToken();

    const [chartOptions, setChartOptions] = React.useState({
        data: [
            { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
            { month: 'Mar', avgTemp: 6.3, iceCreamSales: 402000 },
            { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
            { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
            { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
            { month: 'Nov', avgTemp: 1.9, iceCreamSales: 600000 },
        ],

        series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
    });
    return (
        <Row>
            <Col span={12}>

            </Col>
            <Col span={12}>
                <div style={{ width: '100%', height: '100%', maxHeight: 250 }}>
                    <AgChartsReact options={chartOptions as any} />
                    <AgChartsReact options={chartOptions as any} />
                    <AgChartsReact options={chartOptions as any} />
                </div>
            </Col>
        </Row >
    );
}

export default PcpProcessResources;