import React, { useContext, useEffect, useState } from 'react'
import { Navbar, Nav, Container, Dropdown, Button, Collapse, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { UserState } from '../App'
// import "../assets/style"


export default function Navigation() {
    const navigate = useNavigate()
    const { login, setlogin, handleClass } = useContext(UserState)
    const [open, setOpen] = useState(false);
    const handleLogOut = () => {
        setlogin({})
    }

    useEffect(() => {
        if (!login.name) {
            navigate('/login')
        }
    }, [login])
    return <>
        <Navbar id="navbar" variant="dark" bg="transparent" expand="lg">
            <Container fluid>
                <Link to='/account' className="navbar-brand mx-5">Todo Pro</Link>
                <Navbar.Toggle aria-controls="navbarScroll" onClick={e=>handleClass("account")} />
                <Navbar.Collapse id="navbarScroll">

                    {
                        login.name
                            ? <Nav className="ms-auto my-2 my-lg-0">
                                <Nav.Link as={Link} to="/account">Account</Nav.Link>
                                <Nav.Link as={Link} to="/addtodo">AddTodo</Nav.Link>
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Container className='login nav-link d-flex flex-column w-25'>
                                    <Button
                                        className="dropdown-btn w-100"
                                        onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                    >
                                        {login.name}
                                    </Button>
                                    <Collapse className="logout" in={open}>
                                        <div className='w-100 mt-2'>
                                            <Button
                                                variant='light'
                                                onClick={handleLogOut}
                                                className="logout-btn w-100"
                                            >LogOut</Button>
                                        </div>
                                    </Collapse>
                                </Container>
                            </Nav>
                            : <Nav className="ms-auto my-2 my-lg-0">
                                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}