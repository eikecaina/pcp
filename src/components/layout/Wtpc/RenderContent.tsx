import { Button, Card, Col, Form, Input, Row } from "antd";
import ItensConfig from "./ProductConfig/ItensConfig";



const RenderContent: React.FC = () => {
    return (
        <Row gutter={10}>
            <Col span={12}>
                <ItensConfig></ItensConfig>
            </Col>
            <Col span={12}>
                
            </Col>
        </Row>

    );
};

export default RenderContent;
