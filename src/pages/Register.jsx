import React, { useState } from 'react'
import { Center } from '../components'
import { useFormik } from "formik"
import * as yup from "yup"
import { Alert, Button, Container, Form, InputGroup } from 'react-bootstrap'
import axios from "axios"

export default function Register() {
    const [show, setshow] = useState(false)
    const [error, seterror] = useState()
    const formik = useFormik({
        initialValues: {
            name: "",
            userEmail: "",
            password: "",
            cpassword: ""
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required("Please Enter Name"),
            userEmail: yup
                .string()
                .required("Please Enter  Email")
                .email("Please Enter Valid Email"),
            password: yup
                .string()
                .required("Please Enter Password")
                .min(2, "please enter min 2 char"),
            cpassword: yup
                .string()
                .required("please enter Confirm Password")
                .oneOf([yup.ref("password")], "password do Not Mach")
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const URL = "http://localhost:5000/users"
                await axios.post(URL, { ...values, active: false, admin: true })
                setshow(true)
            } catch (err) {
                seterror(err.message)
                console.log(error);
            }

        }
    })
    return (<Container fluid className='registration-body'>
        {/* <h1>{JSON.stringify(formik.errors)}</h1> */}
        {
            show && <Alert variant='success' className='mt-5' onClose={() => setshow(false)} dismissible>
            {formik.values.name} Registered Successfully
        </Alert>
        }
        {
            error && error && <Alert variant='danger' className='mt-5' onClose={() => setshow(false)} dismissible>
            {error}
        </Alert>
        }
        <Form onSubmit={formik.handleSubmit} className='registration-form'>
            <h3 className='text-light mb-3'>User Registration</h3>
            <InputGroup className='mb-3' controlId="formBasicEmail">
                <Form.Label className='input-group-text' htmlFor="name">
                    <i className="bi bi-person-plus-fill"></i>
                </Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    isInvalid={formik.touched.name && formik.errors.name}
                    isValid={formik.touched.name && !formik.errors.name}
                    name='name' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.name}
                </Form.Text>
            </InputGroup>
            <InputGroup className='mb-3' controlId="formBasicEmail">
                <Form.Label className='input-group-text' htmlFor="email">
                    <i className="bi bi-envelope-plus-fill"></i>
                </Form.Label>
                <Form.Control
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userEmail}
                    isInvalid={formik.touched.userEmail && formik.errors.userEmail}
                    isValid={formik.touched.userEmail && !formik.errors.userEmail}
                    name='userEmail' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.name}
                </Form.Text>
            </InputGroup>
            <InputGroup className='mb-3' controlId="formBasicEmail">
                <Form.Label className='input-group-text' htmlFor="password">
                    <i className="bi bi-lock-fill"></i>
                </Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && formik.errors.password}
                    isValid={formik.touched.password && !formik.errors.password}
                    name='password' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.password}
                </Form.Text>
            </InputGroup>
            <InputGroup className='mb-3' controlId="formBasicEmail">
                <Form.Label className='input-group-text' htmlFor="cpassword">
                    <i class="bi bi-shield-lock-fill"></i>
                </Form.Label>
                <Form.Control
                    id="cpassword"
                    type="password"
                    placeholder="Confirm password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cpassword}
                    isInvalid={formik.touched.cpassword && formik.errors.cpassword}
                    isValid={formik.touched.cpassword && !formik.errors.cpassword}
                    name='cpassword' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.cpassword}
                </Form.Text>
            </InputGroup>
            {/* <InputGroup controlId="formBasicPassword">
                    <Form.Label>Conform Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </InputGroup> */}

            <Button className='register-btn btn' type="submit">
                Register User
            </Button>
        </Form>
    </Container>
    )
}
