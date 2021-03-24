import React from 'react'
import { Modal } from 'antd'

function CUstomizeModal(props) {
  const { visible = false, ...other } = props

  return (
    <Modal visible={visible} closable={false} footer={null} centered {...other}>
      {props.children}
    </Modal>
  )
}

export default CUstomizeModal
