import React, { useEffect, useState, useContext } from "react"
import Axios from 'axios'
import DispatchContext from '../DispatchContext'

function HeaderLoggout(props) {

  const appDispatch = useContext(DispatchContext)


  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault() // previne o comportamento normal do browser de levar pra outra página
    try {
      const response = await Axios.post('/login', { username, password }) //faz chamada pro back-end
      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "login", data: response.data })


      } else {
        console.log("Senha ou Login incorreto")
      }

    } catch (e) {
      console.log("Ocorreu um erro")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
        <div className="row align-items-center">
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
          </div>
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
          </div>
          <div className="col-md-auto">
            <button className="btn btn-success btn-sm">Sign In</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default HeaderLoggout