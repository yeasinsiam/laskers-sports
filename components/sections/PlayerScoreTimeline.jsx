import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Table } from "antd";
import { formatDate } from "helpers/helperFunction";
import playerScoreTimeline from "mock/playerScoreTimeline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PlayerScoreTimeline = () => {
  // const [data, setData] = useState(playerScoreTimeline);
  // const [loading, setLoading] = useState(false);
  const { loading, user } = useSelector((state) => state.users.currentUser);

  // console.log(user);

  const columns = [
    {
      title: "Sl No.",
      render: (_, record, index) => index + 1,
      width: "15%",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => formatDate(date),
    },

    {
      title: "Runs",
      dataIndex: "scoreRuns",
      render: (_, record) => record.score.runs,
      sorter: (a, b) => a.score.runs - b.score.runs,
    },
    {
      title: "Wickets",
      dataIndex: "scoreWickets",
      render: (_, record) => record.score.wickets,
      sorter: (a, b) => a.score.wickets - b.score.wickets,
    },
    {
      title: "Best (Runs)",
      dataIndex: "bestRuns",
      render: (_, record) => record.best.runs,
      sorter: (a, b) => a.best.runs - b.best.runs,
    },
    // {
    //   title: "Best",
    //   dataIndex: "best",
    //   sorter: (a, b) => {
    //     // console.log("siam");

    //     return a.best - b.best;
    //   },
    // },
    // {
    //   title: "Total Runs",
    //   dataIndex: "totalRuns",
    //   sorter: (a, b) => a.totalRuns - b.totalRuns,
    // },
    // {
    //   title: "Total Wickets",
    //   dataIndex: "totalWickets",
    //   sorter: (a, b) => a.totalWickets - b.totalWickets,
    // },
  ];

  // const handleTableChange = (newPagination, filters, sorter) => {
  //   console.log(newPagination, filters, sorter);
  //   // fetchData({
  //   //   sortField: sorter.field,
  //   //   sortOrder: sorter.order,
  //   //   pagination: newPagination,
  //   //   ...filters,
  //   // });
  // };

  return (
    // <div>siam</div>
    <Table
      pagination={{
        position: ["none", "none"],
      }}
      className="score-timeline-table"
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={user.scoreTimelines}
      loading={loading}
      // onChange={handleTableChange}
      scroll={{
        x: "78vw",
      }}
    />
  );
};

export default PlayerScoreTimeline;
