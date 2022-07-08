import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Table } from "antd";
import scoreTimeline from "mock/scoreTimeline";
import Image from "next/image";
import qs from "qs";
import React, { useEffect, useState } from "react";

const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     sorter: true,
  //     render: (name) => `${name.first} ${name.last}`,
  //     width: "20%",
  //   },
  //   {
  //     title: "Gender",
  //     dataIndex: "gender",
  //     filters: [
  //       {
  //         text: "Male",
  //         value: "male",
  //       },
  //       {
  //         text: "Female",
  //         value: "female",
  //       },
  //     ],
  //     width: "20%",
  //   },
  {
    title: "Sl No.",
    dataIndex: "slNo",
  },
  {
    title: "Player",
    dataIndex: "player",
    render: (player) => (
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
    width: "30%",
  },
  {
    title: "Today's Runs",
    dataIndex: "todaysRuns",
    sorter: (a, b) => a.todaysRuns - b.todaysRuns,
  },
  {
    title: "Best",
    dataIndex: "best",
  },
  {
    title: "Total Runs",
    dataIndex: "totalRuns",
  },
  {
    title: "Total Wickets",
    dataIndex: "totalWickets",
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ScoreTimeline = () => {
  const [data, setData] = useState(scoreTimeline);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
  });

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
        x: "100vw",
      }}
    />
  );
};

export default ScoreTimeline;
