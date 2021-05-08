import React, { useState } from 'react'
import { updatePwd } from '@/api/changePassword'
import { Breadcrumb, Form, Input, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import FieldDom from '@/components/Field'
import './index.scss'

function ChangePassword(props) {
  const [errorMsg, setErrorMsg] = useState(null)

  const updatePassword = (values) => {
    updatePwd(values).then((res) => {
      const { code, data, errmsg } = res
      if (code !== '200') {
        setErrorMsg(errmsg)
        return
      }
      message.success(data.msg)
      props.history.push('/account')
    })
  }

  return (
    <div className='container'>
      <div className='change-content'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item>
            <Link to='/account'>My Account</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Password</Breadcrumb.Item>
        </Breadcrumb>

        <p className='change-title'>Update Your Password</p>

        <Form layout='vertical' className='change-form' onFinish={updatePassword}>
          {errorMsg && <FieldDom border message={errorMsg} />}

          <Form.Item label='CURRENT PASSWORD' name='password'>
            <Input.Password placeholder='Current  Password' />
          </Form.Item>

          <Form.Item label='NEW PASSWORD' name='newpassword'>
            <Input.Password placeholder='Password' />
          </Form.Item>

          <p>
            Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.
          </p>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='update-password'>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword
