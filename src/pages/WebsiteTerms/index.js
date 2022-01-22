import React, { useState, useEffect } from 'react'
import { getConfigContent } from '@/api/config'
import './index.scss'

function WebsiteTerms(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(null)

  useEffect(() => {
    getConfigContent({ code: 'CT' }).then((res) => {
      const { title, content } = res.data || {}
      setTitle(title)
      setContent(content)
    })
  }, [])

  return (
    <div className='contranct'>
      <div className='container'>
        <h3 className='title'>{title}</h3>
        <ul className='content-ul' dangerouslySetInnerHTML={{ __html: content }}></ul>
      </div>
    </div>
  )
}

export default WebsiteTerms
