import React from 'react'
import { Button, Form, Input } from 'antd'
import signhome from '../../asset/sign-home.png'
import signuser from '../../asset/sign-user.png'
import signaddress from '../../asset/sign-address.png'
import { Link } from 'react-router-dom'
import { ExclamationCircleFilled } from '@ant-design/icons'
import './index.scss'

function SignUp() {
  const status = false

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  /* eslint-disable no-template-curly-in-string */
  // const validateMessages = {
  //   required: "'${label}' is required.",
  //   types: {
  //     email: 'Please enter a valid email address.',
  //     password: 'This field is required.',
  //   },
  // }

  return (
    <div className='signup'>
      <div className='signup-content'>
        <div className='email-has-been'>
          <ExclamationCircleFilled style={{ color: '#A40000' }} />
          <span> Email has already been registered.</span>
        </div>

        <div className='signup-welcome'>SIGN UP FOR FREE</div>

        <div className='signup-personal'>
          <p>
            Please complete this form to create your personal account.Create an account and help you
            keep track of informed delivery.
          </p>
          <br />
          <span>Already have an account?</span>
          <Link to='/login' className='signup-sgin'>
            Log in.
          </Link>
        </div>

        <Form
          // form={form}
          className='signup-form'
          layout='vertical'
          onFinish={onFinish}
          // validateMessages={validateMessages}
          // initialValues={{ requiredMark }}
          // onValuesChange={onRequiredTypeChange}
          // requiredMark={requiredMark}
        >
          <Form.Item
            label={'YOUR EMAIL'}
            name='email'
            rules={[
              { type: 'email' },
              { required: true, message: 'Please enter a valid email address.' },
            ]}
          >
            <Input placeholder='yourname@email.com' />
          </Form.Item>

          <Form.Item
            label={'PASSWORD'}
            name='password'
            rules={[{ required: true, message: 'This field is required.' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          {true && (
            <p>
              Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.
            </p>
          )}

          <br />
          <p>
            By pressing the Sign Up button below, you agree to our{' '}
            <Link to='/terms' target='_blank'>
              Terms of use
            </Link>{' '}
            and &nbsp;
            <Link to='/privacypolicy' target='_blank'>
              Privacy Policy
            </Link>{' '}
            .
          </p>
          <br />

          <Form.Item>
            {true && (
              <Button type='primary' htmlType='submit' className='signup-form-button'>
                Sign Up
              </Button>
            )}

            {false && (
              <Button type='primary' htmlType='submit' className='signup-form-loading'>
                <div className='signup-loading'>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </Button>
            )}
          </Form.Item>
        </Form>

        {/* <Button onClick={signupClick}>登录</Button> */}
      </div>

      <p className='create'>
        <Link to='/business'>Create an account</Link> for corporate
      </p>

      {status && (
        <div className='signup-success'>
          <div className='congratulations'>
            <h4> Congratulations!</h4>
            <h4> Your account has been activated.</h4>

            <span>We have sent you an email with instructions to complete sign up.</span>
          </div>

          <div className='next'>
            <h3>WHAT'S  NEXT ?</h3>

            <div className='banner'>
              <Link to='/home' className='item'>
                <img src={signhome} alt='' />
                <span>Back Homepage</span>
              </Link>

              <div className='item'>
                <img src={signuser} alt='' />
                <span>My Account</span>
              </div>

              <div className='item'>
                <img src={signaddress} alt='' />
                <span>Add My Address</span>
              </div>
            </div>

            <span className='or'>or</span>

            <div className='new-pickup'>Schedule a New Pickup</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp
