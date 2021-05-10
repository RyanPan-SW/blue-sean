import React, { useState } from 'react'
import { Collapse } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import './index.scss'

const { Panel } = Collapse
const helpList = [
  {
    title:
      'How do I track using a reference number?How do I track using a reference number?How do I track using a reference number?How do I track How do I track using a reference number?How do I track using a reference number?',
    dircetion: 'This is going to be the content',
  },
  { title: '2222', dircetion: 'This is going to be the content' },
  { title: '3333', dircetion: 'This is going to be the content' },
]

function HelpContent(props) {
  const [activeArray, setActive] = useState([])

  const panelProps = (panelProps) => {
    return panelProps.isActive ? <MinusOutlined /> : <PlusOutlined />
  }

  const changeCollapse = (e) => {
    setActive(e)
    // console.log(e)
  }

  return (
    <div className='container'>
      <div className='help-content'>
        <h3 className='help-title'>Popular FAQs</h3>

        <Collapse
          expandIconPosition='right'
          expandIcon={panelProps}
          onChange={changeCollapse}
          style={{ borderColor: 'none' }}
        >
          {helpList.map((item, index) => {
            return (
              <Panel
                header={
                  <span
                    className={activeArray.includes(`${index}`) ? 'help-active' : 'help-header'}
                  >
                    {item.title}
                  </span>
                }
                key={index}
              >
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
