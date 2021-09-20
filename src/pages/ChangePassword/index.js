import React, { useState, useRef } from 'react'
import { updatePwd } from '@/api/changePassword'
import { Breadcrumb, Form, Input, Button, Modal, /* message */ } from 'antd'
import { Link } from 'react-router-dom'
import FieldDom from '@/components/Field'
import './index.scss'
import { clearAllCookie, /* passwordMsg */ } from '@/helper/env'
// import InputPassword from '@/components/InputPassword'
// import values from 'postcss-modules-values'

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
        return
      }

      if (code === 'LO007' && errmsg) {
        setHideRemeber(false)
        formRef.current.setFields([
          { name: 'password', value: values.password, errors: [errmsg] }
        ])
      } else if (code === 'LO006' && errmsg) {
        formRef.current.setFields([
          { name: 'newpassword', value: values.password, errors: [errmsg] }
        ])
      }
      // props.history.push('/account')
    })
  }

  // const onFinishFailed = () => {
  //   debugger
  // }

  const isRequire = (rule, value, fn) => {
    if (value.length < 6 || value.length > 20) {
      setHideRemeber(true)
      fn(<FieldDom message={'This field is required.'} />)
    } else {
      setHideRemeber(false)
      fn()
      // fn('Use a password of at least 6 characters. Suggest you include an uppercase letter, a lowercase letter, a number, and a special character')
    }
  }

  const onOk = () => {
    setVisible(false)
    props.history.push('/login')
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

        <Form layout='vertical' className='change-form' onFinish={onFinish} ref={formRef} >
          {/* {errorMsg && <FieldDom border message={errorMsg} />} */}

          <Form.Item label='CURRENT PASSWORD' name='password'
            getValueFromEvent={(e) => {
              return e.target.value.replace(/\s+/g, '')
            }}
            rules={[{ required: true, message: <FieldDom message={'This field is required.'} /> }]}>
            <Input.Password placeholder='Current Password'
              iconRender={(visible) => (visible ? <span style={{ color: '#b38948' }}>Hide</span> : 'Show')} />
          </Form.Item>

          <Form.Item label='NEW PASSWORD' name='newpassword'
            getValueFromEvent={(e) => {
              return e.target.value.replace(/\s+/g, '')
            }}
            rules={[
              { required: true, message: <FieldDom message={'This field is required.'} /> },
              // { min: 6, max: 20, message: <FieldDom message={'This field is required.'} /> },
              {
                validator: (rule, value, fn) => {
                  isRequire(rule, value, fn)
                }
              },
            ]}>
            <Input.Password placeholder='Password'
              iconRender={(visible) =>
                (visible ? <span style={{ color: '#b38948' }}>Hide</span> : 'Show')} />
          </Form.Item>


          {!hideRemeber && (
            <p className="remember">
              Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.
            </p>
          )}

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
          <span onClick={onOk}>OK</span>
        </div>
      </Modal>
    </div>
  )
}

export default ChangePassword
