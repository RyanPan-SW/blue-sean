import React from 'react'
import triangle from '@/asset/triangle.png'
import { Row, Col } from 'react-bootstrap'
import { Form, InputNumber, Input, Button } from 'antd'
import './index.scss'

const layout = {
  // labelCol: { span: 8 },
  wrapperCol: { span: 12 },
}

function JoinUs(props) {
  const validateMessages = {
    required: 'is required!',
    types: {
      FristName: 'Please Enter',
      LastName: 'Please Enter',
      Email: 'Please Enter you email!',
      Problem: 'Please Enter you problem!',
    },
  }

  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <div className='join'>
      <img className='join-us-icon' src={triangle} alt='' />

      <div className='Join-us'>
        <h3>Don’t Hesltate To Ask</h3>
        <p>If you have any questions, don't hesitate to ask. Let us help you</p>

        <Form
          // {...layout}s
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <div className='join-name'>
            <Form.Item
              name={['user', 'FristName']}
              rules={[{ required: true, message: 'please Enter' }]}
              className='formItem'
            >
              <Input placeholder='Frist Name' className='form-input' />
            </Form.Item>

            <Form.Item
              name={['user', 'LastName']}
              rules={[{ required: true, message: 'please Enter' }]}
              className='formItem'
            >
              <Input placeholder='Last Name' className='form-input' />
            </Form.Item>
          </div>

          <Form.Item
            name={['user', 'Email']}
            rules={[
              { required: true, message: 'please Enter' },
              { type: 'email', message: 'Please enter the correct email!' },
            ]}
            className='formItem'
          >
            <Input placeholder='Your Email' className='form-input' />
          </Form.Item>

          <Form.Item
            name={['user', 'Problem']}
            rules={[{ required: true, message: 'please Enter' }]}
            className='formItem'
          >
            <Input.TextArea
              placeholder='Describe your problems'
              style={{ width: '100%', height: 300 }}
            />
          </Form.Item>

          <Form.Item className='formItem'>
            <Button className='submit-buttom' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default JoinUs
