import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, message, Space, Spin } from 'antd'
import deleteIcon from '../../asset/delete.png'
import userBook from '../../asset/userbook.png'
import { setRecipientApi, getSessionRecipient } from '@/api/fileStep'
import { normFile } from '@/helper'
import { getCookie } from '@/helper/env'
import AddFromAddressBook from '../AddFromAddressBook'
import classnames from 'classnames'
import CustomizeModal from '../CustomizeModal'
import './index.scss'

const messageTitle = 'Please Enter.'

function FileStep2({ cityArray, setStep, history }) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [recipientList, setRecipientList] = useState([{}])
  const [deleteModal, setDeleteModal] = useState(false)
  const [key, setkey] = useState(null)
  const [loading, setloading] = useState(false)
  const [deletename, setDeletename] = useState(null)

  useEffect(() => {
    sessionToObtainRecipient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sessionToObtainRecipient = () => {
    const sessionid = localStorage.getItem('sessionid')
    if (!sessionid) return
    setloading(true)
    getSessionRecipient().then((res) => {
      setloading(false)
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
    }).catch(error => {
      setloading(false)
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
    return getCookie('token') ? setVisible(true) : history.push('/login?from=filestep')
  }


  const selectedRecipientItem = (row) => {
    const newRecipientList = recipientList
    newRecipientList[key] = row
    form.setFieldsValue({ recipientList: newRecipientList })
    setVisible(false)
  }

  const showDeleteComfirm = (name) => {
    setDeleteModal(true)
    setDeletename(name)
  }

  return (
    <Spin spinning={loading}>
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
                  <div className="content-box" key={name} data-key={name} >
                    <Space direction='vertical' key={name} style={{ width: '100%' }}>
                      {name === 0 && (
                        <div className={classnames({ "step2-title-box": true, 'step2-only-one': fields.length === 1 })}>
                          <div className='step2-title '>Step2: Recipient information</div>

                          {fields.length === 1 && (
                            <div
                              className="top-edit"
                              onClick={() => {
                                addFromAddressBook(name)
                              }}
                            >
                              <img src={userBook} alt='' />
                              <span className='add-address-book'>Add from address book</span>
                            </div>
                          )}

                        </div>
                      )}


                      {fields.length > 1 && (
                        <div className='step2-top'>
                          <div className='top-title'>
                            {fields.length > 1 && `Recipient-${name + 1}`}
                          </div>

                          <div className='top-edit-icon'>

                            {name !== 0 && (
                              <div className="top-edit" onClick={() => showDeleteComfirm(name)}>
                                {/* <i id="remove" onClick={() => remove(name)}></i> */}
                                <img src={deleteIcon} alt='' />
                                <span className='add-address-book'>Delete</span>
                              </div>
                            )}

                            <div
                              className="top-edit"
                              onClick={() => {
                                addFromAddressBook(name)
                              }}
                            >
                              <img src={userBook} alt='' />
                              <span className='add-address-book'>Add from address book</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className='step2-form-flex'>
                        <div className='step2-form-column'>
                          <div className='step2-name'>
                            <Form.Item
                              {...restField}
                              className='name'
                              label='First Name'
                              name={[name, 'firstName']}
                              fieldKey={[fieldKey, 'firstName']}
                              normalize={normFile}
                              rules={[
                                { required: true, message: messageTitle, },
                              ]}
                            >
                              <Input placeholder='First Name' />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              className='name'
                              label='Last Name'
                              name={[name, 'lastName']}
                              fieldKey={[fieldKey, 'lastName']}
                              rules={[
                                { required: true, message: messageTitle, },
                              ]}
                            >
                              <Input placeholder='Last Name' />
                            </Form.Item>
                          </div>

                          <Form.Item
                            {...restField}
                            label='Email'
                            name={[name, 'email']}
                            fieldKey={[fieldKey, 'email']}
                            rules={[
                              { required: true, message: messageTitle, },
                              { type: 'email', message: 'Please enter the correct email address.', },
                            ]}
                          >
                            <Input placeholder='Email' />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label='Street Address'
                            name={[name, 'address']}
                            fieldKey={[fieldKey, 'address']}
                            rules={[
                              { required: true, message: messageTitle, },
                            ]}
                          >
                            <Input placeholder='Street Address' />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label='City'
                            name={[name, 'cityCode']}
                            fieldKey={[fieldKey, 'cityCode']}
                            rules={[
                              { required: true, message: messageTitle, },
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
                            {...restField}
                            label='Phone Number'
                            name={[name, 'phone']}
                            fieldKey={[fieldKey, 'phone']}
                            rules={[
                              { required: true, message: messageTitle, },
                            ]}
                          >
                            <Input placeholder='Phone Number' />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            fieldKey={[fieldKey, 'companyName']} label='Company Name' name={[name, 'companyName']}>
                            <Input placeholder='Company Name' />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            fieldKey={[fieldKey, 'other']} label='Apt/Suite/Other' name={[name, 'other']}>
                            <Input placeholder='Apt/Suite/Other' />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label='ZIP Code'
                            name={[name, 'zipcode']}
                            fieldKey={[fieldKey, 'zipcode']}
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

                      <Form.Item
                        fieldKey={[fieldKey, 'note']} label='Note' name={[name, 'note']}>
                        <Input.TextArea />
                      </Form.Item>

                      <div style={{ borderBottom: name === fields.length - 1 ? 'none' : '1px dashed #a7a7a7' }} ></div>
                    </Space>
                  </div>
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
                    <i>You can add up to 5 recipient</i>
                  </div>
                )}


                <CustomizeModal visible={deleteModal} cancelText={"Yes"} okText={'No'} onOk={() => setDeleteModal(false)} onCancel={() => {
                  remove(deletename);
                  setDeleteModal(false)
                }}>
                  <div>Would you want to delete the recipient?</div>
                </CustomizeModal>

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

        {visible &&
          <AddFromAddressBook
            visible={visible}
            setVisible={setVisible}
            submit={selectedRecipientItem}
          />
        }
      </div>
    </Spin>
  )
}

export default FileStep2
