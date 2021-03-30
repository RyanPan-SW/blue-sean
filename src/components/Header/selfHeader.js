import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
import classnames from 'classnames'
import Logo from '../../asset/footer-logo.jpg'
import LogoDark from '../../asset/logo-dark.png'
import login from '../../asset/login.svg'
import signup from '../../asset/signup.svg'
import down from '../../asset/down.svg'

import './selfHeader.scss'

const servicesMenus = [
  { url: 'housingProperty', title: 'Property Settlement & Lodgment Services' },
  { url: 'legalInvestigation', title: 'Property & Body Corporate Searches & Report' },
  { url: 'documentBusiness', title: 'Legal Documents Deliveries & Service of Court Documents' },
  { url: 'documentOrder', title: 'Schedule a New Pickup' },
]

const Header = (props) => {
  const { pathname, search } = useLocation()

  const [pathnameStatus, setPathnameStatus] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    pathname.search('/home') > -1 ? setPathnameStatus(false) : setPathnameStatus(true)
  }, [pathname])

  const ExpandSubtitle = (e) => {
    e.stopPropagation()
    setShowSubtitle(true)
  }

  const HidenSubtitle = (e) => {
    e.stopPropagation()
    setShowSubtitle(false)
  }

  const isActive = (str) => {
    return pathname.search(str) > -1 ? 'active' : ''
  }

  return (
    <>
      <div
        className='header'
        style={{
          backgroundColor: pathnameStatus ? '#fff' : '#000000a8',
          borderBottom: pathnameStatus ? '1px solid #BCBCBC' : '1px solid #B1ABA8',
        }}
      >
        <div className='container'>
          <div className={pathnameStatus ? 'other-navbar' : 'header-navbar'}>
            <div className='header-navBrand'>
              <Link to='/home'>
                {pathnameStatus ? (
                  <div className='logo-img'>
                    <img src={LogoDark} alt='logo' />
                    <img className='alt-logo' src={LogoDark} alt='logo' />
                  </div>
                ) : (
                  <div className='logo-img'>
                    <img src={Logo} alt='logo' />
                    <img className='alt-logo' src={Logo} alt='logo' />
                  </div>
                )}
                <div className='title-font'>DC Global Solutions</div>
              </Link>
            </div>

            <ul className='header-nav-menu'>
              <li className={isActive('home')}>
                <Link to='/home'>Home</Link>
              </li>
              <li
                className={classnames('header-menu-down', isActive('services'))}
                onMouseOver={(e) => {
                  ExpandSubtitle(e)
                }}
                onMouseLeave={(e) => {
                  HidenSubtitle(e)
                }}
              >
                <span>Services</span>
                <img src={down} alt='' />
                {showSubtitle && (
                  <div className='header-menu-sub-list'>
                    {servicesMenus.map(({ url, title }, index) => {
                      return (
                        <Link
                          key={index}
                          // className={search === `?type=${url}` ? 'currentPage' : ''}
                          to={`/services?type=${url}`}
                        >
                          <div
                            style={{ color: search === `?type=${url}` ? '$themeColor' : '' }}
                            className='menu-item'
                          >
                            {title}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </li>
              <li className={isActive('cooperation')}>
                <Link to='/cooperate' target='_blank'>
                  Cooperation
                </Link>
              </li>
              <li className={isActive('contact')}>
                <Link to='/contactus' target='_blank'>
                  Contact
                </Link>
              </li>
              <li className={isActive('question')}>
                <Link to='/help' target='_blank'>
                  Q&A
                </Link>
              </li>
              <li>
                <Link to='/become' target='_blank' className='become'>
                  Become A Runner
                </Link>
              </li>

              <div className='header-loginbox'>
                <Link to='/login' className='header-login'>
                  <img src={login} alt='login' />
                  <span>Log in</span>
                </Link>

                <Link to='/signup' className='header-signup'>
                  <img src={signup} alt='signup' />
                  <span>Sign up</span>
                </Link>
              </div>
            </ul>
          </div>

          {/* 
            <NavDropdown title='Services' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/services?type=1'>
                Property Settlement & Lodgment Services
              </NavDropdown.Item>
              <NavDropdown.Item href='/services?type=2'>
                Property & Body Corporate Searches & Report
              </NavDropdown.Item>
              <NavDropdown.Item href='/services?type=3'>
                Legal Documents Deliveries & Service of Court Documents
              </NavDropdown.Item>
              <NavDropdown.Item href='/services?type=3'>Schedule a New Pickup</NavDropdown.Item>
            </NavDropdown>
            */}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Header)
