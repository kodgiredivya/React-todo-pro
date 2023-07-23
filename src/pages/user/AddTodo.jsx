import React, { useContext, useState } from 'react'
import { Button, Form, Alert, Container } from 'react-bootstrap'
import { Center } from '../../components'
import { useFormik } from "formik"
import * as yup from "yup"
import axios from "axios"
import { useRef } from 'react'
import { UserState } from '../../App'

export default function AddTodo() {
    const [show, setshow] = useState(false)


    const [error, seterror] = useState()
    const ref = useRef(null)
    const { handleClass } = useContext(UserState)
    const formik = useFormik({
        initialValues: {
            todo: "",
            description: "",
            priority: "",
            category: ""
        },
        validationSchema: yup.object({
            todo: yup.string().required("Please Enter Todo"),
            description: yup.string().required("Please Enter description"),
            priority: yup.string().required("Please Enter Priority"),
            category: yup.string().required("Please Enter category")
        }),
        onSubmit: async (values) => {
            try {
                console.log(values)
                const URL = "http://localhost:5000/todos"
                await axios.post(URL, values);
            } catch (err) {
                seterror(err.message)
            }

            setshow(true)
        }

    })
    return <Container ref={ref} fluid className="add-todo body">
        <Center className={handleClass(ref)}>

            {
                show && <Alert variant='success' className='mt-5' onClose={() => setshow(false)} dismissible>
                    {formik.todo} TODO Added Successfully
                </Alert>
            }
            {
                error && <Alert variant='danger' className='mt-5' onClose={() => setshow(false)} dismissible>
                {error}
            </Alert>
            }
            <Form className='p-5 addtodo-form w-75' onSubmit={formik.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Todo Title</Form.Label>
                    <Form.Control
                        name="todo"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.todo && formik.errors.todo}
                        isValid={formik.touched.todo && !formik.errors.todo}
                        placeholder="Enter Todo" />
                    <Form.Text className="invalid-feedback">
                        {formik.errors.todo}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        type="text"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.textarea && formik.errors.textarea}
                        isValid={formik.touched.textarea && !formik.errors.textarea}
                        placeholder='Description' />
                    <Form.Text className="invalid-feedback">
                        {formik.errors.textarea}
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId="exampleForm.ControlSelect1">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                        name="priority"
                        as="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Choose Priority"
                        isInvalid={formik.touched.priority && formik.errors.priority}
                        isValid={formik.touched.priority && !formik.errors.priority}
                        aria-label="Default select example">
                        <option>Priority</option>
                        <option value="high">high</option>
                        <option value="med">med</option>
                        <option value="low">low</option>
                        <Form.Text className="invalid-feedback">
                            {formik.errors.priority}
                        </Form.Text>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect2">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="category"
                        as="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder=""
                        isInvalid={formik.touched.category && formik.errors.category}
                        isValid={formik.touched.category && !formik.errors.category}
                    >
                        <option>Category</option>
                        <option value="study">Study</option>
                        <option value="personal">personal</option>
                        <option value="office">office</option>
                        <option value="college">College</option>
                        <Form.Text className="invalid-feedback">
                            {formik.errors.category}
                        </Form.Text>
                    </Form.Select>
                </Form.Group>

                <Button className='addtodo-btn' type="submit">Add Todo</Button>

            </Form>
        </Center>
    </Container>
}