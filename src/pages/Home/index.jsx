import React from 'react'
import { connect } from 'react-redux'
import * as UserActionCreator from '@/store/actions/user'
import Top from '@/pages/Home/component/Top'
import AboutUs from '@/pages/Home/component/AboutUs'
import ModalList from '@/pages/Home/component/OurServicer'

import './index.css'
import FooterComponent from '@/components/Footer'

const Home = () => {
  // const { isLogin, login, logout } = props

  // const loginClick = isLogin ? logout : login

  return (
    <div className='box'>
      <Top />

      <AboutUs />

      <ModalList />

      <FooterComponent />
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Home)
