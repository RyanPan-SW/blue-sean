import React from 'react'
import { connect } from 'react-redux'
import * as CounterActionCreator from '@/store/actions/counter'
import { Button } from 'antd'

const Test = (props) => {
  const { num, add, minus } = props
  

  const getQues = () => {
    console.log('object')
  }

  return (
    <div>
      测试的页面
      {num}
      <Button
        className='foo'
        onClick={() => {
          add()
        }}
      >
        加
      </Button>
      <Button
        className='foo'
        onClick={() => {
          minus()
        }}
      >
        减-
      </Button>
      <div>
        <Button onClick={getQues}>get</Button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ counter }) => ({
  num: counter.num,
})

export default connect(mapStateToProps, CounterActionCreator)(Test)
