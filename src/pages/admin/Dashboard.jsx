import React, { useContext, useRef } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Center } from '../../components'
import { Badge, Button, Container, Table } from 'react-bootstrap'
import { UserState } from '../../App'

export default function Dashbord() {
    const [datauser, setdatauser] = useState([])
    const [users, setusers] = useState([])
    const { handleClass } = useContext(UserState)
    const ref=useRef(null)
    const getAllUsers = async e => {
        const { data } = await axios
            .get("http://localhost:5000/users")
        console.log(data);
        setdatauser(data)
        setusers(data)
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    const handleUsers = (arg) => {
        switch (arg) {
            case "active": { return setusers(datauser.filter(item => item.active)) }
            case "admin": { return setusers(datauser.filter(item => item.admin)) }
            case "all": { return setusers(datauser) }
            default: return ""
        }
    }
    return <Container ref={ref} fluid className="dashboard-body body">
        <Center className={handleClass(ref)} >
            <Container fluid className="d-flex justify-content-between p-0 pt-5 mb-3">
                <Button variant="light" className="dashboard-btn" onClick={e => handleUsers("active")}>
                    Active
                    <Badge className="dashboard-badge">{datauser.filter(item => item.active === true).length}</Badge>
                </Button>
                <Button variant="light" className="dashboard-btn" onClick={e => handleUsers("admin")}>
                    Admin
                    <Badge className="dashboard-badge">{datauser.filter(item => item.admin === true).length}</Badge>
                </Button>
                <Button variant="light" className="dashboard-btn" onClick={e => handleUsers("all")}>
                    All
                    <Badge className="dashboard-badge">{users.length}</Badge>
                </Button>
            </Container>
            <Table bordered className="text-light">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Email ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, index) => <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.userEmail}</td>
                        </tr>
                        )
                    }


                </tbody>
            </Table>
        </Center>
    </Container>

}