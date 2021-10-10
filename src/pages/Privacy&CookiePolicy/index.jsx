import { getConfigContent } from '@/api/config'
import React, { useState, useEffect } from 'react'
import './index.scss'

function PrivacyPolicy() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(null)

  useEffect(() => {
    getConfigContent({ code: 'PCP' }).then((res) => {
      const { title, content } = res.data || {}
      setTitle(title)
      setContent(content)
    })
  }, [])

  return (
    <div className='container'>
      <div className='privacy'>
        <h3 className='privacy-title'>{title}</h3>
        <ul className='privacy-content' dangerouslySetInnerHTML={{ __html: content }}></ul>
      </div>
    </div>
  )
}

export default PrivacyPolicy
