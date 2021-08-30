//page: 企业申请合作

import React, { useState } from 'react'
import { Button, Form, Input, message, Radio } from 'antd'
import './index.scss'
import FieldDom from '@/components/Field'
import { emailMsg, /* patterns */ } from '@/helper/env'
import PromptModel from '@/components/PromptModel'
import { createCorporate } from '@/api/cooperate'

function Cooperate(props) {
  const [ShowPromptBox, setShowPromptBox] = useState(false)

  const normFile = (e) => {
    return e.replace(/[\u4e00-\u9fa5]/gm, '')
  }

  const onFinish = (values) => {
    // TODO: 1.校验通过，当前页跳转到【企业用户合作申请完成】页
    createCorporate(values).then((res) => {
      const { code /* data */ } = res
      if (code === '200') {
        setShowPromptBox(true)
      } else {
        message.error('Network Error')
      }
    })
  }

  return (
    <>
      {!ShowPromptBox && (
        <div className='container'>
          <div className='cooperate-content'>
            <div className='cooperate-form'>
              <h4>CREATE AN ACCOUNT FOR CORPORATE</h4>
              <p className='cooperate-describe'>
                Please fill in the following information, and our customer service representatives
                will contact you to assist you with opening an account.
              </p>

              <Form layout='vertical' onFinish={onFinish}>
                <Form.Item className='CONTACTS' label={<span>CONTACTS</span>} required>
                  <Form.Item
                    name='firstName'
                    normalize={normFile}
                    rules={[{ required: true, message: <FieldDom />, whitespace: true }]}
                    style={{ flex: 1, marginRight: 20 }}
                  >
                    <Input placeholder='First Name' />
                  </Form.Item>

                  <Form.Item
                    name='lastName'
                    normalize={normFile}
                    rules={[{ required: true, message: <FieldDom />, whitespace: true }]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder='Last Name' />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  label={<span>PHONE</span>}
                  name='phone'
                  rules={[
                    { required: true, message: <FieldDom />, whitespace: true },
                    // { pattern: patterns.tel, message: 'Please enter the phone number.' },
                  ]}
                  normalize={normFile}
                >
                  <Input placeholder='Phone' />
                </Form.Item>
                <Form.Item
                  label={<span>EMAIL</span>}
                  name='email'
                  normalize={normFile}
                  rules={[
                    { required: true, message: <FieldDom />, whitespace: true },
                    { type: 'email', message: emailMsg.email },
                  ]}
                >
                  <Input placeholder='company@email.com' />
                </Form.Item>
                <Form.Item
                  label={<span>COMPANY NAME</span>}
                  name='companyName'
                  normalize={normFile}
                  rules={[{ required: true, message: <FieldDom />, whitespace: true }]}
                >
                  <Input placeholder='Company Name' />
                </Form.Item>
                <Form.Item
                  label={<span>CAN THE BUSINESS LICENSE BE PROVIDED?</span>}
                  name='provided'
                  normalize={normFile}
                  rules={[{ required: true, message: <FieldDom />, whitespace: true }]}
                >
                  <Radio.Group>
                    <Radio value='1'>YES</Radio>
                    <Radio value='0'>NO</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label={<span>COMPANY ADDRESS</span>}
                  name='companyAddress'
                  normalize={normFile}
                  rules={[{ required: true, message: <FieldDom />, whitespace: true }]}
                >
                  <Input placeholder='Company Address' />
                </Form.Item>
                <Form.Item
                  label={<span>CITY</span>}
                  name='city'
                  rules={[{ required: true, message: <FieldDom />, whitespace: true }]}
                >
                  <Input placeholder='City' />
                </Form.Item>

                <Form.Item
                  label={<span>STATE/PROVINCE/REGION</span>}
                  name='state'
                  normalize={normFile}
                  rules={[{ required: true, message: <FieldDom />, whitespace: true }]}
                >
                  <Input placeholder='State/Province/Region' />
                </Form.Item>
                <Form.Item
                  label={<span>ZIP CODE</span>}
                  name='zipcode'
                  normalize={normFile}
                  rules={[
                    { required: true, message: <FieldDom />, whitespace: true },
                    // {
                    //   pattern: patterns.ZIPCode,
                    //   message: 'Please enter a valid zip code address.',
                    // },
                  ]}
                >
                  <Input placeholder='ZIP CODE' />
                </Form.Item>
                <Form.Item>
                  <Button htmlType='submit' className='form-submit'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div className='cooperate-why'>
              <h3>Why create ?</h3>

              <ul className='cooperate-feature'>
                <li>Enjoy the monthly credit service</li>
                <li>Preferential price</li>
                <li>待提供其他优势优点..</li>
              </ul>

              <h3 className='step'>Account opening steps:</h3>
              <ul className='step-ul'>
                <li>Fill in the account registration form online.</li>
                <li>
                  Our Customer Service Representative will contact you within one business day to
                  guide you through the process.
                </li>
                <li>
                  Submit the required documents (by giving them to our courier during shipment
                  pickup or by post*).
                </li>
                <li>
                  When we receive your application, we will email you your account number within one
                  business day.
                </li>
              </ul>

              <h4>Please note：</h4>
              <ul className='cooperate-note'>
                <li>The approval process for monthly credit may take up to five business days.</li>
                <li>We will update you by email regarding your approval status.</li>
                <li>Postage is borne by sender</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {ShowPromptBox && (
        <PromptModel>
          <h3 className='prompt-title'>Thank you for your Request!</h3>

          <p className='prompt-describe'>
            We will process your application and contact you within the next two working days. For
            further information, please contact us.
          </p>
        </PromptModel>
      )}
    </>
  )
}

export default Cooperate
