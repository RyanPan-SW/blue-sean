import React, { useState } from 'react'
import { Form, Input, message, Modal, Button } from 'antd'
import { getCode, updatePwd, verificationCode } from '@/api/forget'
import { errorCode } from '@/helper/error'
import FieldDom from '@/components/Field'

let userEmail = null
let userCode = null

export const SendEmailGetCodeDom = ({ setMsg, setEmail, setType }) => {
  const sendEmail = (values) => {
    userEmail = values.email
    getCode(values).then((res) => {
      const { code, /* data, */ errmsg } = res
      if (code !== '200') {
        console.log(errorCode[code])
        setMsg(errmsg)
        return
      }
      setType('code')
    })
  }

  return (
    <Form name='email' layout='vertical' onFinish={sendEmail}>
      <h4>FORGOT YOUR PASSWORD?</h4>

      <p>Enter your email address and we'll send you a code you can use to reset your password.</p>

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
  )
}

export const VerificationCodeDom = ({ userName, setType }) => {
  const [form] = Form.useForm()
  const [visibleCode, setVisibleCode] = useState(false)
  const [visibleSendCode, setVisibleSendCode] = useState(false)

  const sendEmailAgain = () => {
    getCode({ userName: userName }).then((res) => {
      const { code /* data, errmsg */ } = res
      if (code !== '200') {
        console.log(errorCode[code])
        return
      }
      message.success('Send success!')
      // setVisibleSendCode(true)
    })
  }

  const sendCode = (values) => {
    userCode = values.code
    verificationCode({ userName, ...values }).then((res) => {
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
    debugger
    form.resetFields()
    setVisibleCode(false)
  }

  return (
    <>
      <Form name='code' layout='vertical' onFinish={sendCode}>
        <h4>ENTER THE CODE WE DENT TO</h4>
        <h4>{userEmail}</h4>

        <p>We sent a 6-digit code to your email address.Enter that code to reset your password.</p>

        <Form.Item
          label='6-Digit Code'
          name='code'
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
          <Button htmlType='submit' className='forget-continue'>
            Continue
          </Button>
        </Form.Item>
      </Form>

      <Modal width={604} /* centered */ visible={visibleCode} closable={false} footer={null}>
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
            onClick={() => {
              setVisibleSendCode(false)
            }}
          >
            OK
          </span>
        </div>
      </Modal>
    </>
  )
}

export const SetNewPasswordDom = ({ userName, setType }) => {
  const setNewPassword = (values) => {
    let params = { userName: userEmail, code: userCode, newpassword: values.newpassword }
    updatePwd(params).then((res) => {
      const { code, data } = res
      if (code !== '200') {
        
      }
    })
    setType('success')
  }

  return (
    <Form name='password' layout='vertical' onFinish={setNewPassword}>
      <h4>ENTER YOUR PASSWORD</h4>

      <Form.Item
        label='NEW PASSWORD'
        name='newpassword'
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
        <Input.Password placeholder='Password' />
      </Form.Item>

      <span>
        Please use at least 6 characters. <b>Remember</b>: Passwords are case sensitive.
      </span>

      <Form.Item>
        <Button htmlType='submit' className='submit-newpassword'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
