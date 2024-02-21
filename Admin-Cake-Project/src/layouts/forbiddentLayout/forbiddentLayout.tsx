import React from 'react'
import { Link } from 'react-router-dom'
import './forbiddentLayout.css'

const ForbiddenLayout = ():JSX.Element => {
  return (
    <div>
        <div className="notFoundLayout">
      <div className="notFoundContent">
        <h1>
          4
          <img src="../../../asset/img/burger.png" alt="" />3
        </h1>
        <p>ACCESS FORBIDDEN</p>
        <span>IDIOT!!!</span>
        <Link to={"/"}>Back GUY</Link>
      </div>
    </div>
    </div>
  )
}

export default ForbiddenLayout