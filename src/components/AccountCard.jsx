import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, Card, Collapse, Container } from 'react-bootstrap'
import { UserState } from '../App'

export default function AccountCard({ item, handlePriority, handleDelete }) {
    const { setshowModal, seteditModalData, seteditId } = useContext(UserState)
    const [open, setOpen] = useState(false);
    return (
        <>

                <Card className="account-card">
                    <Card.Header
                     onClick={() => setOpen(!open)}
                     aria-controls={`todo${item.id}`}
                     aria-expanded={open}
                        className={handlePriority(item.priority)}
                    >
                        {item.todo}
                        <div>
                            <Button
                                onClick={e => {
                                    setshowModal(true)
                                    seteditId(item.id)
                                    seteditModalData({
                                        mtask: item.todo,
                                        mdesc: item.description,
                                        mpriority: item.priority,
                                        mcategory: item.category,
                                    })
                                }}
                                size="sm" variant='outline-light'>
                                <i className='bi bi-pencil-square'></i>
                            </Button>
                            &nbsp;&nbsp;
                            <Button onClick={e => { handleDelete(item.id) }}
                                size="sm" variant='outline-light'>
                                <i className='bi bi-trash'></i>
                            </Button>
                        </div>
                    </Card.Header>
                    <Collapse in={open}>
                        <div id={`todo${item.id}`}>
                    <Card.Body>
                        {item.description}
                    </Card.Body>
                        </div>
                    </Collapse>
                </Card>

                <br />
                
        </>
    )
}
