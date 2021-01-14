import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
import Logo from '../../asset/logo_home.png'
import './index.scss'
import { Modal } from 'antd'

const PageHeader = () => {
  const { pathname } = useLocation()
  const [key, setKey] = useState('/base/home')
  const [show, setShow] = useState(false)

  useEffect(() => {
    setKey(pathname)

    document.documentElement.scrollTop = 0
    if (pathname === '/base/home') {
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
    <div className='headerContent'>
      <div className='container'>
        <div className='content'>
          <div className='navLogo'>
            <img src={Logo} alt='logo' />
          </div>

          <ul className='navLink'>
            <li className='active'>
              <Link to='/base/home'>Home</Link>
            </li>
            <li>
              {/* <Link to='/base/services?type=1'>Services</Link> */}
              Services
            </li>
            <li>
              {/* <Link to='/base/home'>Cooperation</Link> */}
              Cooperation
            </li>
            <li>
              {/* <Link to='/base/home'>Contact</Link> */}
              Contact
            </li>
            <li>
              {/* <Link to='/base/home'>Q&A</Link> */}
              Q&A
            </li>
            <li>
              <div className='become' onClick={handleShowModal}>
                Become A Runner
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body>
          <div className='clickModal'>
            Courier & Delivery Driver Jobs in Brisbane & Gold Coast. Work when you want. Drive
            around town and deliver documents to happy & excited customers. If you are interested,
            please email your resume to hr@dcglobalsolutions.com.au <br />
            We can't wait to meet you!
          </div>
        </Modal.Body>
      </Modal> */}

      <Modal title='Basic Modal' visible={show} width={660} centered onOk={handleClose} onCancel={handleClose} footer={null}>
        <div className='clickModal'>
          Courier & Delivery Driver Jobs in Brisbane & Gold Coast. Work when you want. Drive around
          town and deliver documents to happy & excited customers. If you are interested, please
          email your resume to hr@dcglobalsolutions.com.au <br />
          We can't wait to meet you!
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(PageHeader)
