// import { UserOutlined } from "@ant-design/icons";
import { Avatar, Modal, Space, Table } from "antd";
import UserDeleteModal from "components/parts/UserDeleteModal";
// import { theme } from "components/styles/GlobalStyles";
// import listPlayers from "mock/listPlayers";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { showUserDeleteModal } from "redux/usersSlice";

const ListUsers = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.users);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (allUsers.users.length) {
  //     setData(allUsers.users);
  //   }
  // }, [allUsers.users]);

  const columns = [
    {
      title: "Sl No.",
      render: (_, player, index) => index + 1,
      width: "15%",
    },
    {
      title: "User",
      dataIndex: "player",
      render: (_, player) => (
        <Space size="large" className="player-cell">
          <Avatar
            size={40}
            icon={
              <Image
                src={player.images.avatar}
                width={40}
                height={40}
                alt={player.name}
              />
            }
          />
          <Link href="/">
            <a>{" " + player.name}</a>
          </Link>
        </Space>
      ),
      width: "65%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Trash2
          className="trash-icon"
          size={20}
          strokeWidth={1}
          onClick={() => dispatch(showUserDeleteModal(record._id))}
        />
      ),
      width: "20%",
    },
  ];

  return (
    <>
      <Table
        key="user-list-table"
        className="score-timeline-table"
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={allUsers.users}
        pagination={{
          position: ["none", "none"],
        }}
        loading={allUsers.loading}
      />
      <UserDeleteModal />
    </>
  );
};

export default ListUsers;
