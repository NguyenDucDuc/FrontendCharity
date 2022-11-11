import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { authApi, endpoints } from "../configs/Apis"
import {toast, Zoom, ToastContainer} from 'react-toastify'

const Report = () => {
    const { postId } = useParams()
    const [selected, setSelected] = useState()
    const nav = useNavigate()
    const addReport = async (event) => {
        event.preventDefault()
        const res = await authApi().post(endpoints['report'](postId),{
            "reason": selected
        }, {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        })
        console.log(res.data)
    }

    const alertSuccess = () => {
        toast.success("Report success", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
        })
        setTimeout(() => {
            nav('/')
        }, 4000);
    }
    return (
        <Container>
            <h1 className="text-info text-center">BÁO CÁO BÀI VIẾT</h1>
            <Form onSubmit={addReport}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Choose reason:</Form.Label>
                    <select value={selected} onChange={e => setSelected(e.target.value)} className="form-control">
                        <option>ngôn ngữ không phù hợp</option>
                        <option>không thanh toán sau đấu giá</option>
                    </select>
                </Form.Group>
                <Button type="submit" onClick={alertSuccess}>Submit</Button>
            </Form>
            <ToastContainer>

            </ToastContainer>
        </Container>
    )
}

export default Report