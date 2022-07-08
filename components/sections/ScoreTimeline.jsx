import { UserOutlined } from "@ant-design/icons";
import { Avatar, Table } from "antd";
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
      <>
        <Avatar size={40} icon={<Image src={player.image} layout="fill" />} />{" "}
        {" " + player.name}
      </>
    ),
  },
  {
    title: "Today's Runs",
    dataIndex: "todaysRuns",
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
    pageSize: 1,
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
      style={{ overflow: "scroll" }}
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default ScoreTimeline;
