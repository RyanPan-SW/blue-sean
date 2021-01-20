import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
// import Logo from '../../asset/logo_home.png'
import Logo from '../../asset/footer-logo.jpg'
import menu from '../../asset/menu.svg'
import './index.scss'
import { Modal } from 'antd'
import { Nav, Navbar } from 'react-bootstrap'

const PageHeader = () => {
  const { pathname } = useLocation()
  // const [key, setKey] = useState('/home')
  const [show, setShow] = useState(false)

  useEffect(() => {
    // setKey(pathname)

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

  // return (
  //   <div className='headerContent'>
  //     <div className='container'>
  //       <div className='content'>
  //         <div className='navLogo'>
  //           <Link to='/home'>
  //             <img src={Logo} alt='logo' />
  //           </Link>
  //         </div>

  //         <ul className='navLink'>
  //           <li className='active'>
  //             <Link to='/home'>Home</Link>
  //           </li>
  //           <li>
  //             {/* <Link to='/services?type=1'>Services</Link> */}
  //             Services
  //           </li>
  //           <li>
  //             {/* <Link to='/home'>Cooperation</Link> */}
  //             Cooperation
  //           </li>
  //           <li>
  //             {/* <Link to='/home'>Contact</Link> */}
  //             Contact
  //           </li>
  //           <li>
  //             {/* <Link to='/home'>Q&A</Link> */}
  //             Q&A
  //           </li>
  //           <li>
  //             <div className='become' onClick={handleShowModal}>
  //               Become A Runner
  //             </div>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>

  //     {/* <Modal show={show} onHide={handleClose} centered>
  //       <Modal.Header closeButton></Modal.Header>

  //       <Modal.Body>
  //         <div className='clickModal'>
  //           Courier & Delivery Driver Jobs in Brisbane & Gold Coast. Work when you want. Drive
  //           around town and deliver documents to happy & excited customers. If you are interested,
  //           please email your resume to hr@dcglobalsolutions.com.au <br />
  //           We can't wait to meet you!
  //         </div>
  //       </Modal.Body>
  //     </Modal> */}

  //     <Modal
  //       title='Become A Runner'
  //       visible={show}
  //       width={660}
  //       centered
  //       onOk={handleClose}
  //       onCancel={handleClose}
  //       footer={null}
  //     >
  //       <div className='clickModal'>
  //         Courier & Delivery Driver Jobs in Brisbane & Gold Coast. Work when you want. Drive around
  //         town and deliver documents to happy & excited customers. If you are interested, please
  //         email your resume to hr@dcglobalsolutions.com.au <br />
  //         We can't wait to meet you!
  //       </div>
  //     </Modal>
  //   </div>
  // )

  return (
    <header>
      <div className='container'>
        <Navbar sticky='top' fixed='top' expand='xl' className='header-nav'>
          <Navbar.Brand className='navbtn navlogo header-logo'>
            <Link to='/home' className='logo'>
              <div className="logo-img">
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
            <Nav.Link className='navbtn active'>Home</Nav.Link>
            <Nav.Link className='navbtn'>Services</Nav.Link>
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
    </header>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(PageHeader)
