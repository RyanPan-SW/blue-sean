import React, { useState } from 'react'
import { Collapse } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import './index.scss'

const { Panel } = Collapse
const helpList = [
  { title: '1111', dircetion: '11111===' },
  { title: '2222', dircetion: '11111===' },
  { title: '3333', dircetion: '11111===' },
]

function HelpContent(props) {
  const [activeArray, setActive] = useState([])

  const panelProps = (panelProps) => {
    return panelProps.isActive ? <MinusOutlined /> : <PlusOutlined />
  }

  const changeCollapse = (e) => {
    setActive(e)
  }

  return (
    <div className='help-content'>
      <div className='container'>
        <h3>Popular FAQs</h3>

        <Collapse
          expandIconPosition='right'
          expandIcon={panelProps}
          onChange={changeCollapse}
          style={{ borderColor: 'none' }}
        >
          {helpList.map((item, index) => {
            return (
              <Panel header={item.title} key={index}>
                <div>{item.dircetion}</div>
              </Panel>
            )
          })}
        </Collapse>
      </div>
    </div>
  )
}

export default HelpContent
