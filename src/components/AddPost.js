import { useEffect, useRef, useState } from "react"
import { Badge, Button, Col, Container, Form, FormSelect, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Apis, { authApi, endpoints } from "../configs/Apis"

const AddPost = () => {

    const [content, setContent] = useState("")
    const [tag, setTag] = useState("")
    const [tags, setTags] = useState([])
    const [tagsRQ, setTagsRQ] = useState([])
    const [tagSelected, setTagSelected] = useState([])
    const [statusRes, setStatusRes] = useState(0)
    const image = useRef()
    const nav = useNavigate()

    const addPost = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('content', content)
        formData.append('image', image.current.files[0])
        formData.append('tag_arr', tagsRQ)

        const res = await authApi().post(endpoints['add-post'], formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        // const res = await authApi().post(endpoints['add-post'], {
        //     "content": content,
        //     "image": image.current.files[0],
        //     //"tag": tag,
        //     "tag_arr": tagsRQ
            
        // },{
        //     headers:{
        //         "Content-Type":"multipart/form-data"
        //     }
        // })

        console.log(res.data)
        setStatusRes(res.status)
        nav('/')
    }

    useEffect( () => {
        const loadTags = async () => {
            const res = await Apis.get(endpoints['tags'])
            console.log(res.data)
            setTags(res.data)
        }

        loadTags()
    },[])

    const addTag = (event) => {
        event.preventDefault()
        setTagsRQ(t => [...t, tag])
    }

    const alertAddPost = (event) => {
        event.preventDefault()
        if(statusRes === 200){
            toast.success("Add post success", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
            })
    
            setTimeout(() => {
                nav('/')
            }, 4000);
        }else{
            toast.error("Add error !!!",{position: toast.POSITION.BOTTOM_RIGHT})
        }
        
    }

    return (
        <Container>
            <h1 className="text-center text-info">BÀI VIẾT MỚI</h1>
            <Form onSubmit={addPost}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} value={content} onChange={e => setContent(e.target.value)} />
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
                {tagsRQ.map(t => <Badge className="bg-info" style={{marginRight:10}}><h6>{t}</h6></Badge>)}
                
                <Form.Group className="mb-3">
                    <Form.Label>HasTag Avaible</Form.Label>
                    
                    <select  className="form-control" multiple="true">
                        {tags.map(t => <option>{t.name}</option>)}
                    </select>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose image</Form.Label>
                    <Form.Control type="file" ref={image} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddPost