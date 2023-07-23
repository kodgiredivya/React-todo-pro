import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Center({ children, span = 6, offset = 3 }) {
    return <Container>
        <Row>
            <Col sm={{span, offset}}>
                {children}
            </Col>
        </Row>
    </Container>
}