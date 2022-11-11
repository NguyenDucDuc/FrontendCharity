import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { authApi, endpoints } from "../configs/Apis"
import {toast, ToastContainer} from "react-toastify"

const AuctionResult = () => {
    const { postId } = useParams()
    const [auctionInfos, setAuctionInfos] = useState([])
    const [currentUser, setCurrentuser] = useState([])
    const nav = useNavigate()

    useEffect( () => {
        const loadAuctionInfos = async () => {
            const res = await authApi().get(endpoints['get-auction-info'](postId))
            console.log(res.data)
            setAuctionInfos(res.data)
        }

        loadAuctionInfos()
    },[])

    const sendAuctionWinner = async ( winnerId) => {
        // const resCurrentUser = await authApi().get(endpoints['current-user'])
        // console.log(resCurrentUser.data)
        // setCurrentuser(resCurrentUser.data.id)


        const res = await authApi().post(endpoints['send-auction-winner'](winnerId), {
            "post_id": postId,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        toast.success("Success", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:1000
        })

        setTimeout(() => {
            nav('/')
        }, 2000);
        
    }

    const sendAuctionLoser = async (loserId) => {
        const res = await authApi().post(endpoints['send-auction-loser'](loserId), {
            "post_id": postId
        }, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
        console.log(res.data)
        toast.success("Success", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:1000
        })

        setTimeout(() => {
            nav('/')
        }, 2000);
    }


    return (
        <Container>
            <h1  className="text-info text-center">KẾT QUẢ ĐẤU GIÁ</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Auction Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {auctionInfos.map(a => 
                        <tr>
                            <td>{a.user.first_name}</td>
                            <td>{a.user.last_name}</td>
                            <td>{a.user.username}</td>
                            <td>{a.price}</td>
                            <td><Button variant="success" onClick={() => sendAuctionWinner(a.user.id)}>Winner</Button></td>
                            <td><Button variant="danger" onClick={() => sendAuctionLoser(a.user.id)}>Loser</Button></td>
                        </tr>

                    )}

                    
                    
                </tbody>
            </Table>
            <ToastContainer></ToastContainer>
        </Container>
    )
}

export default AuctionResult