import { useRef, useState } from "react"
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { authApi, endpoints } from "../configs/Apis"

const PostUpdate = () => {
    const { postId } = useParams()
    const image = useRef()
    const [content, setContent] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const nav = useNavigate()

    const updatePost = async (event) => {
        event.preventDefault()
        // const res = await authApi().patch(endpoints['update-post'](postId), {
        //     'content': content,
        //     'image': image.current.files[0],
        //     'tags': tags
        // }, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // })

        const formData = new FormData()
        formData.append('content', content)
        formData.append('image', image.current.files[0])
        formData.append('tags', tags)

        const res = await authApi().patch(endpoints['update-post'](postId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(res.data)
        nav('/')
    }

    const addTag = (event) => {
        event.preventDefault()
        setTags(t => [...t, tag])
    }
    return (
        <Container>
            <h1 className="text-info text-center">CẬP NHẬT BÀI VIẾT</h1>
            <Form onSubmit={updatePost}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control value={content} onChange={(e) => setContent(e.target.value)} as="textarea" placeholder="enter your content" />
                </Form.Group>
                <Row>
                    <Col md={10}>
                        <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>HasTag</Form.Label>
                        <Form.Control type="text" rows={3} value={tag} onChange={e => setTag(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button variant="success" style={{marginTop:30, paddingLeft:35, paddingRight:35}} onClick={addTag}>Add</Button>
                    </Col>
                </Row>
                {tags.map(t => <Badge className="bg-info" style={{marginRight:10}}><h6>{t}</h6></Badge>)}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" ref={image}  className="form-control" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default PostUpdate
