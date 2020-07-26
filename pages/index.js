import {connect} from 'react-redux'
import Nav from '../components/nav'

const Index = ({ auth }) => {
  return (
    <Nav username={auth.username}/>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Index)
