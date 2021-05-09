import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, message, Table } from 'antd'
import './index.scss'
import { getAddressPagination, setDefaultAddress, deleteAddress } from '@/api/address'
import AddressModal from '@/components/AddAddressModal'

function AddressBook(props) {
  const [data, setData] = useState([])
  const [visibleAdd, setVisible] = useState(false)
  const [total, setTotal] = useState(0)
  const [currentDate, setCurrentDate] = useState({})
  const [editType, setEditType] = useState('add')

  useEffect(() => {
    getAddressList()
  }, [])

  const getAddressList = () => {
    getAddressPagination({ pageIndex: 0, pageSize: 10 /* , keyWord: '' */ }).then((res) => {
      const { code, data } = res
      if (code === '200') {
        setData(data.data || [])
        setTotal(data.total || 0)
      }
    })
  }

  const addModal = (record) => {
    setVisible(true)
    setCurrentDate({}, () => {
      setEditType('add')
    })
  }

  const editModal = (record) => {
    setVisible(true)
    setEditType('edit')
    setCurrentDate(record)
  }

  const clickSetDefault = (id) => {
    setDefaultAddress({ addressId: id }).then((res) => {
      if (res.code === '200') {
        message.success(res.data.msg)
      }
    })
  }

  const removeAddress = (id) => {
    deleteAddress({ addressId: id }).then((res) => {
      if (res.code === '200') {
        message.success(res.data.msg)
        getAddressList()
      }
    })
  }

  const columns = [
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (text, record, index) => {
        return (
          <div className={record.isDefault === '0' ? 'column-default' : 'table-column'}>
            <p>
              {record.firstName}&nbsp;
              {record.lastName}
            </p>
            <p>{record.phone}</p>
            <p>{record.email}</p>
          </div>
        )
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record, index) => {
        return (
          <div className={record.isDefault === '0' ? 'column-default' : 'table-column'}>{text}</div>
        )
      },
    },
    {
      title: 'Operate',
      key: 'operate',
      dataIndex: 'operate',
      render: (text, record, index) => (
        <div className={record.isDefault === '0' ? 'column-default' : 'table-column'}>
          {record.isDefault === '0' ? (
            <p className='edit'>Cancel as default address</p>
          ) : (
            <p
              className='edit'
              onClick={() => {
                clickSetDefault(record.addressId)
              }}
            >
              Set as default address
            </p>
          )}
          <p
            className='edit'
            onClick={() => {
              editModal(record)
            }}
          >
            Edit
          </p>
          <p
            className='edit'
            onClick={() => {
              removeAddress(record.addressId)
            }}
          >
            Remove
          </p>
        </div>
      ),
    },
  ]

  return (
    <div style={{ background: '#FFF' }}>
      <div className='container'>
        <div className='address'>
          <Breadcrumb separator='>'>
            <Breadcrumb.Item>
              <Link to='/account'>My Account</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Address Book</Breadcrumb.Item>
          </Breadcrumb>

          <h3 className='h4-title'>Address Book</h3>

          {data.length > 0 ? (
            <Table
              bordered
              className='address-table'
              columns={columns}
              dataSource={data}
              pagination={{
                total: total,
                pageSize: 10,
                pageSizeOptions: 10,
                showSizeChanger: false,
              }}
              // onHeaderRow={(columns, index) => {
              //   console.log('=====', columns, index)
              // }}
              footer={() => (
                <div className='table-footer' onClick={addModal}>
                  + Add a New Address
                </div>
              )}
            />
          ) : (
            <p className='empy-address'>
              You have not added any addresses yet.{' '}
              <span className='add-new' onClick={addModal}>
                Add a New Address
              </span>
            </p>
          )}
        </div>
      </div>

      <AddressModal
        data={currentDate}
        editType={editType}
        getAddressList={getAddressList}
        setVisible={setVisible}
        visible={visibleAdd}
      />
    </div>
  )
}
export default AddressBook
