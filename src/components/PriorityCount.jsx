import React from 'react'
import { Badge, Button, Container, Stack } from 'react-bootstrap'


export default function PriorityCount({ todos, settodo }) {
    const handleFilters = (arg) => {
        console.log(arg);
        settodo(todos.filter(item => item.priority === arg))
    }
    const handleAll = () => {
        console.log("All");
        settodo(todos)
    }
    return (
        <Container className="priority p-0">
            <Stack className='justify-content-between my-4' direction='horizontal' >
                <Button className='priority-btn' onClick={e => handleFilters("high")} variant='danger'>high<Badge bg='danger'>{todos.filter(item => item.priority === "high").length}</Badge></Button>
                <Button className='priority-btn' onClick={e => handleFilters("med")} variant='warning'>med<Badge bg='warning'>{todos.filter(item => item.priority === "med").length}</Badge></Button>
                <Button className='priority-btn' onClick={e => handleFilters("low")} variant='success'>low<Badge bg='success'>{todos.filter(item => item.priority === "low").length}</Badge></Button>
                <Button className='priority-btn' onClick={handleAll} variant='primary'>Total<Badge>{todos.length}</Badge></Button>
            </Stack>
        </Container>
    )
}
