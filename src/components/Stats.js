import { Bar, Doughnut } from 'react-chartjs-2'
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from 'react';
import Apis, { authApi, endpoints } from '../configs/Apis'
import { useNavigate } from 'react-router-dom';


const Stats = () => {

    const [stats, setStats] = useState([])
    const [statsDetail, setStatsDetail] = useState([])
    const [postId, setPostId] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        const loadStats = async () => {
            const res = await Apis.get(endpoints['stats'])
            console.log(res.data)
            setStats(res.data)
        }

        loadStats()
    }, [])

    const data1 = {
        labels: ["Posts", "Like", "Comment"],
        datasets: [{
            label: 'Tổng thống kê',
            data: [stats.count, stats.count_like, stats.count_comment],
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

    const getStatsDetail = async (event) => {
        event.preventDefault()
        nav(`/stats/?post_id=${postId}`)
        const res = await Apis.get(endpoints['stats-detail'](postId))
        console.log(res.data)
        setStatsDetail(res.data)
        
    }

    const data2 = {
        labels: ["Like", "Comment"],
        datasets: [{
            label: 'Thống kê chi tiết từng bài',
            data: [statsDetail.count_like, statsDetail.count_comment],
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

    const navToPostId = (event) => {
        event.preventDefault()
        
    }

    return (
        <Container>
            <h1 className="text-info text-center">THỐNG KÊ</h1>
            <div style={{ width: 600 }}>
                <Bar data={data1} />
            </div>
            <Row>
                <Col md={7}>
                    <Bar data={data2} />
                </Col>

                <Col md={5}>
                    <h3 className='text-center text-info'>Tìm kiếm</h3>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Post Id</Form.Label>
                            <Form.Control value={postId} onChange={e => setPostId(e.target.value)} type="text" placeholder="Enter post id" />
                        </Form.Group>
                        <Button onClick={getStatsDetail}  variant="info" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Stats