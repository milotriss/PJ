import React from 'react'
import ReactLoading from 'react-loading';
import './loading.css'
const Loading = ():JSX.Element => {
  return (
    <div className="loadingOverlay">
    <ReactLoading type="spinningBubbles" color="pink" height={200} width={100} />
  </div>
  )
}

export default Loading
