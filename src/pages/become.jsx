import React from 'react'
import { connect } from 'react-redux'
import * as CounterActionCreator from '@/store/actions/counter'
import { Button } from 'antd'

const Test = ({ num, add, minus }) => (
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
      jian-
    </Button>
  </div>
)

const mapStateToProps = ({ counter }) => ({
  num: counter.num,
})

export default connect(mapStateToProps, CounterActionCreator)(Test)
