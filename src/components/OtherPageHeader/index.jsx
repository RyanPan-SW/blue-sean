import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
import { Modal } from 'react-bootstrap'
import Logo from '../../asset/dc_pic.jpg'

import './index.scss'

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
    <div className='otherHeader'>
      <div className='container'>
        <div className='content'>
          <div className='navLogo'>
            <img src={Logo} alt='logo' />
          </div>

          <ul className='navLink'>
            <li>
              <Link to='/base/home'>Home</Link>
            </li>
            <li className='active'>
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
            <li>{/* <Link to='/base/home'>Q&A</Link> */}Q&A</li>
            <li>
              <div className='become'>Become A Runner</div>
            </li>
          </ul>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className='clickModal'>
            Courier & Delivery Driver Jobs in Brisbane & Gold Coast. Work when you want. Drive
            around town and deliver documents to happy & excited customers. If you are interested,
            please email your resume to hr@dcglobalsolutions.com.au <br />
            We can't wait to meet you!
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(OtherPageHeader)
