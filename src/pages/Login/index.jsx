import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { test } from '@/api/user'
import * as UserActionCreator from '@/store/actions/user'

const Login = ({ login, history }) => {
  useEffect(() => {
    test()
  })

  const loginClick = () => {
    login()
    history.push('/')
  }
  debugger
  
  return (
    <div className='login'>
      <Button onClick={loginClick}>登录</Button>
    </div>
  )
}
const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})
export default connect(mapStateToProps, UserActionCreator)(Login)
