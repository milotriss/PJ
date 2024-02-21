import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import { Popconfirm, Table } from "antd";
import qs from "qs";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./products.css";
import ProductService from "../../services/products.service";
import { formatPrice } from "../../common/formatPrice";
import { IProduct } from "../../types/interface";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/update";
import ModalEditProducts from "../modalEditProduct/modalEditProducts";
import ModalAddProducts from "../modalAddProducts/modalAddProducts";
import { FaStar } from "react-icons/fa";
import Loading from "../loanding/loading";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const Products = (): JSX.Element => {
  const productService = new ProductService();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IProduct>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const updateStatus = useSelector((state: any) => state.update);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const columns: ColumnsType<IProduct> = [
    {
      title: "Images",
      dataIndex: "images",
      render: (dataIndex, record: any) => (
        <img
          style={
            record.isDelete === 1
              ? {
                  height: "135px",
                  width: "135px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }
              : {
                  borderRadius: "10px",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  opacity: 0.3,
                }
          }
          src={dataIndex}
          alt=""
        />
      ),
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      render: (dataIndex, record: any) => (
        <span
          style={
            record.isDelete === 2
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {dataIndex}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (dataIndex, record: any) => (
        <span
          style={
            record.isDelete === 2
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {formatPrice(dataIndex)}
        </span>
      ),
      width: "15%",
      sorter: (a: any, b: any) => Number(a.price) - Number(b.price),
    },
    {
      title: "Rating",
      width: "10%",
      dataIndex: "rates",
      render: (dataIndex: any, record: any) => {
        let average = 0;
        if (dataIndex) {
          if (dataIndex.length > 0) {
            const result = dataIndex.reduce(
              (init: number, item: any) => init + item?.rateStar,
              0
            );
            average = Math.round((result / dataIndex.length) * 100) / 100;
          }
        }
        return (
          <>
            {average ? (
              <span
                style={
                  record.isDelete === 2
                    ? {
                        textDecoration: "line-through",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }
                    : {
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }
                }
              >
                {average} <FaStar style={{ marginLeft: "10px" }} />
              </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {average} <FaStar style={{ marginLeft: "10px" }} />
              </span>
            )}
          </>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      width: "10%",
      sorter: (a: any, b: any) => Number(a.stock) - Number(b.stock),
      render: (dataIndex, record: any) => {
        return (
          <span
            style={
              record.isDelete === 2
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            {dataIndex}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (dataIndex: number, record: any) => (
        <div>
          <button
            onClick={() => {
              handleGetDataEdit(record);
              setModalEdit(true);
            }}
            className="btnActionUsers"
          >
            Edit
          </button>
          {record.isDelete === 1 ? (
            <Popconfirm
              title="Delete this Products"
              description="Are you sure to delete it?"
              onConfirm={() => handleIsDelete(dataIndex)}
              okText="Yes"
              cancelText="No"
            >
              <button className="btnActionUsers">Delete</button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Return this Products"
              description="Are you sure to return it?"
              onConfirm={() => handleReturn(dataIndex)}
              okText="Yes"
              cancelText="No"
            >
              <button className="btnActionUsers">Return</button>
            </Popconfirm>
          )}
        </div>
      ),
      width: "20%",
    },
  ];
  const offModalEdit = () => {
    setModalEdit(false);
  };
  const offModalAdd = () => {
    setModalAdd(false);
  };
  const handleGetDataEdit = (record: IProduct) => {
    setDataEdit(record);
  };
  const handleIsDelete = async (id: number) => {
    setIsLoading(true);
    await productService.isDelete(id);
    setIsLoading(false);
    dispatch(update());
  };
  const handleReturn = async (id: number) => {
    setIsLoading(true);
    await productService.return(id);
    setIsLoading(false);
    dispatch(update());
  };
  // const getRandomuserParams = (params: TableParams) => ({
  //   results: params.pagination?.pageSize,
  //   page: params.pagination?.current,
  //   ...params,
  // });

  const fetchData = async () => {
    // setLoading(true);
    // const data: any = await productService.getAllProducts();
    // setData(data);
    // setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: products.length,
      },
    });
  };
  const getProducts = async () => {
    setIsLoading(true)
    const result = await productService.getAllProducts();
    setProducts(result);
    setIsLoading(false)
  };
  useEffect(() => {
    fetchData();
    getProducts();
  }, [JSON.stringify(tableParams), updateStatus]);
  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IProduct>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // console.log(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setProducts([]);
    }
  };
  const handleChangeSearchProducts = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    const getData = async () => {
      const result = await productService.searchProducts(searchValue);
      if (result === 2) {
        console.log("Search products something was found");
      } else {
        setProducts(result);
      }
    };
    setTimeout(() => {
      if (searchValue !== "") {
        getData();
      }
    }, 1500);
  }, [searchValue]);
  return (
    <section className="products">
      {isLoading && <Loading/>}
      <div className="searchProducts">
        <input
          onChange={handleChangeSearchProducts}
          value={searchValue}
          autoFocus
          placeholder="Search by Name..."
          type="text"
        />
      </div>
      <Table
        size="large"
        columns={columns}
        dataSource={products}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <div className="addProducts">
        <button onClick={() => setModalAdd(true)} className="btnActionUsers">
          Add+ New Product
        </button>
      </div>
      {modalEdit ? (
        <ModalEditProducts dataEdit={dataEdit} offModalEdit={offModalEdit} />
      ) : null}
      {modalAdd ? <ModalAddProducts offModalAdd={offModalAdd} /> : null}
    </section>
  );
};

export default Products;
