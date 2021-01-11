import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
import { Navbar, Nav, Modal } from 'react-bootstrap'
import Logo from '../../asset/dc_pic.jpg'
import Global from '../../asset/DC-Global-Solutions.png'

import './index.css'

const OtherPageHeader = () => {
  const { pathname } = useLocation()
  const [key, setKey] = useState('/base/home')
  const [show, setShow] = useState(false)

  useEffect(() => {
    setKey(pathname)
    // if (pathname === '/base/home') {
    //   window.addEventListener(
    //     'scroll',
    //     () => {
    //       const top = document.documentElement.scrollTop
    //       const header = document.getElementsByClassName('headerContent')[0]
    //       if (top >= 1200) {
    //         header.style.background = '#00000080'
    //       } else {
    //         header.style.background = 'none'
    //       }
    //     },
    //     false,
    //   )
    // }
  }, [pathname])

  const handleShowModal = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <div className='otherHeaderContent'>
      <Navbar expand='lg' sticky='top' className='header'>
        <Navbar.Brand className='navbtn navlogo'>
            <img alt='' src={Logo} width='80%' height='2%' className='d-inline-block align-top' />
          {/* <div className='header-logo-mack'>
            <img alt='' src={Global} width='85%' height='2%' className='d-inline-block align-top' />
          </div> */}
        </Navbar.Brand>

        {/* <Navbar.Brand className='navbtn navlogo'>
        </Navbar.Brand> */}

        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end menus'>
          <Nav.Link className={key === '/base/home' ? 'navbtn active' : 'navbtn'}>
            <Link to='/base/home'>Home</Link>
          </Nav.Link>
          <Nav.Link className={key === '/base/services' ? 'navbtn active' : 'navbtn'}>
            <Link to='/base/services'>Services</Link>
          </Nav.Link>
          <Nav.Link className={key === '/base/cooperation' ? 'navbtn active' : 'navbtn'}>
            {/* <Link to='/base/cooperation'>Cooperation</Link> */}
            Cooperation
          </Nav.Link>
          <Nav.Link className={key === '/base/contact' ? 'navbtn active' : 'navbtn'}>
            {/* <Link to='/base/contact'>Contact</Link> */}
            Contact
          </Nav.Link>
          <Nav.Link className={key === '/base/question' ? 'navbtn active' : 'navbtn'}>
            {/* <Link to='/base/question'>Q&A</Link> */}
            Q&A
          </Nav.Link>
          <Nav className='navbtn' onClick={handleShowModal}>
            <div className='become'>Become A Runner</div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          Courier & Delivery Driver Jobs in Brisbane & Gold Coast. Work when you want. Drive around
          town and deliver documents to happy & excited customers. If you are interested, please
          email your resume to hr@dcglobalsolutions.com.au <br />
          We can't wait to meet you!
        </Modal.Body>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(OtherPageHeader)
