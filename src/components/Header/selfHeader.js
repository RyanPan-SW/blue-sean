import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
import classnames from 'classnames'
import Logo from '../../asset/footer-logo.jpg'
import LogoDark from '../../asset/logo-dark.png'
import login from '../../asset/right.svg'
import signup from '../../asset/add.svg'
import down from '../../asset/down.svg'
import home from '../../asset/home.svg'
import logout from '../../asset/x.svg'
import { getCookie } from '@/helper/env'
import './selfHeader.scss'

const servicesMenus = [
  {
    name: 'housingProperty',
    to: '/services?type=housingProperty',
    title: 'Property Settlement & Lodgment Services',
  },
  {
    name: 'legalInvestigation',
    to: '/services?type=legalInvestigation',
    title: 'Property & Body Corporate Searches & Report',
  },
  {
    name: 'documentBusiness',
    to: '/services?type=documentBusiness',
    title: 'Legal Documents Deliveries & Service of Court Documents',
  },
  { name: 'filestep', to: '/filestep', title: 'Schedule a New Pickup' },
]

const Header = (props) => {
  const { pathname, search } = useLocation()
  const [pathnameStatus, setPathnameStatus] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  // const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    pathname.search('/home') > -1 ? setPathnameStatus(false) : setPathnameStatus(true)
    // const token = getCookie('token')
    // if (!token) {
    //   message.error('Need log in.')
    //   props.history.push('/home')
    //   return
    // }
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

  const welcomeUser = () => {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    if (user /* && user.loginType === '01' */) {
      return `Welcome  ${user.loginEmail}`
    } else {
      return `Welcome`
    }
  }

  return (
    <>
      <div className={pathnameStatus ? 'home-header' : 'header'}>
        <div className='header-loginbox '>
          <div className='container'>
            {!getCookie('token') ? (
              <>
                <Link
                  to='/login'
                  className='header-login'
                  style={{ color: pathnameStatus ? '' : '#fff' }}
                >
                  <img src={login} alt='' />
                  <span>Log in</span>
                </Link>

                <Link
                  to='/signup'
                  className='header-signup'
                  style={{ color: pathnameStatus ? '' : '#fff' }}
                >
                  <img src={signup} alt='' />
                  <span>Sign up</span>
                </Link>
              </>
            ) : (
              <>
                <div className={pathnameStatus ? 'login-user' : 'login-home-user'}>
                  {/* Welcome&nbsp;&nbsp; */}
                  {welcomeUser()}
                </div>
                <Link to='/account' className={pathnameStatus ? 'login-user' : 'login-home-user'}>
                  <img src={home} alt='' />
                  <span>Account info</span>
                </Link>
                <Link to='/logOut' className={pathnameStatus ? 'login-user' : 'login-home-user'}>
                  <img src={logout} alt='' />
                  <span>Log out</span>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className='header-content container'>
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
                    {servicesMenus.map(({ name, to, title }, index) => {
                      return (
                        <Link
                          key={index}
                          // className={search === `?type=${url}` ? 'currentPage' : ''}
                          to={to}
                        >
                          <div
                            style={{ color: search === `?type=${name}` ? '$themeColor' : '' }}
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
              <li className={isActive('cooperate')}>
                <Link to='/cooperate' target='_blank'>
                  Cooperation
                </Link>
              </li>
              <li className={isActive('contact')}>
                <Link to='/contactus' target='_blank'>
                  Contact
                </Link>
              </li>
              <li className={isActive('help')}>
                <Link to='/help' target='_blank'>
                  Q&A
                </Link>
              </li>
              <li>
                <Link to='/become' target='_blank' className='become'>
                  Become A Runner
                </Link>
              </li>
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
