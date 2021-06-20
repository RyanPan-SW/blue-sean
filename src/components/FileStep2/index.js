import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, message, Space } from 'antd'
import deleteIcon from '../../asset/delete.png'
import userBook from '../../asset/userbook.png'
import { setRecipientApi, getSessionRecipient } from '@/api/fileStep'
import './index.scss'
import { normFile } from '@/helper'
import { getCookie } from '@/helper/env'
import AddFromAddressBook from '../AddFromAddressBook'

const messageTitle = 'Please Enter.'

function FileStep2({ cityArray, setStep, history }) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [recipientList, setRecipientList] = useState([{}])
  const [key, setkey] = useState(null)

  useEffect(() => {
    sessionToObtainRecipient()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sessionToObtainRecipient = () => {
    const sessionid = localStorage.getItem('sessionid')
    if (!sessionid) return

    getSessionRecipient().then((res) => {
      if (res.code === '200' && res.data.recipientList) {
        if (res.data.recipientList.length === 0) {
          form.setFieldsValue({ recipientList: [{}] })
        } else {
          form.setFieldsValue({ recipientList: res.data.recipientList })
        }
        setRecipientList(res.data.recipientList)
      } else {
        message.error(res.data.msg)
      }
    })
  }

  const fishedRecipient = (values) => {
    setRecipientApi(values).then((res) => {
      if (res.code === '200' && !res.data.msg) {
        localStorage.setItem('sessionid', res.data.sessionid)
        setStep(3)
      } else if (res.code === '200' && res.data.msg) {
        message.error(res.data.msg)
      }
    })
  }

  const addFromAddressBook = (key) => {
    setkey(key)
    return getCookie('token') ? setVisible(true) : history.push('/login')
  }

  const selectedRecipientItem = (row) => {
    const newRecipientList = recipientList
    newRecipientList[key] = row
    form.setFieldsValue({ recipientList: newRecipientList })
    setVisible(false)
  }

  return (
    <>
      <div className='step2'>
        <Form
          form={form}
          layout='vertical'
          name='step2'
          className='step2-form'
          initialValues={{ recipientList: [{}] }}
          onFinish={fishedRecipient}
        >
          <Form.List name='recipientList'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space direction='vertical' key='key' style={{ width: '100%' }}>
                    {fields.length > 1 && (
                      <div className='step2-title'>Step2: Recipient information</div>
                    )}

                    <div className='step2-top'>
                      <div className='top-title'>
                        {fields.length > 1
                          ? `Recipient-${name + 1}`
                          : 'Step2: Recipient  information'}
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

                        <div
                          onClick={() => {
                            addFromAddressBook(name)
                          }}
                        >
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

                {fields.length < 5 && (
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

          <Form.Item className='form-submit'>
            <Space>
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
            </Space>
          </Form.Item>
        </Form>

        <AddFromAddressBook
          visible={visible}
          setVisible={setVisible}
          submit={selectedRecipientItem}
        />
      </div>
    </>
  )
}

export default FileStep2
