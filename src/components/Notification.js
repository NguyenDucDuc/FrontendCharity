import { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Apis, { authApi, endpoints } from '../configs/Apis'

const Notification = () => {

    const [commentNotification, setCommentNotification] = useState([])
    const [auctionWinner, setAuctionWinner] = useState([])
    const [auctionLoser, setAuctionLoser] = useState([])
    const [likeNotification, setLikeNotification] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        const loadCommentNotification = async () => {
            const resCurrentUser = await authApi().get(endpoints['current-user'])
            console.log(resCurrentUser.data)

            // try {

            //     //Goi API notification Auction
            //     const resAuction = await Apis.get(endpoints['get-auction-winner'](resCurrentUser.data.id))
            //     console.log(resAuction.data)
            //     setAuctionWinner(resAuction.data)

            //     const resLikeNotification = await authApi().get(endpoints['get-like-notification'](resCurrentUser.data.id))
            //     console.log(resLikeNotification.data)
            //     setLikeNotification(resLikeNotification.data)

                
            // } catch (error) {
            //     console.log(error)
            // } finally {

            //     const resNotification = await authApi().get(endpoints['get-notification'](resCurrentUser.data.id))
            //     setCommentNotification(resNotification.data)

                
                

            //     //Call API auction loser de lay ra thong bao that bai cho user co dau gia

            //     const resAuctionLoser = await Apis.get(endpoints['get-auction-loser'](resCurrentUser.data.id))
            //     console.log(resAuctionLoser.data)
            //     setAuctionLoser(resAuctionLoser.data)
            // }


            try {
                //Goi API notification Auction winner
                const resAuction = await Apis.get(endpoints['get-auction-winner'](resCurrentUser.data.id))
                console.log(resAuction.data)
                setAuctionWinner(resAuction.data)
            } catch (error) {
                
            } finally {
                try {
                    //Call API auction loser de lay ra thong bao that bai cho user co dau gia

                    const resAuctionLoser = await Apis.get(endpoints['get-auction-loser'](resCurrentUser.data.id))
                    console.log(resAuctionLoser.data)
                    setAuctionLoser(resAuctionLoser.data)
                } catch (error) {
                    
                } finally {
                    try {
                        const resNotification = await authApi().get(endpoints['get-notification'](resCurrentUser.data.id))
                    setCommentNotification(resNotification.data)
                    } catch (error) {
                        
                    } finally {
                        const resLikeNotification = await authApi().get(endpoints['get-like-notification'](resCurrentUser.data.id))
                        console.log(resLikeNotification.data)
                        setLikeNotification(resLikeNotification.data)
                    }
                }
            }

            // const resNotification = await authApi().get(endpoints['get-notification'](resCurrentUser.data.id))
            // setCommentNotification(resNotification.data)

            //Goi API notification Auction
            // const resAuction = await Apis.get(endpoints['get-auction-winner'](resCurrentUser.data.id))
            // console.log(resAuction.data)
            // setAuctionWinner(resAuction.data)

            // lap trong mang nhung bai post da cong bo nguoi thang cuoc


            //const resAuctionInfo = await Apis.get(endpoints['get-auction-info'](resAuction.data.))

        }

        loadCommentNotification()
    }, [])



    return (
        <Container>
            <h1 className="text-info text-center">THÔNG BÁO</h1>
            {commentNotification.map(c =>

                // <Alert  variant="info">
                //     Bạn có một bình luận mới. <Link to={`/posts/${c.post}`} className='text-danger'>Xem chi tiết</Link>
                // </Alert>
                <Row>
                    <Col md={10}>
                        <Alert>Bạn có một bình luận mới</Alert>
                    </Col>
                    <Col md={2}>
                        <Button variant='success' onClick={() => nav(`/posts/${c.post}`)} style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 40, paddingRight: 40 }}>Xem</Button>
                    </Col>
                </Row>

            )}
            {auctionWinner !== undefined && auctionWinner.map(a =>
                <Row>
                    <Col md={10}>
                        <Alert variant='danger'>Chúc mừng bạn đã thắng đấu giá</Alert>
                    </Col>
                    <Col md={2}>
                        <Button variant='danger' onClick={() => nav(`/posts/${a.post.id}`)} style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 40, paddingRight: 40 }}>Xem</Button>
                    </Col>
                </Row>
            )}

            {auctionLoser !== undefined && auctionLoser.map(a =>
                <Row>
                    <Col md={10}>
                        <Alert variant='warning'>Bạn đã thua đấu giá</Alert>
                    </Col>
                    <Col md={2}>
                        <Button variant='warning' onClick={() => nav(`/posts/${a.post.id}`)} style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 40, paddingRight: 40 }}>Xem</Button>
                    </Col>
                </Row>
            )}

            {likeNotification.map(l => 
                <Row>
                    <Col md={10}>
                        <Alert variant='info'>Bạn có một lượt thích mới </Alert>
                    </Col>
                    <Col md={2}>
                        <Button variant='info' onClick={() => nav(`/posts/${l.post.id}`)} style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 40, paddingRight: 40 }}>Xem</Button>
                    </Col>
                </Row>
                
            )}
        </Container>
    )
}

export default Notification