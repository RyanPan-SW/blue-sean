import React, { useState, useRef } from 'react'
import { Form, Input, message, Modal, Button, InputNumber } from 'antd'
import { getCode, updatePwdByCode, verificationCode } from '@/api/forget'
import { errorCodeMessage } from '@/helper/error'
import FieldDom from '@/components/Field'
import LoadingSubmit from '@/components/LoadingSubmit'

let userEmail = null
let userCode = null

// Email
export const SendEmailGetCodeDom = ({ setType }) => {
  const emailRef = useRef(null)
  const [email, setEmail] = useState('')
  const [Loading, setLoading] = useState(false)

  const sendEmail = (values) => {
    const { userName } = values
    setLoading(true)
    setEmail(userName)
    if (email === userName) {
      setLoading(true)
      return
    }
    getCode({ userName: userName }).then((res) => {
      const { code, errmsg } = res
      setLoading(false)
      userEmail = userName
      if (code !== '200') {
        emailRef.current.setFields([
          {
            name: 'userName',
            errors: [<FieldDom message={errmsg} />],
          },
        ])
        return
      } else {
        setType('code')
      }
    })
  }

  return (
    <Form name='email' layout='vertical' onFinish={sendEmail} ref={emailRef}>
      <div>
        <h4>FORGOT YOUR PASSWORD?</h4>

        <p>
          Enter your email address and we'll send you a code you can use to reset your password.
        </p>

        <Form.Item
          label='YOUR EMAIL'
          name='userName'
          // validateTrigger='onBlur'
          getValueFromEvent={(e) => {
            return e.target.value.replace(/\s+/g, '')
          }}
          validateTrigger='onBlur'
          rules={[
            {
              required: true,
              type: 'email',
              message: <FieldDom message='Please enter a valid email address.' />,
            },
          ]}
        >
          <Input placeholder='yourname@email.com' />
        </Form.Item>
      </div>

      {Loading ? (
        <LoadingSubmit className='loading' />
      ) : (
        <Form.Item>
          <Button htmlType='submit' className='forget-continue'>
            Continue
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}

// Code
export const VerificationCodeDom = ({ Email, setType }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [visibleCode, setVisibleCode] = useState(false)
  const [visibleSendCode, setVisibleSendCode] = useState(false)

  const sendEmailAgain = () => {
    setVisibleSendCode(true)
    getCode({ userName: userEmail }).then((res) => {
      const { code /* data, errmsg */ } = res
      if (code !== '200') {
        console.log(errorCodeMessage[code])
        return
      }
    })
  }

  const sendCode = (values) => {
    userCode = values.code
    setLoading(true)
    verificationCode({ userName: Email, ...values }).then((res) => {
      setLoading(false)
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
        <div>
          <h4>ENTER THE CODE WE DENT TO</h4>
          <h4>{userEmail}</h4>

          <p>
            We sent a 6-digit code to your email address.Enter that code to reset your password.
          </p>

          <Form.Item
            label='6-Digit Code'
            name='code'
            rules={[
              {
                required: true,
                message: <FieldDom message='This field is required.' />,
              },
            ]}
          >
            <InputNumber maxLength={6} controls={false} placeholder='Enter Code' />
          </Form.Item>

          <Form.Item>
            <span>
              Didn't get the email?
              <b className='sendCodeAgain' onClick={sendEmailAgain}>
                Send email again
              </b>
            </span>
          </Form.Item>
        </div>

        <Form.Item>
          {loading ? (
            <LoadingSubmit className='loading' />
          ) : (
            <Button htmlType='submit' className='forget-code-continue'>
              Continue
            </Button>
          )}
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

      <Modal width={600} centered closable={false} footer={null} visible={visibleSendCode}>
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

// Password
export const SetNewPasswordDom = ({ Email, setType }) => {
  const [loading, setLoading] = useState(false)

  const setNewPassword = (values) => {
    setLoading(true)
    let params = { userName: Email, code: userCode, newpassword: values.newpassword }
    updatePwdByCode(params).then((res) => {
      const { code, errmsg, data } = res
      if (code !== '200' && !data) {
        message.error(errmsg)
        return
      }
      // setCookie('token', data.token, 30) // 取消自动登录
    })
    setLoading(false)
    setType('success')
  }

  return (
    <Form name='password' layout='vertical' onFinish={setNewPassword}>
      <div>
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
            iconRender={(visible) =>
              visible ? (
                <span style={{ color: visible && '#b38948' }}>Hide</span>
              ) : (
                <span style={{ color: !visible && '#333' }}>Show</span>
              )
            }
          />
        </Form.Item>

        <span>
          Please use at least 6 characters. <b>Remember</b>: Passwords are case sensitive.
        </span>
      </div>

      {loading ? (
        <LoadingSubmit />
      ) : (
        <Form.Item>
          <Button htmlType='submit' className='submit-new-newpassword'>
            Submit
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
