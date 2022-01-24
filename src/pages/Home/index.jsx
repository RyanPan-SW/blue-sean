import React from 'react'
import { connect } from 'react-redux'
import * as UserActionCreator from '@/store/actions/user'
import Top from '@/pages/Home/component/Top'
import AboutUs from '@/pages/Home/component/AboutUs'
import ModalList from '@/pages/Home/component/OurServicer'
import JoinUs from '@/pages/Home/component/JoinUs'

import './index.css'

const Home = () => {
  return (
    <div className='box'>
      <Top />
      <AboutUs />
      <ModalList />
      <JoinUs />
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Home)
