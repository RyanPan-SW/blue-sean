import React from 'react'
import { connect } from 'react-redux'
// import { Link, useLocation } from 'react-router-dom'
// import { Layout, Menu, Row, Col /* , Button */ } from 'antd'
import * as UserActionCreator from '@/store/actions/user'
import { Navbar, Nav } from 'react-bootstrap'
import Logo from '../../asset/logo_home.png'
// import become from '../../asset/become.png'
import './index.css'

const PageHeader = (props) => {
  const { scrollToAnchor } = props
  // const location = useLocation()
  return (
    <div className='headerContent'>
      <Navbar expand='lg' sticky='top' className='header'>
        <Navbar.Brand className='navbtn navlogo' onClick={() => scrollToAnchor('home')}>
          <img alt='' src={Logo} width='525' height='90' className='d-inline-block align-top' />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end menus'>
          <Nav.Link className='navbtn' onClick={() => scrollToAnchor('home')}>
            Home
          </Nav.Link>
          <Nav.Link className='navbtn' onClick={() => scrollToAnchor('prdcenter')}>
            Services
          </Nav.Link>
          <Nav.Link className='navbtn' onClick={() => scrollToAnchor('prdintro')}>
            Cooperation
          </Nav.Link>
          <Nav.Link className='navbtn' onClick={() => scrollToAnchor('aboutus')}>
            Contact
          </Nav.Link>
          <Nav.Link className='navbtn' onClick={() => scrollToAnchor('culture')}>
            Q&A
          </Nav.Link>
          <Nav.Link className='navbtn' onClick={() => scrollToAnchor('contactus')}>
            <div className='become'>Become A Runner</div>
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(PageHeader)
