import React, { useState, useEffect } from 'react'
import { Breadcrumb, Form, Input, Select, Button, Space, Modal } from 'antd'
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
import { getConfigContent } from '@/api/config'

function DetailsView(props) {
  const [form] = Form.useForm()

  const [trackingNumber, setTrackingNumber] = useState(null)
  const [orderDetail, setOrderDetail] = useState(null)
  const [allCity, setAllCity] = useState([])

  const [cancelVisible, setCancelVisible] = useState(false)
  const [cancelStatus, setCancelStatus] = useState(null)

  const [notes, setNotes] = useState(null)
  const [ModifyVisible, setModifyVisible] = useState(false)
  const [InformationType, setInformationType] = useState('Sender')
  const [SenderInformationObject, setSenderInformationObject] = useState({})

  useEffect(() => {
    let trackingNumber = props.match.params.id
    // get order notes
    getOrderNotes()
    setTrackingNumber(trackingNumber)
    // get order detail
    getOrderDateils(trackingNumber)
    // get all select city list
    getAllCityList()
    //View order status
    getOrderISChecked(trackingNumber)
  }, [props.match.params.id])

  const getOrderNotes = () => {
    getConfigContent({ code: 'ODV' }).then((res) => {
      const { code, data } = res
      if (code === '200') {
        setNotes(data.content)
      }/* else {} */
    })
  }
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
      if (data.canCancel === '1') {
        // can cancel order
        setCancelStatus(true)
      } else if (data.canCancel === '0') {
        // can't cancel order
        setCancelStatus(false)
      }
    })
  }


  const cancelOrder = () => {
    setCancelVisible(false)
  }

  const onOk = () => {
    if (cancelStatus) {
      //  cancel order
      cancelOrderApi({ trackingNumber: trackingNumber }).then((res) => {
        const { code } = res
        if (code === '200') {
          getOrderDateilsApi({ trackingNumber: trackingNumber }).then((res) => {
            setOrderDetail(res?.data?.order)
            setCancelVisible(false)
          })
        }
      })
    } else {
      setCancelVisible(false)
    }
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
    updateSenderAndRecipient(params).then((res) => {
      getOrderDateils(trackingNumber)
    })
    setModifyVisible(false)
  }

  const onCancelModal = () => {

    setModifyVisible(false)
    setInformationType('Sender')
    form.resetFields()
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

        {notes && (
          <div className='detail-notes'>
            <h3>Notes:</h3>
            <div className="notes" dangerouslySetInnerHTML={{ __html: notes }}></div>
          </div>
        )}

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
                <div className='orders-cancel' onClick={() => setCancelVisible(true)}>
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
                    <p>{orderDetail?.expected}</p>
                  </div>
                </div>
                <div className="order-cancel-desc">If there is a refund, we will refund the original route to your payment account within 2 working days.If you have any questions, please contact us. PH: 07 5649 8619
                  Office Hours: Monday – Friday 8:30am-5:00pm
                </div>
              </div>
            </div>
          ) : (
            <div className='order-steps'>
              {/* Unpaid */}
              {/* <div
                className={`order-step-item ${orderDetail?.orderStatus >= 1 ? 'order-step-fished' : null
                  }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>Unpaid</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>
                    {orderDetail?.orderStatus === orderStatusEnums['Unpaid'] &&
                      'Waiting for Bpay'}
                  </div>
                </div>
              </div> */}

              {/* Pending */}
              <div
                className={`order-step-item ${orderDetail?.orderStatus >= 1 ? 'order-step-fished' : null
                  }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>Pending</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>
                    {orderDetail?.orderStatus === orderStatusEnums['Pending'] &&
                      'Waiting to be received'}
                  </div>
                </div>
              </div>

              {/*In transit  */}
              <div
                className={`order-step-item ${orderDetail?.orderStatus >= 2 ? 'order-step-fished' : null
                  }`}
              >
                <div className='order-step-box'>
                  <div className='step-status'>In transit</div>
                  <div className='step-icon'></div>
                  <div className='step-line'></div>
                  <div className='step-content'>{/* this's content */}</div>
                </div>
              </div>

              {/* Delivered */}
              <div
                className={`order-step-item ${orderDetail?.orderStatus >= 3 ? 'order-step-fished' : null
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

              {orderDetail?.orderStatus === orderStatusEnums['Unpaid'] &&
                (<div>Because you use BPAY for payment, the exact delivery time may change.If you have any questions, please contact us. <br />PH: 07 5649 8619    Office Hours: Monday – Friday 8:30am-5:00pm</div>)}
            </div>
          )}
        </div>

        <div className='details-sender'>
          {![orderStatusEnums['Canceled'], orderStatusEnums['Delivered']].includes(orderDetail?.orderStatus) && (
            <div className='details-sender-title'>
              <span onClick={showModifyForm}>Modify</span>
            </div>
          )}

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
        width={710}
        visible={cancelVisible}
        cancelText={cancelStatus ? <span style={{ color: '#ccc' }}>Yes</span> : null}
        onCancel={cancelOrder}
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
              Sorry, it's more than 30 minutes. You can't cancel the order for free. If you need any help, please contact us.
              <br /> PH: 07 5649 8619
              <br /> Office Hours: Monday – Friday 8:30am-5:00pm
            </p>
          )}
        </div>
      </CustomizeModal>

      {/* Information modal */}
      <Modal
        centered
        width={710}
        closable={false}
        visible={ModifyVisible && cancelStatus}
        cancelText={null}
        onCancel={onCancelModal}
        okText={null}
        onOk={() => {
          setModifyVisible(false)
        }}
        footer={null}
        className="Information-modal"
      >
        {/* Weather information can be edit sender & recipient */}
        <div className="Information-body">
          <div className="Information-close" onClick={onCancelModal}></div>

          <h3>{InformationType} Information</h3>

          <Form form={form} layout='vertical' onFinish={onFishObject}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, paddingRight: 10 }}>
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
                  rules={[{ required: true, type: 'email', message: <FieldDom /> }]}
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

              <div style={{ flex: 1, paddingLeft: 10 }}>
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

            <Form.Item
              label='Note'
              name='Note'
              rules={[{ required: true, message: <FieldDom /> }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              {InformationType === 'Sender' && (
                <Button
                  type='primary'
                  className="Information-next"
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
        width={710}
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
              Sorry, it's more than 30 minutes. You are not allowed to modify the order information.If you need any help, please contact us.
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
    </div >
  )
}

export default DetailsView
