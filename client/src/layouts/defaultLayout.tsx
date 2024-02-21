import React from "react";
import "./defaultLayout.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
interface Props {
    son:JSX.Element
}
const DefaultLayout = (props:Props): JSX.Element => {
  return (
    <div className="defaultLayout">
      <div className="headerDefaultLayout">
        <Header />
      </div>
      <div className="son">
        {props.son}
      </div>
      <div className="footerDefaultLayout">
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
