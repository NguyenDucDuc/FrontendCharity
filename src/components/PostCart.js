import { Badge, Button, Card, Col } from "react-bootstrap"

const PostCard = (props) => {
    return (
        <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    
                    <Card.Text>
                        <div dangerouslySetInnerHTML={{__html: props.content}}></div>
                        <Badge>{props.tag}</Badge>
                    </Card.Text>
                    <Button variant="primary">Chi tiết</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PostCard