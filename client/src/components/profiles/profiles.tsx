import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import "./profiles.css";
import { TbPhotoEdit } from "react-icons/tb";
import { Table, TableColumnsType, TableProps, Tabs } from "antd";
import { IUser } from "../../types/entities.types";
import UserService from "../../services/users.service";
import { useDispatch } from "react-redux";
import { notifySuccess, notifyWarning } from "../../common/toastify.common";
import { updateProfile } from "../../store/reducers/updateProfile";
import formatDate from "../../common/formatDate.common";
import formatPrice from "../../common/formatPrice.common";
import ModalHistoryDetail from "../modalHistoryDetail/modalHistoryDetail";
import OrderItemService from "../../services/orderItems.service";
import useSocket from "../../hooks/useSocket.hooks";
import Loading from "../loanding/loading";
import { FaBullseye } from "react-icons/fa6";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
interface IHistory{
  id:number
  userId:number
  subTotal:number
  lastPrice:number
  phone:number
  status:number
  email:string
  name:string
  address:string
  typePayment:number
  createdAt?:string
  updatedAt?:string
  codePayment?:string
}
interface IDetailHistory{
  quantity:number
  price:number
  images:string
  name:string
  totalPrice:number
}
const Profiles = (): JSX.Element => {
  const columns2: any = [
    {
      title: "Name Received",
      dataIndex: "name",
    },
    {
      title: "Phone Received",
      dataIndex: "phone",
    },
    {
      title: "Date",
      dataIndex: "createAt",
      render: (dataIndex: any, record: any) => (
        <span>{formatDate(String(record.createdAt))}</span>
      ),
    },
    {
      title: "Subtotal",
      render: (dataIndex: any, record: any) => (
        <span>{formatPrice(Number(record.subTotal))}</span>
      ),
    },
    {
      title: "Voucher",
      render: (dataIndex: any, record: any) => (
        <span>
          {record.typePayment === 1
            ? 100 - (record.lastPrice / record.subTotal) * 100
            : Math.round(100 - (record.lastPrice / record.subTotal) * 100)}
          %
        </span>
      ),
    },
    {
      title: "Last Price",
      render: (dataIndex: any, record: any) => (
        <span>{formatPrice(Number(record.lastPrice))}</span>
      ),
    },
    {
      title: "Type payment",
      render: (dataIndex: any, record: any) => (
        <span>{record.typePayment === 1 ? "COD" : "ONLINE"}</span>
      ),
    },
    {
      title: "Status",
      render: (dataIndex: any, record: any) => (
        <>
        {record.status === 1 ? <span>Confirmed</span> : null}
        {record.status === 2 ? <span>Shipping...</span> : null}
        {record.status === 3 ? <span>Finished</span> : null}
        </>
      ),
    },
    {
      title: "Action",
      render: (dataIndex: any, record: any) => (
        <button
          onClick={() => {
            setIsDetailHistory(true);
            handlePassData(record.codePayment, record.lastPrice);
          }}
          style={{
            padding: "10px 40px",
            backgroundColor: "transparent",
            border: "1px solid #000",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Details
        </button>
      ),
    },
  ];
  const onChange2: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // const columns3: TableColumnsType<DataType> = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     width: "30%",
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     sorter: (a, b) => a.age - b.age,
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "address",
  //     width: "40%",
  //   },
  // ];
  // const onChange3: TableProps<DataType>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  // const data: DataType[] = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     age: 32,
  //     address: "London No. 2 Lake Park",
  //   },
  // ];
  const onChange = (key: string) => {
    // console.log(key);
  };
  // Loading
  const [isLoading,setIsLoading] = useState<boolean>(true)
  // Profiles
  const [userInfo, setUserinfo] = useState<any>();
  const token = localStorage.getItem("token");
  const user: IUser = JSON.parse(localStorage.getItem("user") as string);
  const userId = user.id;
  const userService = new UserService();
  // Get history orders
  const socket = useSocket()
  const [history, setHistory] = useState<any[]>([]);
  const getUserInfo = async () => {
    const data = await userService.getUserInfo(Number(userId));
    setUserinfo(data);
  };
  const getHistory = async () => {
    const data = await userService.getHistory(Number(userId));
    if (data === 2) {
      notifyWarning("Some things went wrong");
    } else {
      setHistory(data);
    }
  };
  
  useEffect(() => {
    if (token) {
      getUserInfo();
      getHistory();
      setIsLoading(false)
    }
  }, []);
  useEffect(()=>{
    socket.on('statusHistory',(data:any)=>{
      if (data.userId === userId) {
        getHistory();
      }
    })
  },[socket,history])
  // Avatar
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

  // Edit Profile
  const handleEdit = (e: MouseEvent<HTMLSpanElement>) => {
    const spanElement = e.target as HTMLSpanElement;
    const divElement = spanElement.parentElement as HTMLDivElement;
    const inputElement = divElement.querySelector(".inputProfile") as
      | HTMLInputElement
      | HTMLTextAreaElement;
    inputElement.removeAttribute("disabled");
    inputElement.focus();
    inputElement.style.border = "2px solid rgb(252, 168, 182)";
  };
  // Update Profile
  const dispatch = useDispatch();
  const [newProfile, setNewProfile] = useState<any>({
    phone: userInfo?.userInfo.phone,
    address: userInfo?.userInfo.address,
  });
  const changeFormUpdate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProfile({
      ...newProfile,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateProfile = async () => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append("avatar", fileUpdate);
    formData.append("phone", newProfile.phone);
    formData.append("address", newProfile.address);
    const result = await userService.updateUser(Number(userId), formData);
    if (result === 1) {
      setIsLoading(false);
      notifySuccess("Profile updated successfully");
      dispatch(updateProfile());
    } else {
      notifyWarning("Update Failed");
      setIsLoading(false);
    }
  };
  // Search
  const [searchOrder, setSearchOrder] = useState<string>("");
  const changeSearchOrders = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchOrder(e.target.value);
  };
  const getHistorySearchOrder = async () => {
    setIsLoading(true)
    const result = await userService.searchHistoryOrder(
      Number(userId),
      searchOrder
    );
    if (result !== 2) {
      setIsLoading(false)
      setHistory(result);
    } else {
      setIsLoading(false)
      notifyWarning("User Not Found");
    }
  };
  useEffect(() => {
    if (searchOrder === '') {
      getHistory()
    }else{
      getHistorySearchOrder()
    }
    if (searchOrder.length !== 0) {
      setTimeout(() => {
        getHistorySearchOrder();
      }, 1500);
    }
  }, [searchOrder]);
  // Detail history
  const orderItemService = new OrderItemService();
  const [isDetailHistory, setIsDetailHistory] = useState<boolean>(false);
  const [dataPass, setDataPass] = useState<any[]>([]);
  const [lastPrice, setLastPrice] = useState<number>(0);
  const offHistoryDetail = () => {
    setIsDetailHistory(false);
  };
  const handlePassData = async (codePayments: string, lastPrice: number) => {
    setIsLoading(true)
    const result = await orderItemService.getDetailHistory(
      Number(userId),
      String(codePayments)
    );
    if (result === 2) {
      setIsLoading(false)
      console.log("Get detail history failed");
    } else {
      setIsLoading(false)
      setDataPass(result);
      setLastPrice(lastPrice);
    }
  };
  
  return (
    <section className="profiles">
      {isLoading && <Loading/>}
      <div className="profile">
        <h1>Your Profile</h1>
        <div className="profileAvatars">
          <img
            src={
              avatars?.preview ? avatars?.preview : userInfo?.userInfo.avatar
            }
            alt="Avatar"
          />
          <div className="profileAvatar">
            <label htmlFor="avatar">
              <TbPhotoEdit className="iconAvatar" />
            </label>
            <input
              onChange={handleAvatar}
              style={{ display: "none" }}
              id="avatar"
              type="file"
            />
          </div>
        </div>
        <div className="profileInfo">
          <p
            style={{
              textAlign: "center",
              fontSize: 50,
              width: "100%",
              fontFamily: '"Lobster Two", sans-serif',
              color: "rgb(252, 168, 182)",
            }}
          >
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: 40,
              width: "100%",
              fontFamily: '"Lobster Two", sans-serif',
              color: "rgb(252, 168, 182)",
            }}
          >
            {userInfo?.email}
          </p>
          <div className="profileInfoItem">
            <input
              name="phone"
              value={newProfile.phone}
              onChange={changeFormUpdate}
              className="inputProfile"
              disabled
              placeholder={
                userInfo?.userInfo.phone === null
                  ? "Phone Empty"
                  : userInfo?.userInfo.phone
              }
              type="text"
            />
            <span onClick={handleEdit}>Edit</span>
          </div>
          <div className="profileInfoItem">
            <textarea
              name="address"
              value={newProfile.address}
              onChange={changeFormUpdate}
              className="inputProfile"
              disabled
              id=""
              placeholder={
                userInfo?.userInfo.address === null
                  ? "Address Empty"
                  : userInfo?.userInfo.address
              }
            ></textarea>
            <span onClick={handleEdit}>Edit</span>
          </div>
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      </div>
      <div className="history">
        <h1>Your History</h1>
        <Tabs
          size="large"
          className="historyTabs"
          onChange={onChange}
          type="card"
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1);
            if (id === "1") {
              return {
                label: `Orders`,
                key: id,
                children: (
                  <section className="orderHistory">
                    <div className="searchHistory">
                      <input
                        value={searchOrder}
                        onChange={changeSearchOrders}
                        placeholder="Search by date..."
                        type="text"
                      />
                    </div>
                    <Table
                      columns={columns2}
                      dataSource={history}
                      onChange={onChange2}
                    />
                  </section>
                ),
              };
            } else {
              return {
                label: `Events`,
                key: id,
                children: (
                  <section className="eventHistory">
                    <div className="searchHistory">
                      <input placeholder="Search by name" type="text" />
                    </div>
                    <Table
                      // columns={columns3}
                      // dataSource={data}
                      // onChange={onChange3}
                    />
                  </section>
                ),
              };
            }
          })}
        />
      </div>
      {isDetailHistory ? (
        <ModalHistoryDetail
          lastPrice={lastPrice}
          dataPass={dataPass}
          offHistoryDetail={offHistoryDetail}
        />
      ) : null}
    </section>
  );
};

export default Profiles;
