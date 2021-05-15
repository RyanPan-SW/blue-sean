import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { enumsOrderStatus } from '@/helper/env'
import CustomizeModal from '@/components/CustomizeModal'
import { getOrdersListApi, searchOrder } from '@/api/orders'
import { Input, Tabs, Breadcrumb, Popover, Pagination } from 'antd'
import './index.scss'

const { TabPane } = Tabs
const { Search } = Input
const orderStatus = {
  all: null,
  open: '01',
  completed: '02',
}

function MyOrder(params) {
  const [ordersdata, setOrdersdata] = useState([])
  // const [listtotal, setListTotal] = useState(0)
  const [visible, setVisible] = useState(false)
  const [tabsKey, setTabsKey] = useState('1')

  useEffect(() => {
    getOrdersList({ pageIndex: 0, pageSize: 10, keyWord: null, orderTab: null })
  }, [])

  const getOrdersList = ({ pageIndex = 0, pageSize = 10, keyWord = null, orderTab = null }) => {
    getOrdersListApi({ pageIndex, pageSize, keyWord, orderTab }).then((res) => {
      const { code } = res
      if (code === '200' && res.data.data) {
        setOrdersdata(res.data.data)
      } else {
        setVisible(true)
      }
    })
  }

  const onCancel = () => {
    setVisible(false)
  }

  const onSearchOrders = (value, e) => {
    getOrdersList({ pageIndex: 0, pageSize: 10, keyWord: value, orderTab: `0${tabsKey - 1}` })
  }

  const changeTabs = (activeKey) => {
    setTabsKey(activeKey)
    const orderTab = `0${activeKey - 1}`
    getOrdersList({ pageIndex: 0, pageSize: 10, keyWord: null, orderTab: orderTab })
  }

  const changePageSize = (page, pageSize) => {
    getOrdersList({
      pageIndex: page,
      pageSize: pageSize,
      keyWord: null,
      orderTab: `0${tabsKey - 1}`,
    })
  }

  return (
    <div className='order-content'>
      <div className='container'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item>
            <Link to='/account'>My Account</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>My Orders</Breadcrumb.Item>
        </Breadcrumb>

        <div className='order-top'>
          <div className='order-title'>My Orders</div>

          <Search
            className='order-search'
            enterButton='Search Orders'
            placeholder='Search for the recipient or tracking number'
            onSearch={onSearchOrders}
          />
        </div>

        <h4 className='order-subTitle'>Modify or Cancel Pickups</h4>

        <p>
          You can modify a scheduled pickup at any time by changing the pickup date, pickup location
          and receiving location, or you can cancel the pickup. Click a pickup in your list of
          orders to view details and make changes.
        </p>

        <Tabs defaultActiveKey='1' tabBarStyle={{ color: '#333' }} onChange={changeTabs}>
          <TabPane tab='Orders' key='1'>
            {ordersdata?.length > 0 ? (
              <div>
                {ordersdata.map((item, index) => {
                  return (
                    <div className='ordersList' key={index}>
                      <div className='list-title'>Tracking number: {item.trackingNumber}</div>
                      <div className='list-content'>
                        <div className='list-news'>
                          <div className='list-from'>
                            <p>{LengthLimit(item.senderCity, 25)}</p>
                            <p>{LengthLimit(item.senderName, 25)}</p>
                          </div>
                          <div className='list-status'>
                            <div>
                              <i className='list-status-icon'></i>
                              <i className='list-status-icon'></i>
                              <i className='list-status-icon'></i>
                              <i className='list-status-icon'></i>
                              <i className='list-status-icon'></i>
                            </div>
                            <div
                              className={
                                item.orderStatus === 1 || item.orderStatus === 4
                                  ? 'colorbcbc'
                                  : 'color666'
                              }
                            >
                              {enumsOrderStatus[item.orderStatus]}
                            </div>
                          </div>
                          <div className='list-to'>
                            <p>{LengthLimit(item.recipientCity, 25)}</p>
                            <p>{LengthLimit(item.recipientName, 25)}</p>
                          </div>
                        </div>

                        <Link to={'/detailsview/' + item.trackingNumber} className='list-details'>
                          View Details
                        </Link>
                      </div>
                    </div>
                  )
                })}

                {ordersdata.total > 15 && (
                  <Pagination
                    style={{ textAlign: 'right', paddingTop: 30 }}
                    defaultCurrent={1}
                    // defaultPageSize={15}
                    pageSize={15}
                    total={ordersdata?.total || 0}
                    onChange={changePageSize}
                  />
                )}
              </div>
            ) : (
              <p className='empy-order-list'>
                You have not placed any orders in.{' '}
                <Link to='/filestep/add' className='new-pickup'>
                  Schedule a New Pickup
                </Link>
              </p>
            )}
          </TabPane>

          <TabPane tab='Open Orders' key='2'>
            <div className='order-nothing'>
              You have not placed any orders in. <b>Schedule a New Pickup</b>
            </div>
          </TabPane>

          <TabPane tab='Completed orders' key='3'>
            <div className='order-nothing'>
              You have not placed any orders in. <b>Schedule a New Pickup</b>
            </div>
          </TabPane>
        </Tabs>
      </div>

      <CustomizeModal visible={visible} cancelText={null} onCancel={onCancel} onOk={onCancel}>
        <div>
          <p>No results were found. Please try other searches.</p>
        </div>
      </CustomizeModal>
    </div>
  )
}
export default MyOrder

function LengthLimit(str, number) {
  if (typeof str == 'string') {
    if (str.length > number) {
      return <Popover content={str}>{`${str.substr(0, number)}...`}</Popover>
    } else {
      return str
    }
  } else {
    return ''
  }
}
