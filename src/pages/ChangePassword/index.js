import React, { useState, useRef } from 'react'
import { updatePwd } from '@/api/changePassword'
import { Breadcrumb, Form, Input, Button, Modal, message, /* message */ } from 'antd'
import { Link } from 'react-router-dom'
import { clearAllCookie, } from '@/helper/env'
// import InputPassword from '@/components/InputPassword'
// import values from 'postcss-modules-values'
import './index.scss'

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

      if (code === 'LO006' && errmsg) {
        formRef.current.setFields([
          { name: 'newpassword', value: values.password, errors: [errmsg] }
        ])
      } else if (code === 'LO007' && errmsg) {
        setHideRemeber(false)
        formRef.current.setFields([
          { name: 'password', value: values.password, errors: [errmsg] }
        ])
      } if (code === 'LO008' && errmsg) {
        setHideRemeber(false)
        message.error(errmsg)
        props.history.push('/login')
      }
    })
  }


  const isRequire = (rule, value, getFieldValue, fn) => {
    if (!value) {
      setHideRemeber(true)
      fn('This field is required.')
    } else if (value.length < 6) {
      setHideRemeber(true)
      fn('Use a password of at least 6 characters. Suggest you include an uppercase letter, a lowercase letter, a number, and a special character')
    } else if (value.length > 20) {
      fn('Passwords can only be entered up to 20 characters.')
    } else if (getFieldValue('password') === value) {
      setHideRemeber(true)
      fn("The new password can't be the same as the current password.")
    } else {
      setHideRemeber(false)
      fn()
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
            rules={[{ required: true, message: 'This field is required.' }]}>
            <Input.Password placeholder='Current Password'
              iconRender={(visible) => (
                visible ? (
                  <span style={{ color: visible && '#b38948' }}>Hide</span>
                ) : (
                  <span style={{ color: !visible && '#333' }}>Show</span>
                ))
              }
            />
          </Form.Item>

          <Form.Item label='NEW PASSWORD' name='newpassword' dependencies={['password']}
            extra={hideRemeber ? null : <p className="remember">Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.</p>}
            getValueFromEvent={(e) => {
              return e.target.value.replace(/\s+/g, '')
            }}
            rules={[
              // { required: true, /* min: 6, max: 20, */ message: <FieldDom message={'This field is required.'} /> },
              // { min: 6, max: 20, message: <FieldDom message={passwordMsg.length} /> },
              ({ getFieldValue }) => ({
                validator: (rule, value, fn) => {
                  isRequire(rule, value, getFieldValue, fn)
                }
              })
            ]}>
            <Input.Password placeholder='Password' iconRender={(visible) => (
              visible ? (
                <span style={{ color: visible && '#b38948' }}>Hide</span>
              ) : (
                <span style={{ color: !visible && '#333' }}>Show</span>
              ))
            } />
          </Form.Item>


          {/* {!hideRemeber && (
            <p className="remember">Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.</p>
          )} */}

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
    </div >
  )
}

export default ChangePassword
