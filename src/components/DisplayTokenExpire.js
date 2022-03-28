import { AuthContext } from '../containers/ContextProvider'

function DisplayTokenExpire() {
  return (
    <AuthContext.Consumer>
      {(context) => <div>Expire : {context?.decodedToken?.exp}</div>}
    </AuthContext.Consumer>
  )
}

export default DisplayTokenExpire
