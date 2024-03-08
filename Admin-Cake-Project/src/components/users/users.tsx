import React, { useState, useEffect, ChangeEvent } from "react";
import "./users.css";

import { Popconfirm, Tabs } from "antd";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import UserService from "../../services/users.service";
import { IUser } from "../../types/interface";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/update";
import PopUpAddAdmin from "../popUpAddAdmin/popUpAddAdmin";
import { notifySuccess, notifyWarning } from "../../common/toastify";
// import useSocket from "../../hooks/useSocket.hooks";
import Loading from "../loanding/loading";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const Users = (): JSX.Element => {
  // const socket = useSocket()
  // console.log(socket);
  
  const [popUpAdd, setPopUpAdd] = useState<boolean>(false);
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(()=>{setIsLoading(false)},[])
  const [searchValue, setSearchValue] = useState<string>("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const updateStatus = useSelector((state: any) => state.update);
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("admin") as string);

  const userService = new UserService();
  // const getRandomuserParams = (params: TableParams) => ({
  //   results: params.pagination?.pageSize,
  //   page: params.pagination?.current,
  //   ...params,
  // });
  const columns: ColumnsType<IUser> = [
    {
      title: "Name",
      width: "25%",
      render: (dataIndex, record: any) => (
        <span
          style={
            record.status === 2
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (dataIndex, record: any) => (
        <span
          style={
            record.status === 2
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {dataIndex}
        </span>
      ),
    },
    {
      title: "Phone",
      render: (dataIndex, record: any) => (
        <span
          style={
            record.status === 2
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {record.userInfo.phone}
        </span>
      ),
    },
    {
      title: "Address",
      render: (dataIndex, record: any) => (
        <span
          style={
            record.status === 2
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {record.userInfo.address}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (dataIndex: any) => (
        <span>{dataIndex === 1 ? "Active" : "Block"}</span>
      ),
      sorter: (a: any, b: any) => Number(a.status) - Number(b.status),
    },

    {
      title: "Action",
      dataIndex: "id",
      render: (dataIndex: any, record: any) => {
        return (
          <div>
            {record.status === 1 ? (
              <Popconfirm
                title="Block this user"
                description="Are you sure to BLOCK this user?"
                onConfirm={() => onBlock(dataIndex)}
                okText="Yes"
                cancelText="No"
              >
                <button className="btnActionUsers">Block</button>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Unblock this user"
                description="Are you sure to UNBLOCK this user?"
                onConfirm={() => onActive(dataIndex)}
                okText="Yes"
                cancelText="No"
              >
                <button className="btnActionUsers">Unblock</button>
              </Popconfirm>
            )}
          </div>
        );
      },
      width: "20%",
    },
  ];

  const onActive = async (id: number) => {
    // setIsLoading(true)
    const result = await userService.active(id);
    if (result === 1) {
      dispatch(update());
      // setIsLoading(false)
      notifySuccess("Unblock user successfully");
    } else {
      // setIsLoading(false)
      notifyWarning("Something went wrong");
    }
  };
  const onBlock = async (id: number) => {
    setIsLoading(true)
    const result = await userService.block(id);
    if (result === 1) {
      dispatch(update());
      setIsLoading(false)
      notifySuccess("Block user successfully");
      // socket.emit("blockUser", id);
    } else {
      setIsLoading(false)
      notifyWarning("Something went wrong");
    }
  };
  const onChange = (key: string) => {
    // console.log(key);
  };

  const fetchData = async () => {
    setLoading(true);
    const data: any = await userService.getAllUsers();
    setData(data);
    setLoading(false);
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
  }, [JSON.stringify(tableParams), updateStatus]);

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IUser>
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
  const handleAddAdmin = () => {
    setPopUpAdd(true);
  };
  const offPopUpAdd = () => {
    setPopUpAdd(false);
  };
  // const handleDeleteAdmin = async (id: number) => {
  //   await userService.deleteAdmin(id);
  //   notifySuccess("Delete Success");
  //   dispatch(update());
  // };
  const handleSearchUsers = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue("");
    }
  };
  useEffect(() => {
    const getData = async () => {
      const data = await userService.searchUsers(searchValue);
      if (data === 2) {
        notifyWarning("Something went wrong");
      } else {
        setData(data);
      }
    };
    setTimeout(() => {
      getData();
    }, 1500);
  }, [searchValue]);
  // Get All admins
  const [admins, setAdmins] = useState<any[]>([]);
  const getAllAdmins = async () => {
    setIsLoading(true)
    const result = await userService.getAllAdmins();
    if (result === 2) {
      setIsLoading(false)
      notifyWarning("Something went wrong");
    } else {
      setAdmins(result);
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getAllAdmins();
  }, [updateStatus]);
  const handleDeleteAdmin = async (id:number) => {
    setIsLoading(true)
    const result = await userService.deleteAdmin(id)
    if (result === 1) {
      dispatch(update())
      setIsLoading(false)
      notifySuccess("Admin deleted")
    }else {
      setIsLoading(false)
      notifyWarning("Delete admin failed")
    }
  }
  return (
    <section className="usersAdmins">
      {isLoading && <Loading/>}
      <Tabs
        className="users"
        onChange={onChange}
        type="card"
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          if (id === "1") {
            return {
              label: `Users`,
              key: id,
              children: (
                <section className="usersGroup">
                  <div className="searchUsers">
                    <input
                      onChange={handleSearchUsers}
                      value={searchValue}
                      autoFocus
                      placeholder="Search by Name..."
                      type="text"
                    />
                  </div>
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                  />
                </section>
              ),
            };
          } else {
            return {
              label: `Admin`,
              key: id,
              children: (
                <section className="admins">
                  <table>
                    <thead>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Position</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      {admins.length > 0 &&
                        admins.map((item: any) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.fullName}</td>
                              <td>{item.userName}</td>
                              <td>{item.role === 2 ? 'President' : 'Admin'}</td>
                              <td className="adminsActions">
                                {admin.role === 2 ? (
                                  <div className="actionUsers">
                                    <Popconfirm
                                      title="Delete the task"
                                      description="Are you sure to delete this task?"
                                      onConfirm={() =>
                                        handleDeleteAdmin(Number(item.id))
                                      }
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <button>Delete</button>
                                    </Popconfirm>
                                  </div>
                                ) : (
                                  "No have access"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {admin.role === 2 ? (
                    <button onClick={handleAddAdmin} className="btnActionUsers">
                      Add+ Admin
                    </button>
                  ) : null}
                </section>
              ),
            };
          }
        })}
      />
      {popUpAdd ? <PopUpAddAdmin offPopUpAdd={offPopUpAdd} /> : null}
    </section>
  );
};

export default Users;
