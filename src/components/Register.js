import { useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import {toast, ToastContainer} from 'react-toastify'

const Register = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [email, setEmail] = useState('')
    const avatar = useRef()
    const nav = useNavigate()

    const register = (event) => {
        event.preventDefault()

        let registerUser = async () => {
            const formData = new FormData()
            formData.append("first_name", firstname)
            formData.append("last_name", lastname)
            formData.append("email", email)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("avatar", avatar.current.files[0])
            console.log(formData.get('avatar'))

            // const res = await Apis.post(endpoints['register'], {
            //     "first_name": firstname,
            //     "last_name": lastname,
            //     "email": email,
            //     "username": username,
            //     "password": password,
            //     "avatar": avatar.current.files[0]
            // }, {
            //     headers:{
            //         "Content-Type":"multipart/form-data"
            //     }
            // })

            const res = await Apis.post(endpoints['register'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            console.log(res.data)
        }
        if(password!==null && password === confirm){
            registerUser()
        }
    } 

    const alertSuccess = () => {
        toast.success("Register seccess", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        })

        setTimeout(() => {
            nav('/login')
        }, 4000);
    }
    return (
        <Container>
            <Form onSubmit={register}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter fist name" value={firstname} onChange={e => setFirstname(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" value={lastname} onChange={e => setLastname(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={confirm} onChange={e => setConfirm(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" ref={avatar} className="form-control" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={alertSuccess}>
                    Submit
                </Button>
            </Form>
            
            <ToastContainer></ToastContainer>
        </Container>
    )
}

export default Register