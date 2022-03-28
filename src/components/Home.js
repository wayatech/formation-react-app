import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Hello !</h1>
      <br />
      <br />
      <Link to="/customers">Access to customer list</Link>
    </div>
  )
}

export default Home
