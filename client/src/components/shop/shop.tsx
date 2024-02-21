import React, { useEffect, useState, MouseEvent, ChangeEvent, useMemo } from "react";
import "./shop.css";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import ProductService from "../../services/products.service";
import formatPrice from "../../common/formatPrice.common";
import OrderItemService from "../../services/orderItems.service";
import { IUser } from "../../types/entities.types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyWarning } from "../../common/toastify.common";
import { useDispatch } from "react-redux";
import { updateCart } from "../../store/reducers/updateCart";
import Loading from "../loanding/loading";

const Shop = (): JSX.Element => {
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<any[]>([]);
  const [active, setActive] = useState<string>("All");
  const productService = new ProductService();
  const getAllProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    setIsLoading(false)
  }, []);
  
  const handleGetProducts = async (e: MouseEvent<HTMLLIElement>) => {
    setIsLoading(true)
    let liElement = e.target as HTMLLIElement;
    setActive(liElement.innerText);
    if (liElement.value === 0) {
      const allProducts = await productService.getAllProducts();
      setIsLoading(false)
      setProducts(allProducts.data);
    } else {
      const categoryProducts = await productService.getAllProducts(
        Number(liElement.value)
      );
      setIsLoading(false)
      setProducts(categoryProducts.data);
    }
  };
  // Search products by name
  const [searchValue, setSearchValue] = useState<string>("");
  const searchProducts = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setSearchValue(e.target.value);
    } else {
      setSearchValue("");
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      const data = await productService.searchProducts(searchValue);
      setActive("All");
      setProducts(data);
    };
    setTimeout(() => {
      getProduct();
    }, 1500);
  }, [searchValue]);
  // Add to cart
  const user: IUser = JSON.parse(localStorage.getItem("user") as string);
  const userId = user?.id;
  const token = localStorage.getItem("token") as string;
  const orderItemService = new OrderItemService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddCart = async (
    e: MouseEvent<HTMLButtonElement>,
    productId: number
    ) => {
    setIsLoading(true);
    if (!token) {
      setIsLoading(false)
      navigate("/");
    } else {
      const formData = {
        userId,
        productId,
        quantity: 1,
      };
      const result = await orderItemService.createOrderItem(formData);
      if (result === 1) {
        dispatch(updateCart());
        setIsLoading(false);
        notifySuccess("Add to cart successfully");
      } else if (result === 2) {
        setIsLoading(false);
        notifyWarning("This product has already been in your cart");
      }
    }
  };
  return (
    <section className="shop">
      {isLoading && <Loading />}
      <h1>SHOP</h1>
      <div className="shopGroup">
        <div className="shopCatalogAndSearch">
          <ul className="shopCatalog">
            <li
              className={active === "All" ? "shopCatalogLi" : ""}
              value={0}
              onClick={handleGetProducts}
            >
              All
            </li>
            <li
              className={active === "Cake & Desert" ? "shopCatalogLi" : ""}
              value={1}
              onClick={handleGetProducts}
            >
              Cake & Desert
            </li>
            <li
              className={active === "Bread" ? "shopCatalogLi" : ""}
              value={2}
              onClick={handleGetProducts}
            >
              Bread
            </li>
            <li
              className={active === "Burger & Pizza" ? "shopCatalogLi" : ""}
              value={3}
              onClick={handleGetProducts}
            >
              Burger & Pizza
            </li>
            <li
              className={active === "Cookie & Biscuit" ? "shopCatalogLi" : ""}
              value={4}
              onClick={handleGetProducts}
            >
              Cookie & Biscuit
            </li>
            <li
              className={active === "Pie & Tart" ? "shopCatalogLi" : ""}
              value={6}
              onClick={handleGetProducts}
            >
              Pie & Tart
            </li>
            <li
              className={active === "Donut" ? "shopCatalogLi" : ""}
              value={5}
              onClick={handleGetProducts}
            >
              Donut
            </li>
          </ul>
          <div className="shopSearch">
            <input
              value={searchValue}
              onChange={searchProducts}
              type="text"
              placeholder="Search by name..."
            />
          </div>
        </div>
        <div className="shopItems">
          {products.length > 0 &&
            products.map((product: any) => {
              return (
                <figure key={product.id} className="shopItem">
                  <Link to={`/detail/${product.id}`} className="shopItemImg">
                    <img src={product.images} alt="" />
                    <div className="shopItemInfo">
                      <h4>Click to Detail</h4>
                      <p>{product.allergens}</p>
                      {/* <span className="shopStar">
                        5{" "}
                        <FaStar style={{ color: "yellow", fontSize: "20px" }} />
                      </span> */}
                    </div>
                  </Link>
                  <figcaption>
                    <p>{product.name}</p>
                    <div className="shopItemAction">
                      <span>{formatPrice(Number(product.price))}</span>
                      <button
                        onClick={(e) => handleAddCart(e, Number(product.id))}
                      >
                        Add+
                      </button>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
        </div>
      </div>
      <div className="getVoucherShop">
        <h2>Get 15 point for first order from Huong Bakery</h2>
        <div className="getVoucherShopInput">
          <input placeholder="Enter your email to get VOUCHER" type="text" />
          <FaLongArrowAltRight className="iconShopVoucher" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Shop;
