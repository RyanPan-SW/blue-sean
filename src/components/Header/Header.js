/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
import Cookies from 'js-cookie'
import './Header.scss'

const servicesMenus = [
  {
    name: 'housingProperty',
    to: '/services',
    id: 'housingProperty',
    title: 'Property Settlement & Lodgment Services',
  },
  {
    name: 'legalInvestigation',
    to: '/services',
    id: 'legalInvestigation',
    title: 'Property & Body Corporate Searches & Report',
  },
  {
    name: 'documentBusiness',
    to: '/services',
    id: 'documentBusiness',
    title: 'Legal Documents Deliveries & Service of Court Documents',
  },
  // { name: 'filestep', id: 'add', to: '/filestep', title: 'Schedule a New Pickup' },
]

const Header = (props) => {
  const { history } = props
  const { location } = history
  const [pathnameStatus, setPathnameStatus] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  // const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    location.pathname.search('/home') > -1 ? setPathnameStatus(false) : setPathnameStatus(true)
    // const token = getCookie('token')
    // if (!token) {
    //   message.error('Need log in.')
    //   props.history.push('/home')
    //   return
    // }
  }, [location.pathname])

  const ExpandSubtitle = (e) => {
    e.stopPropagation()
    setShowSubtitle(true)
  }

  const HidenSubtitle = (e) => {
    e.stopPropagation()
    setShowSubtitle(false)
  }

  const isActive = (str) => {
    return location.pathname.search(str) > -1 ? 'active' : ''
  }

  const welcomeUser = () => {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    if (user /* && user.loginType === '01' */) {
      return `Welcome  ${user.loginEmail}`
    } else {
      return `Welcome`
    }
  }

  const clickLogo = () => {
    window.location.pathname = '/home'
  }

  const clickLogOut = () => {
    Cookies.remove('token')
    history.push('/logOut')
  }

  const goToNewPickup = () => {
    if (location.pathname !== '/filestep/add') {
      history.push('/filestep/add')
    } else {
      window.location.reload()
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
                  {welcomeUser()}
                </div>
                <Link to='/account' className={pathnameStatus ? 'login-user' : 'login-home-user'}>
                  <img src={home} alt='' />
                  <span>Account info</span>
                </Link>
                <a className={pathnameStatus ? 'login-user' : 'login-home-user'} onClick={clickLogOut}>
                  <img src={logout} alt='' />
                  <span>Log out</span>
                </a>
              </>
            )}
          </div>
        </div>

        <div className='header-content container'>
          <div className={pathnameStatus ? 'other-navbar' : 'header-navbar'}>
            <div className='header-navBrand'>
              <div onClick={clickLogo} className="Logo-a" to='/home'>
                {pathnameStatus ? (
                  <div className='logo-img'>
                    <img className='alt-logo' src={LogoDark} alt='logo' />
                  </div>
                ) : (
                  <div className='logo-img'>
                    <img className='alt-logo' src={Logo} alt='logo' />
                  </div>
                )}
                <div className='title-font'>DC Global Solutions</div>
              </div>
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
                    {servicesMenus.map(({ name, to, id, title }, index) => {
                      return (
                        <Link
                          key={index}
                          to={`${to}/${id}`}
                        >
                          <div
                            className='menu-item'
                          >
                            {title}
                          </div>
                        </Link>
                      )
                    })}
                    <a onClick={goToNewPickup}>
                      <div className='menu-item'>
                        Schedule a New Pickup
                      </div>
                    </a>
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
        </div>
      </div>
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Header)
