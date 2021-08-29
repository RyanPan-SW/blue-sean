import React, { useEffect, useState } from 'react'
import { Modal, Input, Button, Table, ConfigProvider } from 'antd'
import './index.scss'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { getSearchAddress } from '@/api/fileStep'

const { Search } = Input

function AddFromAddressBook(props) {
  const { visible, setVisible, submit } = props
  const [total, setTotal] = useState(0)
  const [dataSource, setDataSource] = useState([])
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState(null)
  const [selectedRows, setSelectedRows] = useState(null)

  useEffect(() => {
    visible && searchAddress()
  }, [visible])

  const searchAddress = (value, event) => {
    const keyWord = value && value.replace(/(^\s*)|(\s*$)/, '')
    const params = { pageIndex: 0, pageSize: 10, keyWord: keyWord }
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
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    },
  }

  // const onSelectedRowKeysChange = (selectedRowKeys) => {
  //   setSelectedRowKeys(selectedRowKeys)
  // }

  const submitAddressBook = () => {
    submit(selectedRows[0], selectedRowKeys)
  }

  const customizeRenderEmpty = () => (
    //这里面就是我们自己定义的空状态
    <div style={{ textAlign: 'center', height: 300 }}>
      <p style={{ paddingTop: 150 }}>No results were found. Please try other searches.</p>
    </div>
  )

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
            pagination={{ total: total, pageSize: 10, pageSizeOptions: 10, itemRender: itemRender }}
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
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a style={{ display: 'flex', alignItems: 'center' }}>
        <span>Previous</span>
        <LeftOutlined style={{ width: 8, height: 14, marginLeft: 15 }} />
      </a>
    )
  }
  if (type === 'next') {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a style={{ display: 'flex', alignItems: 'center' }}>
        <RightOutlined style={{ width: 8, height: 14, marginRight: 15 }} />
        <span>Next</span>
      </a>
    )
  }
  return originalElement
}
