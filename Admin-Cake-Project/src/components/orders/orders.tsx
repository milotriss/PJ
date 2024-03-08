import React, { useState, useEffect, ChangeEvent } from "react";
import { Table } from "antd";
import qs from "qs";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./orders.css";
import OrderService from "../../services/orders.service";
import { IOrder } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";
import OrderDetail from "../orderDetail/orderDetail";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/update";
import { formatDate } from "../../common/formatDate";
import { notifySuccess, notifyWarning } from "../../common/toastify";
import useSocket from "../../hooks/useSocket.hooks";
import Loading from "../loanding/loading";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
export interface IDetailHistory{
  quantity:number
  price:number
  images:string
  name:string
  totalPrice:number
}
const Orders = (): JSX.Element => {
  const [isLoading,setIsLoading] = useState<boolean>(true)
  useEffect(()=>{setIsLoading(false)},[])
  const [onOrderDetails, setOnOrderDetails] = useState<boolean>(false);
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.update);
  // const columns2: ColumnsType<IOrder> = [
  //   {
  //     title: "Name Received",
  //     dataIndex: "userName",
  //     width: "20%",
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "date",
  //     width: "20%",
  //   },
  //   {
  //     title: "Price",
  //     dataIndex: "totalPrice",
  //     // render: (dataIndex) => <span>{formatPrice(dataIndex)}</span>,
  //     width: "15%",
  //     sorter: (a: any, b: any) => Number(a.totalPrice) - Number(b.totalPrice),
  //   },

  //   {
  //     title: "Action",
  //     dataIndex: "id",
  //     render: (id) => (
  //       <div>
  //         <button
  //           onClick={() => {
  //             setOnOrderDetails(true);
  //             // handleGetOrderById(id);
  //           }}
  //           className="btnActionUsers"
  //         >
  //           View
  //         </button>
  //       </div>
  //     ),
  //     width: "10%",
  //   },
  // ];
  const columns: any = [
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
            ? Math.round(100 - (record.lastPrice / record.subTotal) * 100)
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
      dataIndex: "status",
      width: "10%",
      render: (dataIndex: any, record: any) => {
        return (
          <select
            value={record.status}
            onChange={(e) => onChangeStatus(e, Number(record.id),Number(record.userId))}
            className="selectStatus"
          >
            <option
              disabled={dataIndex === 2 || dataIndex === 3 ? true : false}
              value="1"
            >
              Pending...
            </option>
            <option disabled={dataIndex === 3 ? true : false} value="2">
              Shipping...
            </option>
            <option value="3">Finished</option>
          </select>
        );
      },
    },
    {
      title: "Action",
      render: (record: any) => (
        <div>
          <button
            onClick={() => {
              setOnOrderDetails(true);
              handleGetOrderById(record);
            }}
            className="btnActionUsers"
          >
            View
          </button>
        </div>
      ),
      width: "10%",
    },
  ];
  const socket = useSocket()
  const onChangeStatus = async (
    e: ChangeEvent<HTMLSelectElement>,
    id:number,
    userId:number
  ) => {
    // setIsLoading(true)
    const result = await orderService.changeStatusOrder(
      id,
      Number(e.target.value)
    );
      if (result === 1) {
        socket.emit('statusPayment',{userId,status:e.target.value});  
        dispatch(update());
        // setIsLoading(false)
      }else{
        // setIsLoading(false)
        notifyWarning("Something went wrong");
      }
  };
  const [detailHistory, setDetailHistory] = useState<IDetailHistory[]>([]);
  
  const handleGetOrderById = async (record: any) => {
    setIsLoading(true)
    const result = await orderService.getDetailHistory(
      Number(record.userId),
      record.codePayment
    );
    if (result === 2) {
      setIsLoading(false)
      notifyWarning("Something went wrong");
    } else {
      setDetailHistory(result);
      setOnOrderDetails(true);
      setIsLoading(false)
    }
  };
  const offOrderDetails = () => {
    setOnOrderDetails(false);
  };
  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  const orderService = new OrderService();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const data: any = await orderService.getAllOrders();
    setIsLoading(false)
    setData(data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data.length,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), status]);

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IOrder>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  // Search
  const [searchOrder, setSearchOrder] = useState<string>("");
  const changeSearchOrders = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchOrder(e.target.value);
  };
  const getHistorySearchOrder = async () => {
    const result = await orderService.searchHistoryOrder(searchOrder);
    if (result !== 2) {
      setData(result);
    } else {
      notifyWarning("User Not Found");
    }
  };
  useEffect(() => {
    if (searchOrder.length !== 0) {
      setTimeout(() => {
        getHistorySearchOrder();
      }, 1500);
    } else {
      fetchData();
    }
  }, [searchOrder]);

  return (
    <section className="orders">
      {isLoading && <Loading/>}
      <div className="searchOrders">
        <input
          autoFocus
          onChange={changeSearchOrders}
          value={searchOrder}
          placeholder="Search by date..."
          type="text"
        />
      </div>
      <Table
        size="large"
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        // loading={loading}
        onChange={handleTableChange}
      />
      {onOrderDetails ? (
        <OrderDetail
          offOrderDetails={offOrderDetails}
          detailHistory={detailHistory}
        />
      ) : null}
    </section>
  );
};

export default Orders;
