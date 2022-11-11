import { useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, Card, Col, Container, Image, Pagination, Row, Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Apis, { authApi, endpoints } from "../configs/Apis"
import PostCard from "./PostCart"
import default_avatar from '../image/default_avatar.jpg'
import default_post from '../image/default.jpg'


const Home = () => {

    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(0)
    const nav = useNavigate()
    const user = useSelector(state => state.user.user)
    const [q] = useSearchParams()


    useEffect(() => {
        const loadPost = async () => {
            let query = ""
            let kw = q.get("kw")
            let page = q.get("page")
            if(page===null)
                query+=`page=${1}`
            else
                query+=`page=${page}`
            if (kw !== null)
                if (query === "")
                    query += `kw=${kw}`
                else
                    query += `&kw=${kw}`

            //let res = await Apis.get(endpoints['posts'])
            let res = await Apis.get(`${endpoints['posts']}?${query}`)
            setPosts(res.data.results)
            console.log(res.data)
            setCount(res.data.count)
            
        }

        loadPost()

    }, [q])

    const goToPostDetail = (event, id) => {
        event.preventDefault()
        nav(`/posts/${id}`)
    }

    // if(user !== null && user !== undefined){
    //     const loadCommentNotification = async () => {
    //         const resCurrentUser = await authApi().get(endpoints['current-user'])
    //         console.log(resCurrentUser.data)

    //         const resNotification = await authApi().get(endpoints['get-notification'](resCurrentUser.data.id))
    //         console.log(resNotification.data)
    //     }
    //     loadCommentNotification()
    // }

    let items = []
    for (let i = 1; i <= Math.ceil(count/9); i++) {
        items.push(
          <Pagination.Item key={i}>
            <Link to={`/?page=${i}`}>{i}</Link>
          </Pagination.Item>,
        );
    }


    return (
        <Container>
            <br></br>
            <br></br>
            <h1 className="text-info text-center">MẠNG XÃ HỘI TỪ THIỆN</h1>
            
            <Pagination>
                {items}
            </Pagination>
            {posts.length == 0 && <>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </>
            }
            <Row>
                {posts.map(p =>
                    <Col md={4}>
                        <Card style={{ width: '18rem', marginTop: 50 }} className="">

                            <Row style={{marginLeft: 5}}>
                                {p.user.avatar!=="http://127.0.0.1:8000/static/" && <Image src={p.user.avatar} width={40} height={40} style={{borderRadius:40}}></Image>}
                                {p.user.avatar==="http://127.0.0.1:8000/static/" && <Image src={default_avatar} width={40} height={40} style={{borderRadius:40}}></Image>}
                                <Link to={`/users/${p.user.id}`}>
                                    <h6 className="text-info">{p.user.username}</h6>
                                </Link>
                                
                            </Row>

                            {p.image!=="http://127.0.0.1:8000/static/undefined" && <Card.Img variant="top" src={p.image} style={{ height: 260 }} />}
                            {p.image==="http://127.0.0.1:8000/static/undefined" && <Card.Img variant="top" src={default_post} style={{ height: 260 }} />}
                            <Card.Body>
                                <Card.Text>
                                    <h5 className="" dangerouslySetInnerHTML={{ __html: p.content }}></h5>
                                    {p.tags.map(t => <Badge style={{ marginLeft: 10 }} className="bg-info">{t.name}</Badge>)}
                                </Card.Text>
                                <Button variant="primary" onClick={() => nav(`/posts/${p.id}`)}>Chi tiết</Button>

                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>

        </Container>
    )
}
export default Home