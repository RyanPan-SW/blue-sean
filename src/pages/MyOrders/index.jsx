import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderDetailEnums } from '@/helper/env'
import CustomizeModal from '@/components/CustomizeModal'
import { getOrdersListApi } from '@/api/orders'
import { Input, Tabs, Breadcrumb, Popover, Pagination } from 'antd'
import './index.scss'

const { TabPane } = Tabs
const { Search } = Input
const tabsList = [
  {
    key: 1,
    tabTitle: 'Orders',
  },
  {
    key: 2,
    tabTitle: 'Open Orders',
  },
  {
    key: 3,
    tabTitle: 'Completed orders',
  },
]

function MyOrder(params) {
  const [ordersdata, setOrdersdata] = useState([])
  const [tablePramas, setTablePramas] = useState({ pageSize: 15, pageIndex: 1 /* , keyWord: '' */ })
  const [ordertotal, setOrderTotal] = useState(0)
  const [visible, setVisible] = useState(false)
  const [tabsKey, setTabsKey] = useState('1')
  const [searchValue, setsearchValue] = useState('')

  useEffect(() => {
    getOrdersList({
      pageIndex: tablePramas.pageIndex,
      pageSize: tablePramas.pageSize,
      keyWord: null,
      orderTab: null,
    })
  }, [tablePramas.pageIndex, tablePramas.pageSize])

  const getOrdersList = (parmas) => {
    getOrdersListApi(parmas).then((res) => {
      const { code, data } = res
      if (code === '200' && data.data) {
        if (data.data.length > 0) {
          setOrdersdata(data.data || [])
          setOrderTotal(data.total)
        }
        if (data.data.length === 0) setVisible(true)
      } else {
        setVisible(false)
      }
    })
  }

  const onCancel = () => {
    setVisible(false)
  }

  const onSearchOrders = (value, e) => {
    const orderTab = Number(tabsKey) === 1 ? null : `0${tabsKey - 1}`
    getOrdersList({
      pageIndex: tablePramas.pageIndex,
      pageSize: tablePramas.pageSize,
      keyWord: value,
      orderTab: orderTab,
    })
  }

  const changeTabs = (activeKey) => {
    setTabsKey(activeKey)
    const orderTab = Number(activeKey) === 1 ? null : `0${activeKey - 1}`
    // getOrdersList({pageIndex: tablePramas.pageIndex,pageSize: tablePramas.pageSize,keyWord: null,orderTab: orderTab})
    getOrdersListApi({
      pageIndex: tablePramas.pageIndex,
      pageSize: tablePramas.pageSize,
      keyWord: null,
      orderTab: orderTab,
    }).then((res) => {
      const { code, data } = res
      if (code === '200' && data.data) {
        // if (data.data.length > 0) {
        setOrdersdata(data.data || [])
        setOrderTotal(data.total)
        // }
        // if (data.data.length === 0) setVisible(true)
      }
    })
  }

  const changePageSize = (index, pageSize) => {
    setTablePramas({ pageSize: pageSize, pageIndex: index })
    getOrdersList({
      pageIndex: index,
      pageSize: pageSize,
      keyWord: null,
      orderTab: Number(tabsKey) === 1 ? null : `0${tabsKey - 1}`,
    })
  }

  const foucsSreachOrder = () => {
    setsearchValue('')
  }
  const changeSearchOrder = (e) => {
    setsearchValue(e.target.value)
  }

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <span className='Previous'>Previous</span>
    }
    if (type === 'next') {
      return <span className='Next'>Next</span>
    }
    return originalElement
  }

  return (
    <div className='order-content'>
      <div className='container'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item>
            <Link className='breadcrumb-link' to='/account'>
              My Account
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>My Orders</Breadcrumb.Item>
        </Breadcrumb>

        <div className='order-top'>
          <div className='order-title'>My Orders</div>

          <Search
            loading={false}
            value={searchValue}
            onFocus={foucsSreachOrder}
            onChange={changeSearchOrder}
            className='order-search'
            enterButton='Search Orders'
            placeholder='Search for the recipient or tracking number'
            onSearch={onSearchOrders}
          />
        </div>

        <h4 className='order-subTitle'>Modify or Cancel Pickups</h4>

        <p className='order-dication'>
          You can modify a scheduled pickup at any time by changing the pickup date, pickup location
          and receiving location, or you can cancel the pickup. Click a pickup in your list of
          orders to view details and make changes.
        </p>

        <Tabs defaultActiveKey='1' tabBarStyle={{ color: '#333' }} onChange={changeTabs}>
          {tabsList.map((item, index) => {
            return (
              <TabPane tab={item.tabTitle} key={item.key}>
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
                                    item.orderStatus === '01' || item.orderStatus === '04'
                                      ? 'colorbcbc'
                                      : 'color666'
                                  }
                                >
                                  {orderDetailEnums[item.orderStatus]}
                                </div>
                              </div>
                              <div className='list-to'>
                                <p>{LengthLimit(item.recipientCity, 25)}</p>
                                <p>{LengthLimit(item.recipientName, 25)}</p>
                              </div>
                            </div>

                            <Link
                              target='_blank'
                              to={'/detailsview/' + item.trackingNumber}
                              className='list-details'
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      )
                    })}

                    <Pagination
                      style={{ textAlign: 'right', paddingTop: 30 }}
                      current={tablePramas.pageIndex}
                      pageSize={tablePramas.pageSize}
                      itemRender={itemRender}
                      total={ordertotal}
                      onChange={changePageSize}
                    />
                  </div>
                ) : (
                  <p className='empy-order-list'>
                    You have not placed any orders in.{' '}
                    <b>
                      <Link to='/filestep/add' className='new-pickup'>
                        Schedule a New Pickup
                      </Link>
                    </b>
                  </p>
                )}
              </TabPane>
            )
          })}
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
