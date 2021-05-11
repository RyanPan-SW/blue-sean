import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import userBook from '../../asset/userbook.png'
import AddFromAddressBook from '../AddFromAddressBook'
import { getCookie } from '@/helper/env'
import { setSenderApi, getSessionSender } from '@/api/fileStep'
import './index.scss'
import { connect } from 'react-redux'
import { setSenderAction } from '@/store/actions/fielStep'

const messageTitle = 'Please Enter.'

function FileStep1(props) {
  const { cityArray, setStep, history } = props

  const [visible, setVisible] = useState(false)
  const [sender, setSender] = useState({})

  useEffect(() => {
    const sessionid = sessionStorage.getItem('sessionid')
    if (sessionid) sessionToObtainSender(sessionid)
  }, [])

  const sessionToObtainSender = (sessionid) => {
    getSessionSender({ sessionid: sessionid }).then((res) => {
      if (res.code === '200') {
        setSender(res.data.sender || {})
      }
    })
  }

  const addFromAddressBook = () => {
    return getCookie('token') ? setVisible(true) : history.push('/login')
  }

  const setSenderInformation = (values) => {
    setSenderApi(values).then((res) => {
      if (res.code === '200') {
        sessionStorage.setItem('sessionid', res.data.sessionid)
        props.setSender(values)
        setStep(2)
      } else {
        message.error(res.errmsg)
      }
    })
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

      <Form
        layout='vertical'
        name='step1'
        className='step1-form'
        onFinish={setSenderInformation}
        initialValues={sender}
      >
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
              name='cityCode'
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
              ]}
            >
              <Input placeholder='Phone Number' />
            </Form.Item>

            <Form.Item label='Company Name' name='companyName'>
              <Input placeholder='Company Name' />
            </Form.Item>

            <Form.Item label='Apt/Suite/Other' name='other'>
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
          <Button type='primary' className='form-submit-button' htmlType='submit'>
            Confirm Address
          </Button>
        </Form.Item>
      </Form>

      <AddFromAddressBook visible={visible} setVisible={setVisible} />
    </div>
  )
}

const mapStateToProps = ({ fileStep }, ownProps) => {
  return {
    sender: fileStep.sender,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSender: () => {
      dispatch(setSenderAction)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileStep1)