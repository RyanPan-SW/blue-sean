import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { getConfigContent } from '@/api/config'
import './index.scss'

const { Panel } = Collapse

function HelpContent(props) {
  const [activeArray, setActive] = useState([])

  const [Content, setContent] = useState([])

  useEffect(() => {
    getConfigContent({ code: 'help_center' }).then((res) => {
      setContent(res.data)
    })
  }, [])

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
          {Content.map((item, index) => {
            return (
              <Panel
                header={
                  <span
                    className={activeArray.includes(`${index}`) ? 'help-active' : 'help-header'}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item.Q }}></span>
                  </span>
                }
                key={index}
              >
                <ul dangerouslySetInnerHTML={{ __html: item.A }}></ul>
              </Panel>
            )
          })}
        </Collapse>
      </div>
    </div>
  )
}

export default HelpContent
