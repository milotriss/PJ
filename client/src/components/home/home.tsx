import React, { useEffect } from "react";
import "./home.css";
import About from "../about/about";
import Bestseller from "../bestseller/bestseller";
import HomeEvents from "../homeEvents/homeEvents";
import HomeWorkShop from "../homeWorkShop/homeWorkShop";
import Feedback from "../feedback/feedback";
import { GoClock } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import Catalog from "../catalog/catalog";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess } from "../../common/toastify.common";


const Home = (): JSX.Element => {
  // Amimation
  const callback = (entries:any) => {
		entries.forEach((entry:any) => {
		  const elementDistanceFromTop = entry.target.getBoundingClientRect().top;
		  if (
			elementDistanceFromTop <=
			(window.innerHeight || document.documentElement.clientHeight / 1.7)
		  ) {
			entry.target.style.animation = entry.target.dataset.animate;
		  } else {
			entry.target.style.animation = 'none';
		  }
		});
	  };

	useEffect(() => {
		let observer = new IntersectionObserver(callback);
	
		const animationItems = document.querySelectorAll('.animate');
	
		animationItems.forEach(item => {
		  observer.observe(item);
		});
	  }, []);


  // 
  const user = localStorage.getItem("user");
  const location = useLocation();
  useEffect(() => {
    if (location.state === "login" && user) {
      notifySuccess(`Welcome to HuongBakery`);
    }
    if (location.state === "logout" && !user) {
      notifySuccess("Logout Success");
    }
    if (location.state === "paymentSuccess") {
      notifySuccess("Payment Success");
      setTimeout(() => {
        notifySuccess(
          "Payment Information has been sent to your email, Thank you!!!"
        );
      }, 2000);
    }
  }, [location.state]);
  return (
    <main className="home">
      <section className="homeBannerHead">
        <Carousel
          className="homeBannerHeadSlide"
          autoplay={true}
          autoplaySpeed={3000}
          effect="fade"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Banners%2Fwhite-pink-macaron.jpg?alt=media&token=fa1a3976-65ea-4377-8e66-5c824dc1b651"
            alt=""
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Banners%2Fb9ce521644ae1d890bda90fc948d9efc.jpg?alt=media&token=4942fb97-9e6f-4363-a6e4-405b3cb1ab19"
            alt=""
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Banners%2F1019888.jpg?alt=media&token=3d2f3508-b7a1-4466-8be0-522b9b4d2939"
            alt=""
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Banners%2Ff67a2d0c9637b0e3ac96f71617e39735.jpeg?alt=media&token=1edaaeef-6514-4714-8e41-1fabefa88777"
            alt=""
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Banners%2Fpastel-pink-cupcake-mikkuy104p9oxs2a.jpg?alt=media&token=04b04164-f09b-44f1-a872-04766e263e0d"
            alt=""
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Banners%2FGirly_Cupcakes_5bd7745e550bdfdb1ccdf129.jpeg?alt=media&token=6fe763ce-0e65-4255-86c9-4896303bb5cb"
            alt=""
          />
        </Carousel>
        <div className="homeBannerHeadTitle">
          <h4>Sweet and tasty</h4>
          <h1>A taste of the good life</h1>
          <Link to={"/shop"}>Shop Now</Link>
        </div>
      </section>
      <About />
      <Bestseller />
      <Catalog />
      <section className="paymentDelivery">
        <h1 className="animate" data-animate='tracking-in-expand 1s'>Payment & Delivery</h1>
        <div className="contentPaymentDelivery">
          <div className="imgPaymentDelivery animate" data-animate="slideInLeft 1s">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Banners%2Fchoco-cake-food.jpg?alt=media&token=b6139b6e-c7d2-4551-aedd-80288bff7655"
              alt=""
            />
          </div>
          <ul className="animate" data-animate="slideInRight 2s">
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              ut iusto quam, cumque pariatur, quia esse ipsum provident laborum,
              facilis aliquid magnam inventore eveniet nesciunt velit quisquam
              veritatis non. Neque?
            </li>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              ut iusto quam,
            </li>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              ut iusto quam,
            </li>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              ut iusto quam, cumque pariatur, quia esse ipsum provident laborum,
              facilis aliquid magnam inventore eveniet nesciunt velit quisquam
              veritatis non. Neque?
            </li>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              ut iusto quam, cumque pariatur, quia esse ipsum provident laborum,
              facilis aliquid magnam inventore eveniet nesciunt velit quisquam
              veritatis non. Neque?
            </li>
          </ul>
        </div>
      </section>
      <HomeEvents />
      <HomeWorkShop />
      <Feedback />
      <section id="contact" className="homeContact">
        <h1>Contact</h1>
        <div className="contactGroup">
          <div className="iframe animate" data-animate="slideInTop 2s">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.6473893503407!2d108.21331841174185!3d16.08377748453359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142183f0e816fd3%3A0xc7ee5aebb92fdb72!2zODcgTWFpIEFtLCBUaHXhuq1uIFBoxrDhu5tjLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1704615932190!5m2!1svi!2s"
              width={600}
              height={450}
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <ul className="contactInfo animate" data-animate="slideInBottom 2s">
            <li className="contactInfoItem">
              <GoClock className="iconContact" />
              <div className="contactText">
                <p>Mon - Sun</p>
                <p>from 9:00 to 21:00</p>
              </div>
            </li>
            <li className="contactInfoItem">
              <IoLocationOutline className="iconContact" />
              <div className="contactText">
                <p>Da Nang city.</p>
                <p>87 Mai Am</p>
              </div>
            </li>
            <li className="contactInfoItem">
              <IoMailOutline className="iconContact" />
              <div className="contactText">
                <p>huongbakery@gmail.com</p>
                <p>huongcake@gmail.com</p>
              </div>
            </li>
            <li className="contactInfoItem">
              <BsTelephone className="iconContact" />
              <div className="contactText">
                <p>+84.999.999.999</p>
                <p>+84.090.909.090</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default Home;
