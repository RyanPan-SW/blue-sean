import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
import { Modal } from 'antd'
import Logo from '../../asset/header-logo.png'

import './index.scss'

const OtherPageHeader = () => {
  const { pathname } = useLocation()
  // const [key, setKey] = useState('/home')
  const [show, setShow] = useState(false)

  useEffect(() => {
    // setKey(pathname)
    // if (pathname === '/home') {
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
    <div className='otherHeader'>
      <div className='container'>
        <div className='content'>
          <div className='navLogo'>
            <img src={Logo} alt='logo' />
          </div>

          <ul className='navLink'>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li className='active'>
              {/* <Link to='/services?type=1'>Services</Link> */}
              Services
            </li>
            <li>
              {/* <Link to='/home'>Cooperation</Link> */}
              Cooperation
            </li>
            <li>
              {/* <Link to='/home'>Contact</Link> */}
              Contact
            </li>
            <li>{/* <Link to='/home'>Q&A</Link> */}Q&A</li>
            <li>
              <div className='become' onClick={handleShowModal}>Become A Runner</div>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        title='Become A Runner'
        visible={show}
        width={660}
        centered
        onOk={handleClose}
        onCancel={handleClose}
        footer={null}
      >
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

export default connect(mapStateToProps, UserActionCreator)(OtherPageHeader)
