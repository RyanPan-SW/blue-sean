import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
import Logo from '../../asset/logo-dark.png'
import menu from '../../asset/menu.svg'
import './index.scss'
// import { Modal } from 'antd'
import { Modal, Nav, Navbar } from 'react-bootstrap'

const PageHeader = () => {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    document.documentElement.scrollTop = 0
    if (pathname === '/home') {
      //   window.addEventListener(
      //     'scroll',
      //     () => {
      //       const top = document.documentElement.scrollTop
      //       const header = document.getElementsByClassName('header')[0]
      //       if (top >= 1200) {
      //         header.style.background = '#00000080'
      //       } else {
      //         header.style.background = 'none'
      //       }
      //     },
      //     false,
      //   )
    }
  }, [pathname])

  const handleShowModal = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <header className="otherHeader">
      <div className='container'>
        <Navbar sticky='top' fixed='top' expand='xl' className='header-nav'>
          <Navbar.Brand className='navbtn navlogo header-logo'>
            <Link to='/home' className='logo'>
              <div className='logo-img'>
                <img src={Logo} alt='logo' />
                <img class='alt-logo' src={Logo} alt='logo' />
              </div>
              <div className='title-font'>DC Global Solutions</div>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle className='menus-icon'>
            <img src={menu} alt='' />
          </Navbar.Toggle>

          <Navbar.Collapse className='justify-content-end header-ul'>
            <Nav.Link className='navbtn'><Link to="/home">Home</Link></Nav.Link>
            <Nav.Link className='navbtn active'>Services</Nav.Link>
            <Nav.Link className='navbtn'>Cooperation</Nav.Link>
            <Nav.Link className='navbtn'>Contact</Nav.Link>
            <Nav.Link className='navbtn'>Q&A</Nav.Link>
            <Nav.Link className='navbtn'>
              <div className='become' onClick={handleShowModal}>
                Become A Runner
              </div>
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className='modal-header'>
          Become A Runner
        </Modal.Header>

        <Modal.Body>
          <div className='clickModal'>
            Courier & Delivery Driver Jobs in Brisbane & Gold Coast. Work when you want. Drive
            around town and deliver documents to happy & excited customers. If you are interested,
            please email your resume to hr@dcglobalsolutions.com.au <br />
            We can't wait to meet you!
          </div>
        </Modal.Body>
      </Modal>
    </header>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(PageHeader)
