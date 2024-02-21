import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './defaultLayout.css'
interface Props {
  son:JSX.Element
}
const DefaultLayout = (props:Props):JSX.Element => {
  return (
    <div className='defaultLayout'>
      <Sidebar/>
      <div className="contentAdmin">
        {props.son}
      </div>
    </div>
  )
}

export default DefaultLayout