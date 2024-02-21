import React from "react";
import { Spin } from "antd";
import './loading.css'
import ReactLoading from 'react-loading';
const Loading = (): JSX.Element => {
  return (
    <div className="loadingOverlay">
      <ReactLoading type="spinningBubbles" color="pink" height={200} width={100} />
    </div>
  );
};
export default Loading;
