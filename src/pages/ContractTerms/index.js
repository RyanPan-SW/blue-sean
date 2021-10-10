import React, { useEffect, useState } from 'react'
import { getConfigContent } from '@/api/config'
import './index.scss'

function ContractTerms(props) {

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
        <h4 className='title'>{title}</h4>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  )
}

export default ContractTerms
