import React from 'react'
import { Modal } from 'antd'
import './index.scss'

function CustomizeModal(props) {
  const {
    width = '60%',
    visible = false,
    okText = 'ok',
    onOk,
    cancelText = 'cancel',
    onCancel,
    footer,
    ...other
  } = props

  return (
    <Modal
      visible={visible}
      width={width}
      maskClosable
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
      footer={null}
      centered
      {...other}
    >
      <div className='cus-modal-body'>{props.children}</div>

      <div className='cus-modal-footer'>
        {footer ? (
          footer
        ) : (
          <>
            <span onClick={onCancel}>{cancelText}</span>
            <span onClick={onOk}>{okText}</span>
          </>
        )}
      </div>
    </Modal>
  )
}

export default CustomizeModal
