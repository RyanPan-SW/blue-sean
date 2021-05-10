import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import deleteIcon from '../../asset/delete.png'
import userBook from '../../asset/userbook.png'
import './index.scss'

const messageTitle = 'Please Enter.'

function FileStep2({ recipient = [], cityArray, setStep }) {
  return (
    <>
      <div className='step2'>
        {recipient.map((item, index) => {
          return (
            <div key={index}>
              <div className='step2-top'>
                <span>
                  {recipient.length > 1 ? (
                    <span className='step2-title'>Recipient-{index + 1}</span>
                  ) : (
                    <span className='step2-title'>Step2: Recipient information</span>
                  )}
                </span>

                <span>
                  {index !== 0 && (
                    <span /* onClick={deleteRecipient} */>
                      <img src={deleteIcon} alt='' />
                      <span className='add-address-book'>Delete</span>
                    </span>
                  )}

                  <img src={userBook} alt='' />
                  <span className='add-address-book'>Add from address book</span>
                </span>
              </div>

              <Form layout='vertical' name='step2' className='step2-form'>
                <div className='step2-form-flex'>
                  <div className='step2-form-column'>
                    <div className='step2-name'>
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

                  <div className='step2-form-column'>
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

                {recipient.length > 1 && <div className='form-line'></div>}

                {index + 1 === recipient.length && (
                  <>
                    <div className='add-new-address'>
                      <span /* onClick={addNewRecipient} */>+Add a new recipient</span>
                      <span>You can add up to 5 recipient</span>
                    </div>

                    <Form.Item className='form-submit'>
                      <Button
                        className='form-submit-back'
                        onClick={() => {
                          setStep(1)
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        className='form-submit-button'
                        onClick={() => {
                          setStep(3)
                        }}
                      >
                        Confirm Address
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default FileStep2
