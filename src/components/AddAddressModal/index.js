import React from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { addNewAddress, updateAddress } from '@/api/address'

function AddressModal(props) {
  const [form] = Form.useForm()
  const { editType, visible, setVisible, data = {}, getAddressList } = props
  console.log('data', data)

  const onFinishAddress = (values) => {
    if (editType === 'add') {
      addNewAddress(values).then((res) => {
        const { code, data } = res
        if (code !== '200') {
          message.error(res.errmsg)
          return
        }
        if (code === '200') {
          message.success(data.msg)
          setVisible(false)
          getAddressList()
        }
      })
    }
    if (editType === 'edit') {
      updateAddress({ ...data, ...values }).then((res) => {
        const { code, data } = res
        if (code !== '200') {
          message.error(res.errmsg)
          return
        }
        if (code === '200') {
          message.success(data.msg)
          setVisible(false)
          getAddressList()
        }
      })
    }
  }

  return (
    <Modal
      destroyOnClose
      width={1100}
      centered
      title={'Add a New Address'}
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
      footer={null}
    >
      {/* <div className='add-modal-title'>Add a New Address</div> */}

      <Form
        form={form}
        layout='vertical'
        // initialValues={{
        //   firstName: data.firstName || null,
        //   lastName: data.lastName || null,
        //   email: data.email || null,
        //   address: data.address || null,
        //   cityCode: data.cityCode || null,
        //   phone: data.phone || null,
        //   companyName: data.companyName || null,
        //   other: data.other || null,
        //   zipcode: data.zipcode || null,
        // }}
        onFinish={onFinishAddress}
      >
        <div className='form-content'>
          <div className='form-column'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item
                label='First Name'
                name='firstName'
                style={{ width: '45%' }}
                initialValue={data.firstName}
                rules={[{ required: true, message: 'Please Enter' }]}
              >
                <Input placeholder='First Name' />
              </Form.Item>

              <Form.Item
                label='Last Name'
                name='lastName'
                style={{ width: '45%' }}
                rules={[{ required: true, message: 'Please Enter' }]}
              >
                <Input placeholder='Last Name' name={['name', 'last']} />
              </Form.Item>
            </div>

            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
              label='Street Address'
              name='address'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Street Address' />
            </Form.Item>

            <Form.Item
              label='City'
              name='cityCode'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='City' />
            </Form.Item>
          </div>

          <div className='form-column'>
            <Form.Item
              label='Phone Number'
              name='phone'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='email' />
            </Form.Item>

            <Form.Item
              label='Company Name'
              name='companyName'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Company Name' />
            </Form.Item>

            <Form.Item
              label='Apt/Suite/Other'
              name='other'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='Apt/Suite/Other' />
            </Form.Item>

            <Form.Item
              label='ZIP Code'
              name='zipcode'
              rules={[{ required: true, message: 'Please Enter' }]}
            >
              <Input placeholder='ZIP Code' />
            </Form.Item>
          </div>
        </div>

        <Form.Item label='Note' name='note'>
          <Input.TextArea />
        </Form.Item>

        <Form.Item className='form-submit'>
          <Button className='form-submit-button' type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddressModal
