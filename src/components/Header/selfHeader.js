import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import * as UserActionCreator from '@/store/actions/user'
import Logo from '../../asset/footer-logo.jpg'
import LogoDark from '../../asset/logo-dark.png'
import login from '../../asset/login.svg'
import signup from '../../asset/signup.svg'
import down from '../../asset/down.svg'

import './selfHeader.scss'

const Header = (props) => {
  const { pathname } = useLocation()

  const [showSubtitle, setShowSubtitle] = useState(false)

  // const ExpandSubtitle = (e) => {
  //   e.stopPropagation()
  //   setShowSubtitle(true)
  // }

  // const HidenSubtitle = (e) => {
  //   e.stopPropagation()
  //   setShowSubtitle(false)
  // }

  const Subtitle = (
    <ul
      className='header-menu-sub-list'
      // onMouseOver={(e) => {
      //   ExpandSubtitle(e)
      // }}
      // onMouseOut={(e) => {
      //   HidenSubtitle(e)
      // }}
    >
      <li>Property Settlement & Lodgment Services</li>
      <li>Property & Body Corporate Searches & Report</li>
      <li>Legal Documents Deliveries & Service of Court Documents</li>
      <li>Schedule a New Pickup</li>
    </ul>
  )

  return (
    <>
      {pathname === '/home' ? (
        <div className='header'>
          <div className='container'>
            <div className='header-navbar'>
              <div className='header-navBrand'>
                <Link to='/home'>
                  <div className='logo-img'>
                    <img src={Logo} alt='logo' />
                    <img className='alt-logo' src={Logo} alt='logo' />
                  </div>
                  <div className='title-font'>DC Global Solutions</div>
                </Link>
              </div>

              <ul className='header-nav-menu'>
                <li className='active'>
                  <Link to='/home'>Home</Link>
                </li>
                <li
                  className='header-menu-down'
                  onClick={() => setShowSubtitle(!showSubtitle)}
                  // onMouseOver={(e) => {
                  //   ExpandSubtitle(e)
                  // }}
                  // onMouseOut={(e) => {
                  //   HidenSubtitle(e)
                  // }}
                >
                  <span>Services</span>
                  <img src={down} alt='' />
                  {showSubtitle && Subtitle}
                </li>
                <li>Cooperation</li>
                <li>Contact</li>
                <li>Q&A</li>
                <li>
                  <Link to='/become' className='become'>
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
      ) : (
        <div className='otherHeader'>
          <div className='container'>
            <div className='header-navbar'>
              <div className='header-navBrand'>
                <Link to='/home'>
                  <div className='logo-img'>
                    <img src={LogoDark} alt='logo' />
                    <img className='alt-logo' src={LogoDark} alt='logo' />
                  </div>
                  <div className='title-font'>DC Global Solutions</div>
                </Link>
              </div>

              <ul className='header-nav-menu'>
                <li className='active'>
                  <Link to='/home'>Home</Link>
                </li>
                <li
                  className='header-menu-down'
                  onClick={() => setShowSubtitle(!showSubtitle)}
                  // onMouseOver={(e) => {
                  //   ExpandSubtitle(e)
                  // }}
                  // onMouseOut={(e) => {
                  //   HidenSubtitle(e)
                  // }}
                >
                  <span>Services</span>
                  <img src={down} alt='' />
                  {showSubtitle && Subtitle}
                </li>
                <li>Cooperation</li>
                <li>Contact</li>
                <li>Q&A</li>
                <li>
                  <Link to='/become' className='become'>
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
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Header)
