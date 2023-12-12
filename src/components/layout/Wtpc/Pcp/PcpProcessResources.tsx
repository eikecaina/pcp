import { AgChartsReact } from 'ag-charts-react';
import {
    AgBarSeriesOptions,
    AgCartesianAxisOptions,
    AgCartesianChartOptions,
    AgCartesianSeriesOptions,
    AgCartesianSeriesTooltipRendererParams,
    AgCharts,
    AgLineSeriesOptions,
} from 'ag-charts-community';
import React, { useCallback, useRef, useState } from 'react';
import { Calendar, Card, Col, Divider, Form, Radio, Row, Select } from 'antd';

const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const start = 0;
    const end = 12;
}

const PcpProcessResources: React.FC = () => {
    const chartRef = useRef<AgChartsReact>(null);
    const [options, setOptions] = useState<AgCartesianChartOptions>({
        data: [
            { year: '2001', adults: 24, men: 22, women: 25, children: 13, portions: 3.4 },
            { year: '2003', adults: 24, men: 22, women: 26, children: 11, portions: 3.4 },
            { year: '2005', adults: 28, men: 26, women: 30, children: 17, portions: 3.7 },
            { year: '2007', adults: 29, men: 25, women: 31, children: 21, portions: 3.8 },
            { year: '2009', adults: 26, men: 25, women: 28, children: 21, portions: 3.5 },
            { year: '2011', adults: 27, men: 24, women: 29, children: 18, portions: 3.6 },
            { year: '2013', adults: 26, men: 25, women: 28, children: 16, portions: 3.6 },
            { year: '2015', adults: 26, men: 24, women: 27, children: 20, portions: 3.5 },
            { year: '2017', adults: 29, men: 26, women: 32, children: 18, portions: 3.8 },
        ],
        title: {
            text: 'Fruit & Vegetable Consumption',
        },
        series: BAR_AND_LINE,
        axes: [
            {
                type: 'category',
                position: 'bottom',
            },
            {
                // primary y axis
                type: 'number',
                position: 'left',
                keys: ['women', 'men', 'children', 'adults'],
                title: {
                    text: 'Adults Who Eat 5 A Day (%)',
                },
            },
            {
                // secondary y axis
                type: 'number',
                position: 'right',
                keys: ['portions'],
                title: {
                    text: 'Portions Consumed (Per Day)',
                },
            },
        ] as AgCartesianAxisOptions[],
    });

    const barLine = useCallback(() => {
        const clone = { ...options };

        clone.series = BAR_AND_LINE;

        setOptions(clone);
    }, [options]);

    const areaBar = useCallback(() => {
        const clone = { ...options };

        clone.series = AREA_AND_BAR;

        setOptions(clone);
    }, [options]);

    return (
        <Row gutter={15}>
            <Col span={12}>
                <Card bodyStyle={{ padding: '5px 0 5px 0' }}>
                    <Divider orientation='left'>Grupos</Divider>
                    <div style={{ padding: '0px 15px 0px 15px' }}>

                        <Row gutter={15}>
                            <Col span={12} style={{ width: '100%', maxWidth: 350 }}>
                                <div>
                                    <Calendar fullscreen={false} />
                                </div>
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    label="Tipo"
                                    style={{ width: '100%', maxWidth: 350 }}
                                >
                                    <Select
                                        defaultValue={'Transformador de Distribuição'}
                                        options={[
                                            {
                                                value: 'Transformador de Distribuição',
                                            },
                                            {
                                                value: 'Transformador a Seco'
                                            },
                                            {
                                                value: 'Transformador de Meia Força'
                                            }
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item>
                                    <Radio>Processo</Radio>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    <Radio>Recurso</Radio>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Col>
            <Col span={12} style={{ height: '100%', minHeight: '100%' }}>
                <AgChartsReact ref={chartRef} options={options as any} />
            </Col>
        </Row>

    );
};
function tooltipRenderer({ datum, xKey, yKey }: AgCartesianSeriesTooltipRendererParams) {
    return { content: `${datum[xKey]}: ${datum[yKey]}%` };
}
const WOMEN: AgBarSeriesOptions = {
    type: 'bar',
    xKey: 'year',
    yKey: 'women',
    yName: 'Women',
    grouped: true,
    tooltip: {
        renderer: tooltipRenderer,
    },
};
const MEN: AgBarSeriesOptions = {
    type: 'bar',
    xKey: 'year',
    yKey: 'men',
    yName: 'Men',
    grouped: true,
    tooltip: {
        renderer: tooltipRenderer,
    },
};
const PORTIONS: AgLineSeriesOptions = {
    type: 'line',
    xKey: 'year',
    yKey: 'portions',
    yName: 'Portions',
    tooltip: {
        renderer: tooltipRenderer,
    },
};
const BAR_AND_LINE: AgCartesianSeriesOptions[] = [
    { ...WOMEN, type: 'bar' },
    { ...MEN, type: 'bar' },
    { ...PORTIONS, type: 'line' },
];
const AREA_AND_BAR: AgCartesianSeriesOptions[] = [
    { ...PORTIONS, type: 'area' },
    { ...WOMEN, type: 'bar' },
    { ...MEN, type: 'bar' },
];
export default PcpProcessResources;