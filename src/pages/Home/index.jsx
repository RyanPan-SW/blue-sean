import React from 'react'
import { connect } from 'react-redux'
import * as UserActionCreator from '@/store/actions/user'
import Top from '@/components/PageContent/Top'
import AboutUs from '@/components/PageContent/AboutUs'
import ModalList from '@/components/PageContent/OurServicer'

import './index.css'

const Home = () => {
  // const { isLogin, login, logout } = props

  // const loginClick = isLogin ? logout : login

  return (
    <div className='box'>
      <Top />

      <AboutUs />

      <ModalList />

      {/* <Layout>
        <Affix>
          <Header />
        </Affix>

        <Content>
          <Switch>
            <Route path='/test' component={Test} />
            <Route path='/test1' component={Test1} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout> */}
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Home)
