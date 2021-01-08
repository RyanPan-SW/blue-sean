import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Row, Col /* , Button */ } from 'antd'
import * as UserActionCreator from '@/store/actions/user'
import Logo from '../../asset/logo_home.png'
import become from '../../asset/become.png'
import './index.css'

const { Header } = Layout

const HeaderComponent = (/* props */) => {
  // const { isLogin, logout } = props
  const location = useLocation()
  return (
    <Header className='header'>
      <Row justify='space-between'>
        <Link to='/base/home'>
          <img className='homeLogo' src={Logo} alt='' />
        </Link>
        <Col>
          <Menu
            theme='light'
            mode='horizontal'
            defaultSelectedKeys={[location.pathname]}
            selectedKeys={[location.pathname]}
            style={{ background: '#00000000' }}
          >
            <Menu.Item key='/base/home'>
              <Link to='/base/home'>home</Link>
            </Menu.Item>
            <Menu.Item key='/base/services'>
              <Link to='/base/test'>Services</Link>
            </Menu.Item>
            <Menu.Item key='/base/cooperation'>
              <Link to='/base/test1'>Cooperation</Link>
            </Menu.Item>
            <Menu.Item key='/base/contact'>
              <Link to='/base/test1'>Contact</Link>
            </Menu.Item>
            <Menu.Item key='/base/question'>
              <Link to='/base/test1'>Q&A</Link>
            </Menu.Item>
            <Menu.Item key='/base/become'>
              <Link to='/base/test1'>
                <img className='become' src={become} alt='become' />
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        {/* <Col>
          {isLogin ? <span className='login-status'>登录才会显示</span> : ''}
          {isLogin ? <Button onClick={logout}>退出</Button> : <Link to='/login'>请登录</Link>}
        </Col> */}
      </Row>
    </Header>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(HeaderComponent)
