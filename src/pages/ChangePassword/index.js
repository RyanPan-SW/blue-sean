import React, { useState, useRef } from 'react'
import { updatePwd } from '@/api/changePassword'
import { Breadcrumb, Form, Input, Button, Modal, /* message */ } from 'antd'
import { Link } from 'react-router-dom'
import FieldDom from '@/components/Field'
import './index.scss'
import { clearAllCookie, /* passwordMsg */ } from '@/helper/env'
import InputPassword from '@/components/InputPassword'

function ChangePassword(props) {
  const formRef = useRef()
  const [hideRemeber, setHideRemeber] = useState(false)

  const [visible, setVisible] = useState(false)

  const onFinish = (values) => {
    updatePwd(values).then((res) => {
      const { code, data, errmsg } = res

      if (code === '200' && data) {
        setVisible(true)
        clearAllCookie()
        localStorage.clear()
        props.history.push('/login')
        return
      }

      if (code === 'LO007' && errmsg) {
        formRef.current.setFields([
          { name: 'password', value: values.password, errors: [errmsg] }
        ])
        return
      }
      if (code === 'LO006' && errmsg) {
        formRef.current.setFields([
          { name: 'newpassword', value: values.password, errors: [errmsg] }
        ])
        return
      }
      // props.history.push('/account')
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

        <Form layout='vertical' className='change-form' onFinish={onFinish} ref={formRef} onFinishFailed={() => {
          setHideRemeber(true)
        }} >
          {/* {errorMsg && <FieldDom border message={errorMsg} />} */}

          <Form.Item label='CURRENT PASSWORD' name='password' rules={[{ required: true, message: <FieldDom message={'This field is required.'} /> }]}>
            <Input.Password placeholder='Current  Password' iconRender={(visible) => (visible ? <span style={{ color: '#b38948' }}>hide</span> : 'show')} />
          </Form.Item>

          <Form.Item label='NEW PASSWORD' name='newpassword' rules={[
            { required: true, message: <FieldDom message={'This field is required.'} /> },
            { min: 6, max: 20, message: <FieldDom message={'This field is required.'} /> }
          ]}>
            <Input.Password placeholder='Password' iconRender={(visible) => (visible ? <span style={{ color: '#b38948' }}>hide</span> : 'show')} />
          </Form.Item>


          {!hideRemeber && (<p className="remember">
            Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.
          </p>)}

          <Form.Item>
            <Button type='primary' htmlType='submit' className='update-password'>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        visible={visible}
        footer={null}
        width={600}
        closable={false}
        centered
      >
        <span className="password-update">Password has been updated.</span>
        <div className="password-bottom">
          <span onClick={() => setVisible(false)}>OK</span>
        </div>
      </Modal>
    </div>
  )
}

export default ChangePassword
