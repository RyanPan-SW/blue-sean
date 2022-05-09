/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Modal, Input, Button, Table, ConfigProvider, message } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { getSearchAddress } from '@/api/fileStep'
import './index.scss'

const { Search } = Input

function AddFromAddressBook(props) {
  const { visible, setVisible, submit } = props
  const [total, setTotal] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [tablePramas, setTablePramas] = useState({ pageIndex: 1, pageSize: 5, keyWord: null })
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState(null)
  const [selectedRows, setSelectedRows] = useState(null)

  useEffect(() => {
    searchAddress()
  }, [])

  const searchAddress = (value, event) => {
    const keyWord = value && value.replace(/(^\s*)|(\s*$)/, '')
    setTablePramas(Object.assign(tablePramas, { pageIndex: 1, keyWord: keyWord }))
    // const params = Object.assign(tablePramas, { keyWord: keyWord })
    getAddress(tablePramas)
  }

  const getAddress = (params) => {
    getSearchAddress(params).then((res) => {
      if (res.code === '200') {
        setTotal(res.data.total || 0)
        for (const item of res.data.data) {
          item.key = item.addressId
        }
        setDataSource(res.data.data || [])
      }
    })
  }

  const columns = [
    {
      with: '40%',
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (text, record, index) => {
        return (
          <div className='table-column'>
            <p>
              {`${record.firstName}  ${record.lastName}`}&nbsp;&nbsp;
              {record.isDefault === '0' && <span className='default'>Default</span>}
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
          <div>
            <p>
              {record.address}&nbsp;
              {record.other}
            </p>
            <p>{record.cityName}</p>
            <p>{record.zipcode}</p>
          </div>
        )
      },
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows, ...other) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    },
  }

  // const onSelectedRowKeysChange = (selectedRowKeys) => {
  //   setSelectedRowKeys(selectedRowKeys)
  // }

  const submitAddressBook = () => {
    if (!selectedRowKeys || selectedRowKeys.length === 0) {
      message.error('Please Select.')
    } else {
      submit(selectedRows[0], selectedRowKeys)
    }
  }

  const customizeRenderEmpty = () => (
    //这里面就是我们自己定义的空状态
    <div style={{ textAlign: 'center', height: 300 }}>
      <p style={{ padding: '120px 0px' }}>No results were found. Please try other searches.</p>
    </div>
  )

  const changePageSize = (index, size) => {
    // setTablePramas({ pageSize: size, pageIndex: index })
    setTablePramas(Object.assign(tablePramas, { pageSize: size, pageIndex: index }))
    getAddress(Object.assign(tablePramas, { pageSize: size, pageIndex: index }))
  }

  return (
    <Modal
      destroyOnClose
      width={1100}
      centered
      title={<br />}
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
      closable
      footer={null}
      wrapClassName="Add-from-address-book"
    >
      <div className='form-modal-body'>
        <div className='title-search'>
          <div className='select-from-your-address-book'>Select From Your Address Book</div>
          <Search
            className='search'
            enterButton='Search'
            placeholder='Search contacts for a person'
            onSearch={searchAddress}
          />
        </div>

        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <Table
            rowClassName='table-row'
            rowSelection={{
              type: 'radio',
              // selectedRowKeys,
              // onChange: onSelectedRowKeysChange,
              ...rowSelection,
            }}
            dataSource={dataSource}
            columns={columns}
            pagination={{
              total: total,
              current: tablePramas.pageIndex,
              pageSize: tablePramas.pageSize,
              itemRender: itemRender,
              onChange: changePageSize
            }}
          />
        </ConfigProvider>

        {dataSource.length > 0 && (
          <Button className='form-submit' onClick={submitAddressBook}>
            Submit
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default AddFromAddressBook

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return (
      <>
        <span>Previous</span>
        <LeftOutlined style={{ width: 8, height: 14, marginLeft: 15 }} />
      </>
    )
  }
  if (type === 'next') {
    return (
      <>
        <RightOutlined style={{ width: 8, height: 14, marginRight: 15 }} />
        <span>Next</span>
      </>
    )
  }
  return originalElement
}
