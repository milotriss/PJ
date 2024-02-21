import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "./modalEditProducts.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../services/products.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import { notifyError, notifySuccess, notifyWarning } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import { Popconfirm } from "antd";
import Loading from "../loanding/loading";
interface Props {
  offModalEdit: Function;
  dataEdit: any;
}

const ModalProducts = (props: Props): JSX.Element => {
  const [isLoading,setIsLoading] = useState<boolean>(true)
  useEffect(()=>{setIsLoading(false)},[])
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
  const [updateData, setUpdateData] = useState(props.dataEdit);
  // Update
  const dispatch = useDispatch();
  const handleOpenEdit = (e: MouseEvent<HTMLElement>) => {
    const spanElements = e.target as HTMLElement;
    const inputElements = spanElements.parentElement?.querySelector(
      "input"
    ) as HTMLInputElement;
    spanElements.style.fontSize = "20px";
    spanElements.style.color = "#000";
    inputElements.style.border = "1px solid #000";
    inputElements.removeAttribute("disabled");
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };
  const productService = new ProductService()
  const handleUpdateProduct = async (id:number) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name',updateData.name)
    formData.append('allergens',updateData.allergens)
    formData.append('desc',updateData.desc)
    formData.append('ingredients',updateData.ingredients)
    formData.append('price',updateData.price)
    formData.append('stock',updateData.stock)
    formData.append('products',fileUpdate)
    const result = await productService.updateProduct(id,formData)
    if (result === 1) {
      props.offModalEdit()
      dispatch(update())
      setIsLoading(false)
      notifySuccess("Updated product successfully")
    }else {
      setIsLoading(false)
      notifyWarning('Product update failed');
    }
  };

  return (
    <div className="modalEditProductsOverlay">
      {isLoading && <Loading/>}
      <div className="modalEditProducts">
        <div className="modalEditProductsImg">
          <img
            src={avatars?.preview ? avatars.preview : props.dataEdit.images}
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
        <div className="modalEditProductsInputs">
          <div className="modalEditProductsInput">
            <input
              value={updateData.name}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="name"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditProductsInput">
            <input
              value={updateData.desc}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="desc"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditProductsInput">
            <input
              value={updateData.ingredients}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="ingredients"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditProductsInput">
            <input
              value={updateData.allergens}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="allergens"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditProductsInput">
            <input
              value={updateData.price}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="price"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditProductsInput">
            <input
              value={updateData.stock}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="stock"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
        </div>
        <div className="modalEditProductsActions">
          <Popconfirm
            title="Update Products"
            description="Are you sure about this information?"
            onConfirm={() => handleUpdateProduct(props.dataEdit.id)}
            okText="Yes"
            cancelText="No"
          >
            <button>UPDATE</button>
          </Popconfirm>
          <button onClick={() => props.offModalEdit()}>CANCEL</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalProducts;
