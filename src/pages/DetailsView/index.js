import React, { useState, useEffect } from 'react'
import { Breadcrumb, Form, Input, message, Select, Button, Space, Modal } from 'antd'
import { Link } from 'react-router-dom'
import CustomizeModal from '@/components/CustomizeModal'
import {
  cancelOrderApi,
  getOrderDateilsApi,
  getOrderIsCheckedApi,
  updateSenderAndRecipient,
} from '@/api/orders'
import FieldDom from '@/components/Field'
import './index.scss'
import { getAllCity } from '@/api/fileStep'
import { orderStatusEnums } from '@/helper/env'

function DetailsView(props) {
  const [form] = Form.useForm()

  const [trackingNumber, setTrackingNumber] = useState(null)
  const [orderDetail, setOrderDetail] = useState(null)
  const [allCity, setAllCity] = useState([])

  const [cancelVisible, setCancelVisible] = useState(false)
  const [cancelStatus, setCancelStatus] = useState(null)

  const [ModifyVisible, setModifyVisible] = useState(false)
  const [InformationType, setInformationType] = useState('Sender')
  const [SenderInformationObject, setSenderInformationObject] = useState({})

  useEffect(() => {
    let trackingNumber = props.match.params.id
    setTrackingNumber(trackingNumber)
    // get order detail
    getOrderDateils(trackingNumber)
    // get all select city list
    getAllCityList()
    //View order status
    getOrderISChecked(trackingNumber)
  }, [props.match.params.id])

  const getOrderDateils = (trackingNumber) => {
    getOrderDateilsApi({ trackingNumber: trackingNumber }).then((res) => {
      const { code, data } = res
      if (code === '200' && data?.order) {
        setOrderDetail(res?.data?.order)
      }
    })
  }
  const getAllCityList = () => {
    getAllCity().then((res) => {
      if (res.code === '200') {
        setAllCity(res.data.list)
      }
    })
  }
  const getOrderISChecked = (trackingNumber) => {
    getOrderIsCheckedApi({ trackingNumber }).then((res) => {
      const { data } = res
      if (data.canCancel === '0') {
        // can't cancel order
        setCancelStatus(false)
      } else if (data.canCancel === '1') {
        // can cancel order
        setCancelStatus(true)
      }
    })
  }

  const cancelOrder = () => {
    setCancelVisible(true)
  }

  const onCancel = () => {
    if (cancelStatus) {
      //  cancel order
      cancelOrderApi({ trackingNumber: trackingNumber }).then((res) => {
        const { code, data } = res
        if (code === '200' && data.msg) {
          message.success(data.msg)
          getOrderDateilsApi({ trackingNumber: trackingNumber }).then((res) => {
            setOrderDetail(res?.data?.order)
          })
        }
      })
    }
  }

  const onOk = () => {
    setCancelVisible(false)
  }

  const showModifyForm = () => {
    setModifyVisible(true)
    form.setFieldsValue(orderDetail.sender)
  }

  const senderNextToRecipient = () => {
    const sender = { senderId: orderDetail.sender.senderId, ...form.getFieldsValue() }
    setSenderInformationObject(sender)
    setInformationType('Recipient')
    form.setFieldsValue(orderDetail.recipient)
  }

  const onFishObject = (senderValue) => {
    const recipient = { recipientId: orderDetail.recipient.recipientId, ...form.getFieldsValue() }
    const params = { trackingNumber, sender: SenderInformationObject, recipient }
    updateSenderAndRecipient(params)
    setModifyVisible(false)
  }

  return (
    <div className='details'>
      <div className='container'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item>
            <Link to='/account'>My Account</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/orders'>My Orders</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Detail View</Breadcrumb.Item>
        </Breadcrumb>

        <div className='detail-notes'>
          <h3>Notes:</h3>
          <p>这里可以放一些规则说明，比如取消和修改快递的一些规则说明。 </p>
          <p>修改的规则： </p>
          <p>取消的规则：</p>
          {/* <div dangerouslySetInnerHTML={{ __html: data?.notes }}></div> */}
        </div>

        <div className='detail-orders'>
          <div className='order-title'>
            <div>
              <span style={{ borderRight: '1px solid #333', padding: '0 8px' }}>
                <b>Order Placed: </b>
                <span>{orderDetail?.orderPlaced || '--'}</span>
              </span>
              <span style={{ padding: '0 8px' }}>
                <b>Tracking Numb: </b>
                {orderDetail?.trackingNumber || '--'}
              </span>
            </div>

            {(orderDetail?.orderStatus === orderStatusEnums['Pending'] ||
              orderDetail?.orderStatus === orderStatusEnums['InTransit']) && (
              <div className='orders-cancel' onClick={cancelOrder}>
                Cancel
              </div>
            )}
          </div>

          {orderDetail?.orderStatus === orderStatusEnums['Canceled'] ? (
            <div className='order-cancel'>
              <div className='order-cancel-item'>
                <div className='order-cancel-box'>
                  <div className='cancel-status'>Canceled</div>
                  <div className='cancel-icon'></div>
                  <div className='cancel-content'>
                    <p>{orderDetail?.orderPlaced}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='order-steps'>
              <div
                className={`order-step-item ${
                  orderDetail?.orderStatus >= 1 ? 'order-step-fished' : null
                }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>Padding</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>
                    {orderDetail?.orderStatus === orderStatusEnums['Pending'] &&
                      'waiting to be received'}
                  </div>
                </div>
              </div>

              <div
                className={`order-step-item ${
                  orderDetail?.orderStatus >= 2 ? 'order-step-fished' : null
                }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>In transit</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>{/* this's content */}</div>
                </div>
              </div>

              <div
                className={`order-step-item ${
                  orderDetail?.orderStatus >= 3 ? 'order-step-fished' : null
                }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>Delivered</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>
                    {orderDetail?.orderStatus < 3 && (
                      <>
                        <p>Expected</p>
                        <p>{orderDetail?.expected}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='details-sender'>
          <div className='details-sender-title'>
            <span onClick={showModifyForm}>Modify</span>
          </div>

          <div className='sender-content'>
            <div className='sender-item'>
              <div className='sender-item-title'>Sender:</div>
              <div className='sender-item-content'>
                <p>
                  {orderDetail?.sender.firstName || '-'}&nbsp;
                  {orderDetail?.sender.lastName || '-'}
                </p>
                <p>{orderDetail?.sender.CompanyName}</p>
                <p>{orderDetail?.sender.address}</p>
                <p>{orderDetail?.sender.zipcode}</p>
                <p>{orderDetail?.sender.phone}</p>
                <p>{orderDetail?.sender.email}</p>
              </div>
            </div>
            <div className='sender-item'>
              <div className='sender-item-title'>Recipient:</div>
              <div className='sender-item-content'>
                <p>
                  {orderDetail?.recipient.firstName || '-'}&nbsp;
                  {orderDetail?.recipient.lastName || '-'}
                </p>
                <p>{orderDetail?.recipient.CompanyName}</p>
                <p>{orderDetail?.recipient.address}</p>
                <p>{orderDetail?.recipient.zipcode}</p>
                <p>{orderDetail?.recipient.phone}</p>
                <p>{orderDetail?.recipient.email}</p>
              </div>
            </div>
          </div>

          <div className='detail-payment'>
            <div>
              <div className='payment-item'>
                <span className='payment-item-title'>Payment method:</span>
                <span className='payment-item-content'>{orderDetail?.paymentMethod || '--'}</span>
              </div>
              <div className='payment-item'>
                <span className='payment-item-title'>Iterm:</span>
                <span className='payment-item-content'>{orderDetail?.item || '--'}</span>
              </div>
            </div>
            <div>
              <div className='payment-item'>
                <span className='payment-item-title'>Charges:</span>
                <span className='payment-item-content'>$ {orderDetail?.charges || '--'}</span>
              </div>
              <div className='payment-item'>
                <span className='payment-item-title'>Count:</span>
                <span className='payment-item-content'>{orderDetail?.count || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomizeModal
        width={'57%'}
        visible={cancelVisible}
        cancelText={cancelStatus ? <span style={{ color: '#ccc' }}>Yes</span> : null}
        onCancel={onCancel}
        okText={cancelStatus ? 'No' : 'Ok'}
        onOk={onOk}
      >
        <div>
          {cancelStatus ? (
            <p>
              Free cancellation within 30 minutes after placing an order. <br />
              Would you want to cancel this order?
            </p>
          ) : (
            <p>
              Sorry，you can't cancel the order now. If you need any help, please contact us.
              <br /> PH: 07 5649 8619 <br /> Office Hours: Monday – Friday 8:30am-5:00pm
            </p>
          )}
        </div>
      </CustomizeModal>

      <Modal
        centered
        width={'70%'}
        closable={false}
        visible={ModifyVisible && cancelStatus}
        cancelText={null}
        onCancel={() => {
          setModifyVisible(false)
          setInformationType('Sender')
          form.resetFields()
        }}
        okText={null}
        onOk={() => {
          setModifyVisible(false)
        }}
        footer={null}
      >
        {/* Weather information can be edit sender & recipient */}
        <div>
          <h3>{InformationType} Information</h3>

          <Form form={form} layout='vertical' onFinish={onFishObject}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, padding: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item
                    label='First Name'
                    name='firstName'
                    style={{ width: '45%' }}
                    rules={[{ required: true, message: <FieldDom /> }]}
                  >
                    <Input placeholder='First Name' />
                  </Form.Item>

                  <Form.Item
                    label='Last Name'
                    name='lastName'
                    style={{ width: '45%' }}
                    rules={[{ required: true, message: <FieldDom /> }]}
                  >
                    <Input placeholder='Last Name' name={['name', 'last']} />
                  </Form.Item>
                </div>

                <Form.Item
                  label='Email'
                  name='email'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                  label='Street Address'
                  name='address'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Street Address' />
                </Form.Item>

                <Form.Item
                  label='City'
                  name='cityCode'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Select disabled placeholder='Please Select'>
                    {allCity.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.cityCode}>
                          {item.cityName}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </div>

              <div style={{ flex: 1, padding: 30 }}>
                <Form.Item
                  label='Phone Number'
                  name='phone'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='email' />
                </Form.Item>

                <Form.Item
                  label='Company Name'
                  name='companyName'
                  // rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Company Name' />
                </Form.Item>

                <Form.Item
                  label='Apt/Suite/Other'
                  name='other'
                  // rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='Apt/Suite/Other' />
                </Form.Item>

                <Form.Item
                  label='ZIP Code'
                  name='zipcode'
                  rules={[{ required: true, message: <FieldDom /> }]}
                >
                  <Input placeholder='ZIP Code' />
                </Form.Item>
              </div>
            </div>

            <Form.Item style={{ textAlign: 'center' }}>
              {InformationType === 'Sender' && (
                <Button
                  type='primary'
                  style={{ width: 300, height: 56, fontSize: 25 }}
                  onClick={senderNextToRecipient}
                >
                  Next
                </Button>
              )}

              {InformationType === 'Recipient' && (
                <Space size='middle' className='recipient-button-group'>
                  <Button
                    type='primary'
                    className='fill-button-back'
                    onClick={() => {
                      setInformationType('Sender')
                      form.setFieldsValue(orderDetail.sender)
                    }}
                  >
                    Back
                  </Button>
                  <Button type='primary' className='fill-button-submit' htmlType='submit'>
                    Submit
                  </Button>
                </Space>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal
        centered
        width={'70%'}
        closable={false}
        visible={ModifyVisible && !cancelStatus}
        cancelText={null}
        onCancel={() => {
          setModifyVisible(false)
          setInformationType('Sender')
          form.resetFields()
        }}
        okText={null}
        onOk={() => {
          setModifyVisible(false)
        }}
        footer={null}
      >
        <div style={{ padding: 30 }}>
          <div>
            <p>
              Sorry, it's more than 30 minutes. You are not allowed to modify the order information.
              If you need any help, please contact us.
            </p>
            <p>PH: 07 5649 8619</p>
            <p>Office Hours: Monday – Friday 8:30am-5:00pm</p>
          </div>
          <div style={{ textAlign: 'right', paddingTop: 50 }}>
            <span
              onClick={() => {
                setModifyVisible(false)
              }}
              style={{
                display: 'inline-block',
                width: 80,
                height: 30,
                lineHeight: '30px',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
              }}
            >
              OK
            </span>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DetailsView
