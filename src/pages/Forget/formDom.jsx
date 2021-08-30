import React, { useState } from 'react'
import { Form, Input, message, Modal, Button } from 'antd'
import { getCode, updatePwdByCode, verificationCode } from '@/api/forget'
import { errorCodeMessage } from '@/helper/error'
import FieldDom from '@/components/Field'
import { setCookie } from '@/helper/env'

let userEmail = null
let userCode = null

export const SendEmailGetCodeDom = ({ setMsg, setEmail, setType }) => {
  const [errmsg, setErrmsg] = useState(false)

  const sendEmail = (values) => {
    userEmail = values.userName
    setEmail && setEmail(values.userName)
    getCode(values).then((res) => {
      const { code, /* data, */ errmsg } = res
      if (code !== '200') {
        setMsg(errmsg)
        setErrmsg(true)
        return
      }
      setType('code')
      setMsg(null)
    })
  }

  return (
    <Form name='email' layout='vertical' onFinish={sendEmail}>
      <h4>FORGOT YOUR PASSWORD?</h4>

      <p>Enter your email address and we'll send you a code you can use to reset your password.</p>

      <Form.Item
        label='YOUR EMAIL'
        name='userName'
        getValueFromEvent={(e) => {
          return e.target.value.replace(/\s+/g, '')
        }}
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please enter a valid email address.',
          },
          // { type: 'email', message: 'Please enter a valid email address.' },
        ]}
      >
        <Input placeholder='yourname@email.com' />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType='submit'
          className='forget-continue'
          style={{ marginTop: errmsg ? 200 : 280 }}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  )
}

export const VerificationCodeDom = ({ Email, setType }) => {
  const [form] = Form.useForm()
  const [visibleCode, setVisibleCode] = useState(false)
  const [visibleSendCode, setVisibleSendCode] = useState(false)

  const sendEmailAgain = () => {
    getCode({ userName: Email }).then((res) => {
      const { code /* data, errmsg */ } = res
      if (code !== '200') {
        console.log(errorCodeMessage[code])
        return
      }
      message.success('Send success!')
      // setVisibleSendCode(true)
    })
  }

  const sendCode = (values) => {
    userCode = values.code
    verificationCode({ userName: Email, ...values }).then((res) => {
      if (res.code === '200') {
        setType('password')
        setVisibleCode(false)
      } else {
        setVisibleCode(true)
      }
    })
  }

  const resendCode = () => {
    setVisibleCode(false)
    setVisibleSendCode(true)
  }

  const tryAgainCode = () => {
    form.resetFields()
    setVisibleCode(false)
  }

  return (
    <>
      <Form form={form} name='code' layout='vertical' onFinish={sendCode}>
        <h4>ENTER THE CODE WE DENT TO</h4>
        <h4>{userEmail}</h4>

        <p>We sent a 6-digit code to your email address.Enter that code to reset your password.</p>

        <Form.Item
          label='6-Digit Code'
          name='code'
          getValueFromEvent={(e) => {
            return e.target.value.replace(/^\D+$/g, '')
          }}
          rules={[
            {
              required: true,
              message: <FieldDom />,
            },
            {
              len: 6,
              message: 'Verification Code length must 6.',
            },
          ]}
        >
          <Input placeholder='Enter Code' />
        </Form.Item>

        <Form.Item>
          <span>
            Didn't get the email?
            <b className='sendCodeAgain' onClick={sendEmailAgain}>
              Send email again
            </b>
          </span>
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' className='forget-code-continue'>
            Continue
          </Button>
        </Form.Item>
      </Form>

      <Modal width={604} centered visible={visibleCode} closable={false} footer={null}>
        <div className='cusmodal-body'>That code doesn't work. Please try again.</div>
        <div className='cusmodal-footer'>
          <span className='model-resend' onClick={resendCode}>
            Resend Code
          </span>
          <span className='modal-try' onClick={tryAgainCode}>
            Try Again
          </span>
        </div>
      </Modal>

      <Modal centered closable={false} footer={null} visible={visibleSendCode}>
        <div className='cusmodal-body'>
          <span>We resent a 6-digit code to your email address.</span>
          <br />
          <span>Please Check.</span>
        </div>
        <div className='cusmodal-footer'>
          <span
            className='cusmodal-ok'
            onClick={() => {
              setVisibleSendCode(false)
              form.resetFields()
            }}
          >
            OK
          </span>
        </div>
      </Modal>
    </>
  )
}

export const SetNewPasswordDom = ({ Email, setType }) => {
  const setNewPassword = (values) => {
    let params = { userName: Email, code: userCode, newpassword: values.newpassword }
    updatePwdByCode(params).then((res) => {
      const { code, errmsg, data } = res
      if (code !== '200' && !data) {
        message.error(errmsg)
        return
      }
      setCookie('token', data.token, 30)
    })
    setType('success')
  }

  return (
    <Form name='password' layout='vertical' onFinish={setNewPassword}>
      <h4>ENTER YOUR PASSWORD</h4>

      <Form.Item
        label='NEW PASSWORD'
        name='newpassword'
        getValueFromEvent={(e) => {
          return e.target.value.replace(/\s+/g, '')
        }}
        rules={[
          {
            required: true,
            message: <FieldDom />,
          },
          {
            min: 6,
            message:
              'Use a password of at least 6 characters. Suggest you include an uppercase letter, a lowercase letter, a number, and a special character.',
          },
          {
            max: 20,
            message: 'Passwords can only be entered up to 20 characters.',
          },
        ]}
      >
        <Input.Password
          placeholder='Password'
          iconRender={(visible) => (visible ? 'hide' : 'show')}
        />
      </Form.Item>

      <span>
        Please use at least 6 characters. <b>Remember</b>: Passwords are case sensitive.
      </span>

      <Form.Item>
        <Button htmlType='submit' className='submit-new-newpassword'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
