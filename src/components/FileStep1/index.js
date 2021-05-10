import React, { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import userBook from '../../asset/userbook.png'
import './index.scss'
import AddFromAddressBook from '../AddFromAddressBook'

const messageTitle = 'Please Enter.'

function FileStep1({ cityArray, setStep }) {
  const [visible, setVisible] = useState(false)

  const addFromAddressBook = () => {
    console.log('object')
    setVisible(true)
  }

  return (
    <div className='step1'>
      <div className='step1-top'>
        <div className='step1-title'>Step1: Sender information</div>
        <div className='form-address-book' onClick={addFromAddressBook}>
          <img src={userBook} alt='' />
          <span className='add-address-book'>Add from address book</span>
        </div>
      </div>

      <Form layout='vertical' name='step1' className='step1-form'>
        <div className='step1-form-flex'>
          <div className='step1-form-column'>
            <div className='step1-name'>
              <Form.Item
                label='First Name'
                name='firstName'
                className='name'
                rules={[
                  {
                    required: true,
                    message: messageTitle,
                  },
                ]}
              >
                <Input placeholder='First Name' />
              </Form.Item>

              <Form.Item
                label='Last Name'
                name='lastName'
                className='name'
                rules={[
                  {
                    required: true,
                    message: messageTitle,
                  },
                ]}
              >
                <Input placeholder='Last Name' />
              </Form.Item>
            </div>

            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: messageTitle,
                },
                {
                  type: 'email',
                  message: 'Please enter the correct email address.',
                },
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
              label='Street Address'
              name='address'
              rules={[
                {
                  required: true,
                  message: messageTitle,
                },
              ]}
            >
              <Input placeholder='Street Address' />
            </Form.Item>

            <Form.Item
              label='City'
              name='city'
              rules={[
                {
                  required: true,
                  message: messageTitle,
                },
              ]}
            >
              <Select placeholder='Please Select'>
                {cityArray.map((item, index) => {
                  return (
                    <Select.Option key={item.cityCode} value={item.cityCode}>
                      {item.cityName}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>

          <div className='step1-form-column'>
            <Form.Item
              label='Phone Number'
              name='phone'
              rules={[
                {
                  required: true,
                  message: messageTitle,
                },
                {
                  type: 'number',
                  message: 'Please enter the correct phone number.',
                },
              ]}
            >
              <Input placeholder='Phone Number' />
            </Form.Item>

            <Form.Item
              label='Company Name'
              name='companyName'
              rules={[
                {
                  required: true,
                  message: messageTitle,
                },
              ]}
            >
              <Input placeholder='Company Name' />
            </Form.Item>

            <Form.Item
              label='Apt/Suite/Other'
              name='other'
              rules={[
                {
                  required: true,
                  message: messageTitle,
                },
              ]}
            >
              <Input placeholder='Apt/Suite/Other' />
            </Form.Item>

            <Form.Item
              label='ZIP Code'
              name='zipcode'
              rules={[
                {
                  required: true,
                  message: messageTitle,
                },
              ]}
            >
              <Input placeholder='ZIP Code' />
            </Form.Item>
          </div>
        </div>

        <Form.Item label='Note' name='note'>
          <Input.TextArea />
        </Form.Item>

        <Form.Item className='form-submit'>
          <Button
            className='form-submit-button'
            onClick={() => {
              setStep(2)
            }}
          >
            Confirm Address
          </Button>
        </Form.Item>
      </Form>

      <AddFromAddressBook visible={visible} setVisible={setVisible} />
    </div>
  )
}

export default FileStep1
