import {connect} from 'react-redux'

const Index = (props) => {
  console.log(props)
  return (
    <div />
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Index)
