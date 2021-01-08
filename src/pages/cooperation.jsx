import React from 'react'
import { connect } from 'react-redux'
import * as CounterActionCreator from '@/store/actions/counter'

const Test = () => <div>测试页面1</div>

const mapStateToProps = ({ counter }) => ({
  num: counter.num,
})

export default connect(mapStateToProps, CounterActionCreator)(Test)
