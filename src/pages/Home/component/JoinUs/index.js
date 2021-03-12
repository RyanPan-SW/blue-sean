import React, { useState, useEffect } from 'react'
import triangle from '@/asset/triangle.png'
import { Form, Input, Button, Modal } from 'antd'
import './index.scss'
import { getAsk } from '@/api/home'

function JoinUs(props) {
  const [visible, setVisible] = useState(false)

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
    console.log('ask表单内容', values)
    getAsk().then((res) => {
      if (res || res.code === 200) {
        setVisible(true)
      }
    })
  }

  const normFile = (e) => {
    return e.replace(/[^\u4e00-\u9fa5a-zA-Z\s]+/gm, '')
  }

  return (
    <>
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
                normalize={normFile}
                className='formItem'
              >
                <Input placeholder='Frist Name' className='form-input' />
              </Form.Item>

              <Form.Item
                name={['user', 'LastName']}
                rules={[{ required: true, message: 'please Enter' }]}
                normalize={normFile}
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

      <Modal
        className='modal-body'
        width={640}
        centered
        closable={false}
        onCancel={() => {
          setVisible(false)
        }}
        onOk={() => {
          setVisible(false)
        }}
        footer={null}
        visible={visible}
      >
        <div className='join-modal-body'>
          <h3 className='modal-title'>Thank you for your Request!</h3>

          <div className='modal-content-span'>
            We will process your application and contact you within the next two working days.
          </div>

          <div className='modal-ok'>
            <span
              onClick={() => {
                setVisible(false)
              }}
            >
              ok
            </span>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default JoinUs
