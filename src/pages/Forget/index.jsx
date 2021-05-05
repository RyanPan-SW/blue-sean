import React, { useState } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import FieldDom from '@/components/Field'
import { passwordMsg, patterns } from '@/helper/env'
import { sendEmail as sendEmailAPI, verificationCode } from '@/api/forget'
import './index.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { errorCode } from '@/helper/error'

function Forget(props) {
  const [form] = Form.useForm()

  const [type, setType] = useState('email')
  const [visibleCode, setVisibleCode] = useState(false)
  const [visibleSendCode, setVisibleSendCode] = useState(false)
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const sendEmail = (values) => {
    verificationCode(values).then((res) => {
      const { code, errmsg } = res
      if (code !== 200) {
        console.log(errorCode[code])
        setMsg(errmsg)
        return
      }
      setEmail(values.email)
      setType('code')
    })
  }

  const sendCode = (values) => {
    verificationCode(values).then((res) => {
      if (res.code === '200') {
        setType('password')
        setVisibleCode(false)
      } else {
        setVisibleCode(true)
      }
    })
  }

  const setNewPassword = (values) => {
    console.log('setNewPassword')
    setType('success')
  }

  const sendEmailAgain = () => {
    sendEmailAPI().then((res) => {
      if (res.code === '200') {
        setVisibleSendCode(true)
      }
    })
  }

  const formFish = {
    email: sendEmail,
    code: sendCode,
    password: setNewPassword,
  }

  return (
    <div className='forgrt'>
      <div className='forget-content'>
        <div className='error'>
          <FieldDom message={msg} />
        </div>

        {/* step-01, email gain code*/}
        {type === 'email' && (
          <Form layout='vertical' onFinish={formFish['email']}>
            <h4>FORGOT YOUR PASSWORD?</h4>

            <p>
              Enter your email address and we'll send you a code you can use to reset your password.
            </p>

            <Form.Item
              label='YOU EMAIL'
              name='userName'
              rules={[
                {
                  required: true,
                  message: <FieldDom />,
                },
                { type: 'email', message: 'Please enter a valid email address.' },
              ]}
            >
              <Input placeholder='yourname@email.com' />
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' className='forget-continue'>
                Continue
              </Button>
            </Form.Item>
          </Form>
        )}

        {/* code */}
        {type === 'code' && (
          <Form layout='vertical' onFinish={formFish['code']}>
            <h4>ENTER THE CODE WE DENT TO</h4>

            <p>
              We sent a 6-digit code to your email address.Enter that code to reset your password.
            </p>

            <Form.Item
              label='6-Digit Code'
              name='email'
              rules={[
                {
                  required: true,
                  message: <FieldDom />,
                },
                { type: 'email', message: 'Please enter a valid email address.' },
              ]}
            >
              <Input placeholder='yourname@email.com' />
            </Form.Item>

            <Form.Item>
              <span>
                Didn't get the email? <b onClick={sendEmailAgain}>Send email again</b>
              </span>
            </Form.Item>
          </Form>
        )}

        {/* new password */}
        {type === 'password' && (
          <Form layout='vertical' onFinish={formFish['password']}>
            <h4>ENTER YOUR PASSWORD</h4>

            <Form.Item
              label='NEW PASSWORD'
              name='email'
              rules={[
                {
                  required: true,
                  message: <FieldDom />,
                },
                { type: 'email', message: 'Please enter a valid email address.' },
              ]}
            >
              <Input placeholder='yourname@email.com' />
            </Form.Item>

            <span>
              Please use at least 6 characters. <b>Remember</b>: Passwords are case sensitive.
            </span>
          </Form>
        )}

        {/* change success */}
        {type === 'success' && (
          <>
            <h4>Your password has been changed.</h4>
            <p>
              Do you want to{' '}
              <Link to='/login'>
                <b>log in</b>
              </Link>
              ?
            </p>
          </>
        )}
      </div>

      <Modal visible={visibleCode} closable={false} footer={null}>
        <div className='cusmodal-body'>That code doesn't work. Please try again.</div>
        <div className='cusmodal-footer'>
          <span
            className='model-resend'
            onClick={() => {
              setVisibleCode(false)
              setVisibleSendCode(true)
            }}
          >
            Resend Code
          </span>
          <span
            className='modal-try'
            onClick={() => {
              sendCode()
              form.resetFields()
            }}
          >
            Try Again
          </span>
        </div>
      </Modal>

      <Modal closable={false} footer={null} visible={visibleSendCode}>
        <div className='cusmodal-body'>
          <span>We resent a 6-digit code to your email address.</span>
          <br />
          <span>Please Check.</span>
        </div>
        <div className='cusmodal-footer'>
          <span
            onClick={() => {
              setVisibleSendCode(false)
            }}
          >
            OK
          </span>
        </div>
      </Modal>
    </div>
  )
}

export default Forget
