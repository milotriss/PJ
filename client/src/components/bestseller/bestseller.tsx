import React, { useEffect, useState } from "react";
import "./bestseller.css";
import "react-toastify/dist/ReactToastify.css";
import { IProduct } from "../../types/entities.types";
import ProductService from "../../services/products.service";
import { notifyWarning } from "../../common/toastify.common";
import { ToastContainer } from "react-toastify";
import formatPrice from "../../common/formatPrice.common";
import Loading from "../loanding/loading";

const Bestseller = (): JSX.Element => {
  // Get bestseller
  const [bestSellers, setBestSellers] = useState<IProduct[]>([]);
  const productService = new ProductService();
  const [isLoading,setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getBestseller = async () => {
      const result = await productService.getBestSellers();
      if (result !== 2) {
        setIsLoading(false);
        setBestSellers(result);
      } else {
        setIsLoading(false);
        notifyWarning("Something went wrong");
      }
    };
    getBestseller();
  }, []);
  return (
    <section id="catalog" className="bestseller">
      {isLoading && <Loading/>}
      <h1 className="animate" data-animate="tracking-in-expand 1s">Bestseller</h1>
      <div className="bestProducts animate" data-animate="slideInBottom 1s">
        {bestSellers.length > 0 &&
          bestSellers.map((bestSeller: IProduct) => {
            return (
              <figure key={bestSeller.id}>
                <img
                  className="imgBest"
                  src={bestSeller.images}
                  alt=""
                />
                <figcaption className="bestTitle">
                  <span>{bestSeller.name}</span>
                  <p>{formatPrice(Number(bestSeller.price))}</p>
                </figcaption>
              </figure>
            );
          })}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Bestseller;
