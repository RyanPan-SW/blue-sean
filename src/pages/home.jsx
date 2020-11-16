import React from 'react'
import { connect } from 'react-redux'
// import { Switch, Route } from 'react-router-dom'
// import Header from '@/components/Header'
import * as UserActionCreator from '@/store/actions/user'
// import Test from '@/pages/test'
// import Test1 from '@/pages/test1'

import '@/style/home/home.scss'

const Home = () => {
  // const { isLogin, login, logout } = props

  // const loginClick = isLogin ? logout : login

  return (
    <>
      home
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
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Home)
