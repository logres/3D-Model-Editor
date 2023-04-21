import React from 'react';
import { Card, Col, Row } from 'antd';
import EditorPlace from './EditorPlace';
import Panel from './Panel';

export default function Editor() {
    return (
        <div className='editor-container' style={{ height: "100%", width: "100%" }}>
            <Card className="editor-card" bordered={false} style={{
                background: '#eee',
                color: '#fff',
                border: '1px solid #adaaaa',
                borderRadius: '0px',
                padding: '8px',
                // boxShadow: 'inset -1px -1px 10px rgba(0,0,0,.3), inset 1px 1px 10px rgba(255,255,255,.2), 2px 2px 3px rgba(0,0,0,.1)',
                height: "100%", width: "100%",
            }}
                bodyStyle={{ height: "100%" }}
            >
                <Row gutter={[16, 16]} justify="space-between" style={{ height: "100%" }}>
                    <Col span={20}>
                        <EditorPlace />
                    </Col>
                    <Col span={4}>
                        <Panel />
                    </Col>
                </Row>
            </Card>
        </div >
    );
}