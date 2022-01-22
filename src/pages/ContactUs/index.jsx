import React, { useEffect, useState } from 'react'
import { getConfigContent } from '@/api/config'
import { Spin } from 'antd'
import './index.scss'

function ContactUs(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getConfigContent({ code: 'CU' })
      .then(({ data }) => {
        setLoading(false)
        const { title, content } = data || {}
        setTitle(title)
        setContent(content)
      })
      .catch((error) => {
        setLoading(false)
        console.info(error)
      })
  }, [])

  return (
    <Spin spinning={loading}>
      <div className='contact-us'>
        <div className='container'>
          <h3 className='contact-title'>{title}</h3>
          <div className='contact-content' dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </Spin>
  )
}

export default ContactUs
