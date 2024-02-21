import { Popconfirm } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./modalAddProducts.css";
import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "../../common/toastify";
import { IProduct } from "../../types/interface";
import ProductService from "../../services/products.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import Loading from "../loanding/loading";
interface Props {
  offModalAdd: Function;
}
const ModalAddProducts = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newProduct, setNewProduct] = useState({
    catalogId: '',
    name: "",
    price: '',
    stock: '',
    desc: "",
    ingredients:'',
    allergens:'',
  });
  useEffect(()=>{setIsLoading(false)},[])
  //   Validate Blur
  const handleBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
    const spanElements = e.target.parentElement?.querySelector(
      ".ruleBlur"
    ) as HTMLSpanElement;
    if (e.target.value === "" || e.target.value === "0") {
      e.target.style.border = "1px solid red";
      spanElements.innerText = "Enter this field*";
    } else {
      e.target.style.border = "1px solid #000";
      spanElements.innerText = "";
    }
  };

  //   Get value new product
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
      });
  };
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewProduct({
      ...newProduct,
      catalogId: e.target.value,
    })
  };
  // Set avatar
  const [avatars, setAvatars] = useState<any>();
  const [fileUpdate, setFile] = useState<any>();
  const handleAvatar = (e: any) => {
    let file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatars(file);
    setFile(file);
  };
  useEffect(() => {
    return () => {
      avatars && URL.revokeObjectURL(avatars.preview);
    };
  }, [avatars]);
  //  Validate rule and request API
  const productService = new ProductService()
  const dispatch = useDispatch();
  const handleAddNewProduct = async () => {
    setIsLoading(true)
      if (
        newProduct.name === "" ||
        newProduct.desc === "" ||
        newProduct.catalogId === "" ||
        newProduct.price === "" ||
        fileUpdate === "" ||
        newProduct.ingredients === "" ||
        newProduct.allergens === ""
      ) {
        setIsLoading(false)
        notifyWarning("Please enter all field");
      } else {
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("desc", newProduct.desc);
        formData.append("ingredients",newProduct.ingredients);
        formData.append("allergens",newProduct.allergens);
        formData.append("price",newProduct.price);
        formData.append("stock",newProduct.stock);
        formData.append("products",fileUpdate);
        formData.append("catalogId",newProduct.catalogId);
        const result = await productService.addProduct(formData);
        if (result === 2) {
          setIsLoading(false)
          notifyWarning("Product create failed")
        }else {
          props.offModalAdd()
          dispatch(update())
          setIsLoading(false)
          notifySuccess("Product create successfully")
        }
      }
    }
    
  return (
    <div className="modalAddProductsOverlay">
      {isLoading && <Loading/>}
      <div className="modalAddProducts">
        <div className="modalAddProductsImg">
          <img
            src={
              avatars?.preview
                ? avatars.preview
                : "https://static.thenounproject.com/png/4974686-200.png"
            }
            alt=""
          />
          <div className="selectFile">
            <label htmlFor="photo">
              <MdAddPhotoAlternate />
            </label>
            <input
              onChange={handleAvatar}
              style={{ display: "none" }}
              type="file"
              name=""
              id="photo"
            />
          </div>
        </div>
        <div className="modalAddProductsInputs">
          <div className="modalAddProductsInput">
            <input
              onChange={changeInput}
              value={newProduct.name}
              onBlur={handleBlurInput}
              placeholder="Name Product"
              type="text"
              name="name"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <input
              onChange={changeInput}
              value={newProduct.desc}
              onBlur={handleBlurInput}
              placeholder="Describe"
              type="text"
              name="desc"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <input
              onChange={changeInput}
              value={newProduct.ingredients}
              onBlur={handleBlurInput}
              placeholder="Ingredients"
              type="text"
              name="ingredients"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <input
              onChange={changeInput}
              value={newProduct.allergens}
              onBlur={handleBlurInput}
              placeholder="Allergens"
              type="text"
              name="allergens"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <p>Price</p>
            <input
              onChange={changeInput}
              value={newProduct.price}
              onBlur={handleBlurInput}
              placeholder="Price"
              type="text"
              name="price"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <p>Stock</p>
            <input
              onChange={changeInput}
              value={newProduct.stock}
              onBlur={handleBlurInput}
              placeholder="Stock"
              type="text"
              name="stock"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <select onChange={handleChangeSelect} name="" id="">
              <option value="0">--Category--</option>
              <option value="1">Cake & Deserts</option>
              <option value="2">Bread</option>
              <option value="3">Burger & Pizza</option>
              <option value="4">Cookie & Biscuit</option>
              <option value="5">Donuts</option>
              <option value="6">Pie & Tart</option>
            </select>
          </div>
        </div>
        <div className="modalAddProductsActions">
          <Popconfirm
            title="Update Products"
            description="Are you sure about this information?"
            onConfirm={handleAddNewProduct}
            okText="Yes"
            cancelText="No"
          >
            <button>ADD+</button>
          </Popconfirm>
          <button onClick={() => props.offModalAdd()}>CANCEL</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalAddProducts;
