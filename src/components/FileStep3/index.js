import React, { useState, useEffect } from 'react'
import { Radio, Space, Checkbox, Button, Input, Form, Modal, Tooltip, message, Spin, Row, Col, } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { getDayOrTime, getOptionalTime, methodOfPayment } from '@/api/fileStep'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import visa from '../../asset/visa.png'
import doubt from '../../asset/doubt.png'
import lock from '../../asset/lock.png'
import Bpay from '../../asset/bpay.png'
import Tanhao from '../../asset/tanhao.png'
import classnames from 'classnames'
import LoadingSubmit from '../LoadingSubmit'
import './index.scss'

const paymentEmnu = {
  visa: '01', corporate: '02', bpay: '03',
}

function FileStep3({ recipient = [], cityArray, getPayOrder, setStep }) {
  const [form] = Form.useForm();
  const [loadingTime, setLoadingTime] = useState(false)
  const [payment, setPayment] = useState(null)
  const [datelist, setDatelist] = useState([])
  const [activeDay, setActiveDay] = useState(null)
  const [activeTime, setActiveTime] = useState(null)
  const [paydata, setPaydata] = useState(null)
  const [PaypalModal, setPaypalModal] = useState(false)
  const [phoneHomeRequired, setPhoneHomeRequired] = useState(true)
  const [phoneMobileRequired, setPhoneMobileRequired] = useState(true)
  const [phoneHome, setPhoneHome] = useState(true)
  const [phoneMobile, setPhoneMobile] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoadingTime(true)
    getOptionalTime().then(({ code, data }) => {
      if (code === '200' && data.dateList) {
        for (const item of data.dateList) {
          const [day, month, year] = item.date.split('/')
          item.day = day
          item.month = month
          item.year = year
        }
        setDatelist(data.dateList)
        setLoadingTime(false)
      }
    }).catch((error) => {
      message.error(error)
      setLoadingTime(false)
    })
  }, [])

  const isToday = ({ year, month, day }) => {
    let time = `${year}-${month}-${day}`
    return dayjs().isSame(dayjs(time), 'day')
  }

  const selectTime = (data, index) => {
    const { time } = data
    setActiveTime(index)
    const params = { date: datelist[activeDay].date, time: time }
    getDayOrTime(params).then((res) => {
      const { code, data } = res
      if (code === '200' && !data.msg) {
        setPaydata(data)
        form.setFieldsValue({ payment: data })
      }
    }).catch(err => {
      message.error(err)
    })
  }

  const handleSetDay = (item, index) => {
    selectTime(item, index)
    form.setFieldsValue({ paydata: item.time })
  }

  const changePhone = (event) => {
    let phoneHome = form.getFieldValue('phoneHome')
    let phoneMobile = form.getFieldValue('phoneMobile')
    if (!phoneHome && !phoneMobile) {
      setPhoneHome(false)
      setPhoneHomeRequired(false)
      setPhoneMobile(false)
      setPhoneMobileRequired(false)
    } else {
      setPhoneHome(true)
      setPhoneHomeRequired(false)
      setPhoneMobile(true)
      setPhoneMobileRequired(false)
    }
  }
  const changeMobile = (event) => {
    if (event.target.value) {
      setPhoneHomeRequired(false)
      setPhoneHome(true)
      setPhoneMobile(true)
    } else {
      setPhoneHomeRequired(true)
    }
  }

  const onChangePayment = (e) => {
    setPayment(e.target.value)
    localStorage.setItem('payType', e.target.value)
  }



  const phoneDom = (
    <div className='phone-tip'>
      <ExclamationCircleFilled
        style={{
          color: !form.getFieldValue('phoneHome') && !form.getFieldValue('phoneMobile') ? '#ff4d4f' : '#0113B3',
          marginRight: 6,
        }}
      />
      <span style={{ color: !form.getFieldValue('phoneHome') && !form.getFieldValue('phoneMobile') ? '#ff4d4f' : '#0113B3' }}>
        At least one phone number is required.
      </span>
    </div>
  )


  const onFinish = (values) => {
    setLoading(true)
    const { firstName, lastName, email, phoneHome, phoneMobile, companyName, companyAddress, paymentCode, payType } = values
    let params = { firstName, lastName, email, phoneHome, phoneMobile, companyName, companyAddress, paymentCode, payType }

    methodOfPayment(params).then((res) => {
      setLoading(false)
      getPayOrder(res)
    }).catch(err => {
      message.error(err)
    })
  }

  return (
    <Spin spinning={loadingTime}>
      <div className='step3'>
        <div className='step3-title'>Step3: Appointment information</div>

        <Form name="name" form={form} onFinish={onFinish} scrollToFirstError>
          <Form.Item name="paydata" rules={[{ required: true, message: 'Please choose the delivery time.' }]}>
            <Row className='step3-item'>
              <Col span={4}><div className='step3-decribe'>Delivery Time</div></Col>
              <Col span={20} className='step-content'>
                <div className='step-content-time'>
                  {datelist?.map((item, index) => {
                    return (
                      <div
                        key={item.date}
                        className={activeDay === index ? 'time-active' : 'time-box'}
                        onClick={() => setActiveDay(index)}
                      >
                        {isToday(item) ? (
                          <span>
                            <p style={{ lineHeight: '25px' }}>{item.date}</p>
                            <p className='today'>Today</p>
                          </span>
                        ) : (
                          <p style={{ lineHeight: '50px' }}>{item.date}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className='step-delivered'>
                  {(datelist[activeDay]?.timeList || []).map((item, index) => {
                    if (item.enable === '1') {
                      return (
                        <div
                          key={index}
                          className={classnames({ 'delivered-time': true, 'delivered-active': activeTime === index })}
                          onClick={() => handleSetDay(item, index)}
                        >
                          {item.title}
                        </div>
                      )
                    } else {
                      return (
                        <s key={index} className='disabled-time'>
                          {item.title}
                        </s>
                      )
                    }
                  })}
                </div>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name="payment" rules={[{ required: true, message: 'Please choose the delivery time.' }]}>
            <Row className='step3-item'>
              <Col span="4"><div className='step3-decribe'>Charge</div></Col>
              <Col span="20">
                <div className='step-charge'>
                  <p>{paydata ? `$${paydata?.total || '0.00'}` : 'Please choose the time first.'}</p>
                  {paydata?.total && (
                    <span className='step3-charge-tip'>
                      If you use corporate payment, you only have to pay $6.
                    </span>
                  )}
                </div>
              </Col>
            </Row>
          </Form.Item>
          <Row className='step3-item'>
            <Col span="4"><div className='step3-decribe'>Payment Method</div></Col>
            <Col span={20} className='suc-content'>
              <Row type="flex" gutter={20}>
                <Col span="6">
                  <Form.Item
                    label='First Name'
                    name='firstName'
                    messageVariables={{ another: 'good' }}
                    rules={[{ required: true, message: 'Please Enter.', },]}
                  >
                    <Input />
                  </Form.Item>

                </Col>
                <Col span="6">
                  <Form.Item
                    label='Last Name'
                    name='lastName'
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter.',
                      },
                    ]}
                  >
                    <Input placeholder='' />
                  </Form.Item>
                </Col>
                <Col span="12">
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Please Enter.',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Phone (home)'
                    name='phoneHome'
                    validateStatus={phoneHome ? 'validating' : 'error'}
                    rules={[{ required: false, message: 'Please Enter.', }]}
                  >
                    <Input onChange={changePhone} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Phone (mobile)'
                    name='phoneMobile'
                    extra={phoneDom}
                    validateStatus={phoneMobile ? 'validating' : 'error'}
                    rules={[{ required: false, message: 'Please Enter.' }]}
                  >
                    <Input onChange={changePhone} />
                  </Form.Item>
                </Col>
                <Col span={12}>

                  <Form.Item
                    label='Company name'
                    name='companyName'
                    rules={[{ required: false, message: 'Please Enter.', }]}
                  >
                    <Input />
                  </Form.Item>

                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Company address'
                    name='companyAddress'
                    rules={[{ required: false, message: 'Please Enter.' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name="payType" rules={[{ required: true, message: 'Please choose the payment method.', }]}>
                    <Radio.Group onChange={onChangePayment}>
                      <Space direction='vertical' size='large'>
                        <Radio value={paymentEmnu['corporate']}>
                          <span>Corporate payment</span>

                          {payment === paymentEmnu['corporate'] && (
                            <div className='step3-corporate-form'>
                              <Form.Item
                                label='Corporate Payment Code'
                                name='paymentCode'
                                rules={[{ required: true, message: 'Please Enter.' }]}
                              >
                                <Input />
                              </Form.Item>
                            </div>
                          )}
                        </Radio>

                        <Radio value={paymentEmnu['bpay']}>
                          {/* <img src={Bpay} alt='' /> */}
                          <span>Bank transfer</span>

                          {payment === paymentEmnu['bpay'] && (
                            <div className='step3-bpay-div'>
                              <div className='step3-bpay-icon'>
                                <img src={Tanhao} alt='' />
                              </div>
                              <div className='step3-bpay-dirscrbe'>
                                To pay by bank transfer, you will receive your invoice by email.
                                <br />
                                Please transfer the payment to the bank account indicated in the invoice within 30<br />
                                minutes and reply the email with receipt of remittance.
                              </div>
                            </div>
                          )}
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Form.Item
            className='step-agree'
            style={{ paddingTop: payment === 2 ? 55 : 180 }}
            name='agree'
            valuePropName='checked'
            // rules={[{ required: true, message: 'Please agree contract terms' }]}
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Please agree contract terms.'))
              }
            ]}
          >
            <Checkbox>
              <span className='agree'>I agree</span>
              <Link to='/website' target="_blank" className='contract'>
                Terms of Use
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item className='button-group'>
            <Button type='primary' className='button-back' onClick={() => setStep(2)}>
              Back
            </Button>

            <Button
              type='primary'
              className='button-pay'
              htmlType='submit'
            >
              {/* Pay Now */}
              {loading ? <LoadingSubmit /> : 'Pay Now'}
            </Button>
          </Form.Item>
        </Form>

        <Modal visible={PaypalModal} centered closable={false} footer={null}>
          <p>
            Please pay in the newly opened payment platform page. Please do not close this window
            until you have completed the payment.
          </p>

          <div className='paypal-modal-footer'>
            <Button
              onClick={() => {
                setPaypalModal(false)
              }}
              type='primary'
              className='paypal-modal-cancel'
            >
              Change payment method
            </Button>
            <Button
              onClick={() => {
                setPaypalModal(false)
              }}
              type='primary'
              className='paypal-modal-ok'
            >
              Completed payment
            </Button>
          </div>
        </Modal>
      </div >
    </Spin >
  )
}

export default FileStep3
