import { useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import Apis, { authApi, endpoints } from "../configs/Apis"
import cookies from 'react-cookies'
import { useDispatch } from "react-redux"
import {use, useNavigate} from 'react-router-dom'
import { notificationContext } from "../App"
import { toast, ToastContainer } from "react-toastify"
import GoogleLogin from "react-google-login"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [countNC, setCountNC] = useState(0)
    const [commentNotification, setCommentNotification] = useState([])
    const [statusRes, setStatusRes] = useState(0)

    const login = async (event) => {
        event.preventDefault()
        
        const res = await Apis.post(endpoints['login'], {
            "grant_type": "password",
            'username': username,
            'password': password,
            'client_id': 'a3DtwPhJysEnwykevpXyHFfFb9chlqd3P3beJ8N7',
            'client_secret': '2X5GA4C5XGWjvvC0E4lMU0Fex1C0XORL2cCFj9rz2CpVrRZba8GrVVedQhY3jnqFprjTLaHYjpAcPCn3DNfabAL2bJsZ9nYCnQy3sn5PbTZGBSSMxUPhVJ5RakTrHLbm'
        })
        //lu vao cookies
        console.log(res.data)
        cookies.save('access_token', res.data.access_token)
        setStatusRes(res.status)

        const user = await authApi().get(endpoints['current-user'])
        console.log(user.data)
        cookies.save('user', user.data)
        dispatch({
            'type': 'USER_LOGIN',
            'payload': user.data
        })
        if(res.status === 200){
            toast.success("Login success", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
            setTimeout(() => {
                nav('/')
            }, 2000);
        }
        // const resCurrentUser = await authApi().get(endpoints['current-user'])
        // console.log(resCurrentUser.data)

        // const resNotification = await authApi().get(endpoints['get-notification'](resCurrentUser.data.id))
        
    }

    const responseGoogle = (response) => {
        console.log(response)
    }
    

    return (
        <Container>
            <h1 className="text-center text-info">ĐĂNG NHẬP NGƯỜI DÙNG</h1>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={login}>
                    Submit
                </Button>
                
            </Form>
            <ToastContainer></ToastContainer>
            
        </Container>
    )
}

export default Login