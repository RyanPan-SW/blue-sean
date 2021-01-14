import React from 'react'
import { connect } from 'react-redux'
import * as CounterActionCreator from '@/store/actions/counter'
import Services from '@/components/PageContent/Services'

const Test = ({ num, add, minus }) => {
  const type = getQueryVariable('type')
  return (
    <div style={{ paddingTop: 120 }}>
      <Services type={type} />
      {/* 测试的页面
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
    </Button> */}
    </div>
  )
}

const mapStateToProps = ({ counter }) => ({
  num: counter.num,
})

export default connect(mapStateToProps, CounterActionCreator)(Test)

function getQueryVariable(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}
