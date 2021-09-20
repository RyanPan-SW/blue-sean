import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, message, Table, Form } from 'antd'
import AddressModal from '@/components/AddAddressModal'
import * as UserActionCreator from '@/store/actions/counter'
import { getAddressPagination, setDefaultAddress, deleteAddress } from '@/api/address'
import './index.scss'
import { getCookie } from '@/helper/env'

function AddressBook(props) {
  const [form] = Form.useForm()

  const [data, setData] = useState([])
  const [visibleAdd, setVisible] = useState(false)
  const [total, setTotal] = useState(0)
  const [modalType, setModalType] = useState('add')
  const [addressId, setAddressId] = useState(null)

  useEffect(() => {
    getAddressList()
  }, [])

  const getAddressList = () => {
    if (getCookie('token')) {
      getAddressPagination({ pageIndex: 0, pageSize: 10 /* , keyWord: '' */ }).then((res) => {
        const { code, data } = res
        if (code === '200') {
          setData(data.data || [])
          setTotal(data.total || 0)
        }
      })
    }
  }

  const addModal = (record) => {
    setVisible(true)
    form.resetFields()
    setModalType('add')
  }

  const editModal = (record) => {
    setVisible(true)
    form.setFieldsValue(record)
    setAddressId(record.addressId)
    setModalType('edit')
  }

  const clickSetDefault = (id) => {
    setDefaultAddress({ addressId: id }).then((res) => {
      if (res.code === '200') {
        message.success(res.data.msg)
        getAddressList()
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
  const onCancel = () => {
    setVisible(false)
  }

  const columns = [
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (text, record, index) => {
        return (
          <div className='table-column'>
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
        return <div className='table-column'>{text}</div>
      },
    },
    {
      title: 'Operate',
      key: 'operate',
      dataIndex: 'operate',
      render: (text, record, index) => (
        <div className='table-column'>
          {record.isDefault === '0' ? (
            <p
              className='edit'
              onClick={() => {
                clickSetDefault(record.addressId)
              }}
            >
              Cancel as default address
            </p>
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
      <div className='address container'>
        <div className=''>
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
              rowClassName={(record, index) =>
                record.isDefault === '0' ? 'column-default' : 'table-column'
              }
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
        form={form}
        id={addressId}
        type={modalType}
        className='add-address-modal'
        getAddressList={getAddressList}
        onCancel={onCancel}
        visible={visibleAdd}
      />
    </div>
  )
}
// export default AddressBook
const mapStateToProps = ({ address }, ownProps) => {
  return {
    currentDate: address.currentDate,
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     dispatch1: () => {
//       dispatch(actionCreator)
//     },
//   }
// }

export default connect(mapStateToProps, UserActionCreator)(AddressBook)
