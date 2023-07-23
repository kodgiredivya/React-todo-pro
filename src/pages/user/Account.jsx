import axios from 'axios'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { Center } from '../../components'
import AccountCard from '../../components/AccountCard'
import CategoryCount from '../../components/CategoryCount'
import PriorityCount from '../../components/PriorityCount'
import { UserState } from '../../App'
export default function Account() {
  const [todos, settodos] = useState([])
  const [todo, settodo] = useState([])
  const ref = useRef(null);
  const { showModal, setshowModal, editModalData, seteditModalData, editId, handleClass } = useContext(UserState)

  const getAllTodos = async () => {
    const { data } = await axios
      .get("http://localhost:5000/todos")
    console.log(data);
    settodos(data)
    settodo(data)
  }
  useEffect(() => {
    getAllTodos()
  }, [])

  const handlePriority = (pri) => {
    switch (pri) {
      case "high": return "bg-danger accordion-header d-flex justify-content-between"
      case "med": return "bg-warning accordion-header d-flex justify-content-between"
      case "low": return "bg-success accordion-header d-flex justify-content-between"
      default: return ""
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.put(`http://localhost:5000/todos/${editId}`,
      {
        todo: editModalData.mtask,
        description: editModalData.mdesc,
        priority: editModalData.mpriority,
        category: editModalData.mcategory
      })
    getAllTodos()
  }
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/todos/${id}`)
    getAllTodos()
  }


  return (
    <Container ref={ref} fluid className='account body'>
      <Center className={handleClass(ref)}>
        <PriorityCount todos={todos} settodo={settodo} />
        <CategoryCount todos={todos} settodo={settodo} />
        {
          todo.map((item, index) => <AccountCard item={item} key={item.id} handleDelete={handleDelete} handlePriority={handlePriority} />
          )
        }
        <Modal className='editmodal' show={showModal} onHide={e => { setshowModal(false) }}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => { handleSubmit(e) }}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  type="text"
                  name="task"
                  onChange={e => { seteditModalData({ ...editModalData, mtask: e.target.value }) }}
                  value={editModalData.mtask}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3}
                  name="desc"
                  type="text"
                  onChange={e => { seteditModalData({ ...editModalData, mdesc: e.target.value }) }}
                  value={editModalData.mdesc}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Priority</Form.Label>
                <Form.Select aria-label="Default select example" name='priority'
                  // type="text"
                  as="select"
                  onChange={e => { seteditModalData({ ...editModalData, mpriority: e.target.value }) }}
                  value={editModalData.mpriority}
                >
                  <option className='option'>Priority</option>
                  <option className='option' value="high">High</option>
                  <option className='option' value="med">Med</option>
                  <option className='option' value="low">Low</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example"
                  as="select"
                  name='category'
                  onChange={e => { seteditModalData({ ...editModalData, mcategory: e.target.value }) }}
                  value={editModalData.mcategory}
                >
                  <option className='option'>Category</option>
                  <option className='option' value="study">study</option>
                  <option className='option' value="personal">personal</option>
                  <option className='option' value="office">office</option>
                  <option className='option' value="college">college</option>
                </Form.Select>
              </Form.Group>
              <Button
                onClick={e => { setshowModal(false) }}
                className='mt-4 update-btn' type="submit" >
                Update
              </Button>
            </Form>
          </Modal.Body>

        </Modal>
      </Center >

    </Container>
  )
}
