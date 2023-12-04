import { Card, Col, Row } from 'antd'
import React from 'react'

const Pcp: React.FC = () => {
    return (
        <Card>
            <Row gutter={6} style={{ height: '100%', minHeight: 725 }}>
                <Col span={8}>
                    <Card title="Entregas" style={{ height: '100%', minHeight: 725, overflowY: "auto" }}>
                        <Card></Card>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Processos" style={{ height: '100%', minHeight: 725, overflowY: "auto" }}>

                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Planejamento" style={{ height: '100%', minHeight: 725, overflowY: "auto" }}>
                        <Card></Card>
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}

export default Pcp
