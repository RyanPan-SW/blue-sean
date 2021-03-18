import React, { useState } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import FieldDom from '@/components/Field'
import { passwordMsg, patterns } from '@/helper/env'
import { sendEmail as sendEmailAPI, verificationCode } from '@/api/forget'
import './index.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Forget(props) {
  const [form] = Form.useForm()

  const [type, setType] = useState('email')
  const [visibleCode, setVisibleCode] = useState(false)
  const [visibleSendCode, setVisibleSendCode] = useState(false)
  const [email, setEmail] = useState('')

  const sendEmail = (values) => {
    setEmail(values.email)
    setType('code')
  }

  const sendCode = (values) => {
    verificationCode(values).then((res) => {
      if (res.code === 200) {
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
      if (res.code === 200) {
        setVisibleSendCode(true)
      }
    })
  }

  const modeType = {
    email: 'email',
    code: 'code',
    password: 'password',
    success: 'success',
  }

  const modeContent = {
    email: {
      title: 'FORGOT YOUR PASSWORD?',
      subTitle: '',
      describe:
        "Enter your email address and we'll send you a code you can use to reset your password.",
    },
    code: {
      title: 'ENTER THE CODE WE DENT TO',
      subTitle: '',
      describe:
        'We sent a 6-digit code to your email address.Enter that code to reset your password.',
    },
    password: { title: 'ENTER YOUR PASSWORD', subTitle: '', describe: '' },
    success: { title: 'Congratulations!', subTitle: 'Your password has been changed.' },
  }

  const formFish = {
    email: sendEmail,
    code: sendCode,
    password: setNewPassword,
  }

  return (
    <div className='forgrt'>
      <div className='forget-content'>
        <h4>{modeContent[type]['title']}</h4>
        {type === modeType['code'] && <h4>{email}</h4>}
        {type === modeType['success'] && (
          <>
            <h4>Your password has been changed.</h4>
            <p>
              Do you want to <Link to='/login'><b>log in</b></Link>?
            </p>
          </>
        )}

        <p>{modeContent[type]['describe']}</p>

        {type !== modeType['success'] && (
          <Form layout='vertical' onFinish={formFish[type]}>
            {type === modeType['email'] && (
              <Form.Item
                label='YOU EMAIL'
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
            )}
            {type === modeType['code'] && (
              <>
                <Form.Item
                  label='6-Digit Code'
                  name='code'
                  rules={[
                    {
                      required: true,
                      message: <FieldDom />,
                    },
                  ]}
                >
                  <Input placeholder='Enter Code' />
                </Form.Item>

                <span>
                  Didn't get the email? <b onClick={sendEmailAgain}>Send email again</b>
                </span>
              </>
            )}
            {type === modeType['password'] && (
              <>
                <Form.Item
                  label='NEW PASSWORD'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: <FieldDom />,
                    },
                    { min: 6, max: 20, message: passwordMsg.pattern },
                    {
                      pattern: patterns.pwd,
                      message: passwordMsg.pwd,
                    },
                  ]}
                >
                  <Input.Password placeholder='Password' />
                </Form.Item>
                <span>
                  Please use at least 6 characters. <b>Remember</b>: Passwords are case sensitive.
                </span>
              </>
            )}
            <Form.Item>
              <Button htmlType='submit' className='forget-continue'>
                Continue
              </Button>
            </Form.Item>
          </Form>
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
