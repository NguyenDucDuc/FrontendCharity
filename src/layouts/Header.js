import { Badge, Button, Container, Form, FormControl, Image, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import cookies from 'react-cookies'
import default_avatar from '../image/default_avatar.jpg'
import { authApi, endpoints } from '../configs/Apis'
import { useEffect, useState } from 'react'

const Header = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [kw, setKw] = useState("")

    const logout = (event) => {
        event.preventDefault()
        cookies.remove('access_token')
        cookies.remove('user')
        dispatch({
            'type': 'USER_LOGOUT',
            'payload': null
        })
        nav("/login")
    }

    const search = (event) => {
        event.preventDefault()
        nav(`/?kw=${kw}`)
    }


    let path = <Link to='/login' className='nav-link text-info'>Đăng nhập</Link>
    let themBaiViet = ""
    let thongBao = ""
    let thongKe=""
    if (user !== null && user !== undefined) {
        path =
            <>

                <Link to='/' className='nav-link text-info'>{user.username}</Link>
                {user.avatar === "http://127.0.0.1:8000/static/" && <Image src={default_avatar} width={40} height={40} style={{ borderRadius: 40 }} />}
                {user.avatar !== "http://127.0.0.1:8000/static/" && <Image src={user.avatar} width={40} height={40} style={{ borderRadius: 40 }} />}
                <Link to='/' className='nav-link text-info' onClick={logout} >Đăng xuất</Link>
            </>

        themBaiViet = <>
            <Link to='/add-post' className='nav-link text-info'>Thêm bài viết</Link>
        </>


        thongBao = <Link to='/notification' className='nav-link text-info'>Thông báo<Badge className="bg-dark"></Badge></Link>
        if(user.is_superuser === true){
            thongKe = <Link to='/stats' className='nav-link text-info' >Thống kê</Link>
        }
    }




    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Charity-SN</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/' className='nav-link'>Trang chủ</Link>

                        {themBaiViet}

                        {path}

                        {thongBao}

                        {thongKe}
                        <Link to='/register' className='nav-link text-info'>Đăng ký</Link>

                    </Nav>
                    <Form className="d-flex" style={{}} onSubmit={search} >
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={kw}
                            onChange={e => setKw(e.target.value)}
                        />
                        <Button variant="outline-success" type='submit'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header