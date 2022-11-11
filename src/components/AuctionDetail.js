import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { authApi, endpoints } from "../configs/Apis"

const AuctionDetail = () => {
    const {postId} = useParams()
    const [price, setPrice] = useState()
    const nav = useNavigate()

    const addAuction = async (event) => {
        event.preventDefault()
        const res = await authApi().post(endpoints['add-auction'](postId),{
            'price': price,
        },{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if(res.status === 201){
            toast.success("Add auction success",{position:toast.POSITION.TOP_RIGHT, autoClose:1000})
            setTimeout(() => {
                nav('/')
            }, 2000);
        }
    }
    return(
        <Container>
            <h1 className="text-info text-center">THÊM THÔNG TIN ĐẤU GIÁ</h1>
            <Form onSubmit={addAuction}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={price} onChange={e => setPrice(e.target.value)} type="text" placeholder="Enter price you want" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ToastContainer></ToastContainer>
        </Container>
    )
}

export default AuctionDetail