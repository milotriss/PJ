import React from "react";
import "./footer.css";
import { IoMailOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { PiCopyrightLight } from "react-icons/pi";
const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footerLeft">
        <h1>
          <span>Huong </span>Bakery
        </h1>
        <p>
          GET 25% OFF FOR FIRST ORDER BY SINGING UP TO RECEIVE THE LATEST
          UPDATED FROM HUONG BAKERY
        </p>
        <div className="footerSendMail">
          <label htmlFor="">Email</label>
          <input placeholder="Your Email" type="email" />
          <TbSend className="iconSendMail" />
        </div>
      </div>
      <div className="footerRight">
        <ul>
          <a href="#catalog">Catalog</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#event">Event</a>
          <a href="#workshop">Work Shop</a>
          <a href="#feedback">Feed Back</a>
        </ul>
        <div className="footerContact">
          <p>
            <IoMailOutline className="iconContactFooter" /> huong@gmail.com
          </p>
          <p>
            <FiPhone className="iconContactFooter" /> +84.999.999.999
          </p>
          <div className="contactBrand">
            <FiTwitter className="iconBrand" />
            <FaFacebook className="iconBrand" />
            <FaInstagram className="iconBrand" />
            <FaPinterest className="iconBrand" />
            <FaGoogle className="iconBrand" />
          </div>
        </div>
      </div>
      <span className="copyRight">
        <PiCopyrightLight /> 2024 Huong Bakery. Design by Middray
      </span>
    </footer>
  );
};

export default Footer;
