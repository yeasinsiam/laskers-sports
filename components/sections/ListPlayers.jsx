import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Table } from "antd";
import listPlayers from "mock/listPlayers";
import Image from "next/image";
import qs from "qs";
import React, { useEffect, useState } from "react";

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ListPlayers = () => {
  const [data, setData] = useState(listPlayers);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
  });

  const columns = [
    {
      title: "Sl No.",
      dataIndex: "slNo",
      width: "10%",
    },
    {
      title: "Player",
      dataIndex: "player",
      render: (_, player) => (
        <Space size="large" className="player-cell">
          <Avatar
            size={40}
            icon={
              <Image
                src={player.image}
                width={40}
                height={40}
                alt={player.name}
              />
            }
          />
          <a href={player.fbUrl}>{" " + player.name}</a>
        </Space>
      ),
    },
  ];

  const handleTableChange = (newPagination, filters, sorter) => {
    console.log(newPagination, filters, sorter);
    // fetchData({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination: newPagination,
    //   ...filters,
    // });
  };

  return (
    // <div>siam</div>
    <Table
      className="score-timeline-table"
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      scroll={{
        x: "78vw",
      }}
    />
  );
};

export default ListPlayers;
