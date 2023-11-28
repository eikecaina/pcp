import { Button, Card, Col, Form, Input, Row } from "antd";
import ItensConfig from "./ProductConfig/ItensConfig";
import ResumeData from "./ProductConfig/Resume";



const RenderContent: React.FC = () => {
    return (
        <Row gutter={10}>
            <Col span={8} style={{ height: 776 }}>
                <ItensConfig></ItensConfig>
            </Col>
            <Col span={16} style={{ height: 776 }}>
                <ResumeData></ResumeData>
            </Col>
        </Row>

    );
};

export default RenderContent;
