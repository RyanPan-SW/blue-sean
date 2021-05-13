import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, message, Space } from 'antd'
import deleteIcon from '../../asset/delete.png'
import userBook from '../../asset/userbook.png'
import { setRecipientApi, getSessionRecipient } from '@/api/fileStep'
import './index.scss'
import { normFile } from '@/helper'

const messageTitle = 'Please Enter.'

function FileStep2({ /* recipient = [], */ cityArray, setStep }) {
  useEffect(() => {
    const sessionid = localStorage.getItem('repcipientid')
    if (sessionid) sessionToObtainRecipient()
  }, [])

  const sessionToObtainRecipient = () => {
    getSessionRecipient().then((res) => {
      if (res.code === '200') {
        // setRecipientArray(res.data.sender)
      } else {
        message.error(res.data.msg)
      }
    })
  }

  const fishedRecipient = (values) => {
    setRecipientApi(values).then((res) => {
      if (res.code === '200' && !res.data.msg) {
        localStorage.setItem('recipientid', res.data.sessionid)
        setStep(3)
      } else if (res.code === '200' && res.data.msg) {
        message.error(res.data.msg)
      }
    })
  }

  return (
    <>
      <div className='step2'>
        <Form
          layout='vertical'
          name='step2'
          className='step2-form'
          initialValues={{
            recipientList: [{}],
          }}
          onFinish={fishedRecipient}
        >
          <Form.List name='recipientList'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space direction='vertical'>
                    {fields.name !== 0 && name === 0 && (
                      <div className='step2-title'>Step2: Recipient information</div>
                    )}

                    <div className='step2-top'>
                      <div className='top-title'>
                        {fields.name === 0
                          ? 'Step2: Recipient  information'
                          : `Recipient-${name + 1}`}
                      </div>

                      <Space
                        className='top-edit-icon'
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                      >
                        {key !== 0 && (
                          <div
                            onClick={() => {
                              remove(name)
                            }}
                          >
                            <img src={deleteIcon} alt='' />
                            <span className='add-address-book'>Delete</span>
                          </div>
                        )}

                        <div>
                          <img src={userBook} alt='' />
                          <span className='add-address-book'>Add from address book</span>
                        </div>
                      </Space>
                    </div>

                    <div className='step2-form-flex'>
                      <div className='step2-form-column'>
                        <div className='step2-name'>
                          <Form.Item
                            normalize={normFile}
                            label='First Name'
                            name={[name, 'firstName']}
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
                            name={[name, 'lastName']}
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
                          name={[name, 'email']}
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
                          name={[name, 'address']}
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
                          name={[name, 'cityCode']}
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
                          name={[name, 'phone']}
                          rules={[
                            {
                              required: true,
                              message: messageTitle,
                            },
                          ]}
                        >
                          <Input placeholder='Phone Number' />
                        </Form.Item>

                        <Form.Item label='Company Name' name={[name, 'companyName']}>
                          <Input placeholder='Company Name' />
                        </Form.Item>

                        <Form.Item label='Apt/Suite/Other' name={[name, 'other']}>
                          <Input placeholder='Apt/Suite/Other' />
                        </Form.Item>

                        <Form.Item
                          label='ZIP Code'
                          name={[name, 'zipcode']}
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

                    <Form.Item label='Note' name={[name, 'note']}>
                      <Input.TextArea />
                    </Form.Item>

                    <div className='form-line'></div>
                  </Space>
                ))}

                {fields.name < 5 && (
                  <div className='add-new-address'>
                    <span
                      onClick={() => {
                        add()
                      }}
                    >
                      +Add a new recipient
                    </span>
                    <span>You can add up to 5 recipient</span>
                  </div>
                )}
              </>
            )}
          </Form.List>

          {/* {index + 1 === recipient.length && (
                  <div className='add-new-address'>
                    <span
                      onClick={() => {
                        add()
                      }}
                    >
                      +Add a new recipient
                    </span>
                    <span>You can add up to 5 recipient</span>
                  </div>
                )} */}

          <Form.Item className='form-submit'>
            <Button
              className='form-submit-back'
              onClick={() => {
                setStep(1)
              }}
            >
              Back
            </Button>

            <Button type='primary' htmlType='submit' className='form-submit-button'>
              Confirm Address
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default FileStep2
