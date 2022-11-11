import { Card, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import default_avatar from '../image/default_avatar.jpg'
import default_post from '../image/default.jpg'

const ProfileStats = () => {
    const { userId } = useParams()
    const [user, setUser] = useState([])
    const [userStats, setUserStats] = useState([])

    useEffect(() => {
        const loadUser = async () => {
            const res = await Apis.get(endpoints['user-detail'](userId))
            console.log(res.data)
            setUser(res.data)
        }

        const loadUserStats = async () => {
            const resUserStats = await Apis.get(endpoints['user-stats'](userId))
            console.log(resUserStats.data)
            setUserStats(resUserStats.data)
        }

        loadUser()
        loadUserStats()
    }, [])

    const data = {
        labels: ["Posts", "Like", "Comment"],
        datasets: [{
            label: 'Tổng thống kê',
            data: [userStats.count_post, userStats.count_like, userStats.count_comment],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    return (
        <Container>
            <h1 className="text-center text-info">THỐNG KÊ </h1>

            <Row>
                <Col md={7}>
                    <div style={{ width: 400 }}>
                        <Doughnut data={data} />
                    </div>
                </Col>

                <Col md={5}>
                    <Card style={{ width: 300, height:300 }}>
                        {user.avatar==="http://127.0.0.1:8000/static/" && <Card.Img variant="top" src={default_avatar} />}
                        {user.avatar!=="http://127.0.0.1:8000/static/" && <Card.Img variant="top" src={user.avatar} />}
                        
                        <Card.Body>
                            <Card.Title>Họ tên: <span className="text-danger">{`${user.first_name} ${user.last_name}`}</span></Card.Title>
                            <Card.Title>Username: <span className="text-info">{user.username}</span></Card.Title>
                            <Card.Title>Tổng số bài viết: <span className="text-success">{userStats.count_post}</span></Card.Title>
                            <Card.Title>Tổng số like: <span className="text-success">{userStats.count_like}</span></Card.Title>
                            <Card.Title>Tổng số bình luận: <span className="text-success">{userStats.count_comment}</span></Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default ProfileStats