import React from 'react'
import { connect } from 'react-redux'
import * as UserActionCreator from '@/store/actions/user'
import Top from '@/pages/Home/component/Top'
import AboutUs from '@/pages/Home/component/AboutUs'
import ModalList from '@/pages/Home/component/OurServicer'
import JoinUs from '@/pages/Home/component/JoinUs'
import FooterComponent from '@/components/Footer'

import './index.css'

const Home = () => {
  // const { isLogin, login, logout } = props

  // const loginClick = isLogin ? logout : login

  return (
    <div className='box'>
      <Top />

      <AboutUs />

      <ModalList />

      <JoinUs />

      <FooterComponent />
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Home)
