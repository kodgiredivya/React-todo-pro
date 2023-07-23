import React from 'react'
import { Badge, Button, Container, Stack } from 'react-bootstrap'

export default function CategoryCount({ todos, settodo }) {
    const handleFilters = (arg) => {
        console.log(arg);
        settodo(todos.filter(item => item.category === arg))
    }
    const handleAll = () => {
        console.log("All");
        settodo(todos)
    }
    return (
        <Container className="category p-0">
            <Stack className='justify-content-between my-4' direction='horizontal' >
                <Button
                className="category-btn" onClick={e => handleFilters("study")}
                    variant='info'
                >Study
                    <Badge bg='info'>{todos.filter(item => item.category === "study").length}</Badge>
                </Button>
                <Button
                className="category-btn" onClick={e => handleFilters("personal")}
                    variant='info'
                >Personal
                    <Badge bg='info'>{todos.filter(item => item.category === "personal").length}</Badge>
                </Button>
                <Button
                className="category-btn" onClick={e => handleFilters("office")}
                    variant='info'
                >Office
                    <Badge bg='info'>{todos.filter(item => item.category === "office").length}</Badge>
                </Button>
                <Button
                className="category-btn" onClick={e => handleFilters("college")}
                    variant='info'
                >College
                    <Badge bg='info'>{todos.filter(item => item.category === "college").length}</Badge>
                </Button>
                <Button
                className="category-btn"
                    onClick={handleAll}
                    variant='info'
                >All
                    <Badge bg='info'>{todos.length}</Badge>
                </Button>
            </Stack>
        </Container>
    )
}
