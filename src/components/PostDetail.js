import { useEffect, useState } from "react"
import { Badge, Button, Col, Container, Form, Image, Row, Spinner } from "react-bootstrap"
import { useParams, Link, useNavigate } from "react-router-dom"
import Apis, { endpoints, authApi } from "../configs/Apis"
import Moment, { } from "react-moment"
import {useSelector} from 'react-redux'
import default_avatar from '../image/default_avatar.jpg'
import Auction from "./Auction"
import default_post from '../image/default.jpg'
import { toast, ToastContainer } from "react-toastify"

const PostDetail = () => {
    const { postId } = useParams()
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState("")
    const user = useSelector(state => state.user.user)
    const [liked, setLiked] = useState(false)
    const [userId, setUserId] = useState()
    const [currentUser, setCurrentUser] = useState([])
    const nav = useNavigate()
   

    useEffect(() => {
        const loadPost = async () => {
            let res = await Apis.get(endpoints['post-detail'](postId))
            const resCurrentUser = await authApi().get(endpoints['current-user'])
            setPost(res.data)
            console.log(res.data)
            setUserId(res.data.user.id)


            console.log(resCurrentUser.data)
            setCurrentUser(resCurrentUser.data)
            
        }


        loadPost()

    },[])

    useEffect(() => {
        const loadComments = async () => {
            let res = await Apis.get(endpoints['post-comments'](postId))

            setComments(res.data)

            console.log(res.data)
        }

        loadComments()
    }, [])

    const addComment = async (event) => {
        event.preventDefault()
        const res = await authApi().post(endpoints['post-add-comment'](postId),{ 
            'content': commentContent
        })
        console.log(res.data)
        setComments([...comments, res.data])

        const resSendNotification = await authApi().post(endpoints['comment-notification'](userId), {
            "post_id": postId
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(resSendNotification.data)
        

    }

    let comment = <em><Link to='/login'>Đăng nhập để bình luận</Link></em>
    if(user !== null && user!== undefined){
        comment = <>
            <Form onSubmit={addComment}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Viết bình luận</Form.Label>
                    <Form.Control as="textarea" rows={3} value={commentContent} onChange={e => setCommentContent(e.target.value)} />
                </Form.Group>
                <Button variant="info" type="submit">Thêm bình luận</Button>
            </Form>
        </>
    }

    const like = async (event) => {
        event.preventDefault()
        const res = await authApi().post(endpoints['like'](postId))
        console.log(res.data)
        
        const resLikeNotification = await authApi().post(endpoints['send-like-notification'](userId), {
            "post_id": postId,
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(resLikeNotification.data)

        if(res.status === 200){
            setLiked(res.data.active_like)
            toast.success("Liked",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose:1000
            })
        }

        
    }

    const deletePost = async (event) => {
        event.preventDefault()
        const res = await authApi().delete(endpoints['post-delete'](postId))
        if(res.status === 204){
            toast.success("Delete success", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })

            setTimeout(() => {
                nav('/')
            }, 4000);
        }
            
    }


    let likeStatus = "outline-primary"
    if (liked === true)
        likeStatus = "primary"
    

    return (
        <Container>
            <Row>
                <Col md={7}>
                    {post.image!=="http://127.0.0.1:8000/static/undefined" && <Image src={post.image} fluid />}
                    {post.image==="http://127.0.0.1:8000/static/undefined" && <Image src={default_post} fluid />}
                    
                </Col>

                <Col md={5}>
                    <h3><div dangerouslySetInnerHTML={{ __html: post.content }}></div></h3>
                    
                    
                    <Button variant={likeStatus} onClick={like} style={{paddingLeft: 40, paddingRight:40}}>Like</Button>
                    {userId !== currentUser.id && <Button variant="success" style={{paddingLeft: 30, paddingRight:30, marginLeft: 20}}  onClick={() => nav(`/posts/${post.id}/auction`)}>Auction</Button> }
                    {userId === currentUser.id && <Button variant="success" style={{paddingLeft: 30, paddingRight:30, marginLeft: 20}} onClick={() => nav(`/posts/${post.id}/auction-result`)}>Auction Result</Button>}
                    {userId === currentUser.id && <Button variant="danger" style={{paddingLeft: 30, paddingRight:30, marginLeft: 20}} onClick={deletePost}>Delete</Button>}
                    {userId === currentUser.id && <Button variant="info" style={{marginTop: 20, paddingLeft: 28, paddingRight: 28}} onClick={() => nav(`/posts/${post.id}/post-update`)}>Update</Button>}
                    {userId !== currentUser.id && <Button variant="danger" style={{paddingLeft:30, paddingRight:30, marginLeft: 20}} onClick={() => nav(`/posts/${post.id}/report`)}>Report</Button>}
                </Col>
            </Row>

            <h2 className="text-center text-info">BÌNH LUẬN</h2>
            
            {comment}

            {comments.length == 0 && <>
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
            
            <hr></hr>
            {comments.map(c =>
                <>
                    <Row style={{ marginBottom: 30 }}>
                        <Col md={2}>
                            {c.user.avatar === "http://127.0.0.1:8000/static/" && <Image src={default_avatar} roundedCircle width={90} height={90} />}
                            {c.user.avatar !== "http://127.0.0.1:8000/static/" && <Image src={c.user.avatar} roundedCircle width={90} height={90} />}
                            
                        </Col>
                        <Col md={10} >
                            <div><b>Được bình luận bởi</b>: <b className="text-info">{c.user.username}</b> About: <Moment fromNow>{c.created_date}</Moment>  </div>

                            <b>{c.content}</b>
                        </Col>
                    </Row>
                </>
            )}
            <ToastContainer></ToastContainer>

        </Container>
    )
}

export default PostDetail