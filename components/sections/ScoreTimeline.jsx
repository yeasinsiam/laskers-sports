import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Table } from "antd";
import scoreTimeline from "mock/scoreTimeline";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncUsers } from "redux/usersSlice";

const ScoreTimeline = () => {
  const dispatch = useDispatch();
  //state
  const { allUsers } = useSelector((state) => state.users);
  const [filteredPlayerData, setFilteredPlayerData] = useState([]);

  const columns = [
    {
      title: "Sl No.",
      render: (_, player, index) => index + 1,
      width: "15%",
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
                src={player.images.avatar}
                width={40}
                height={40}
                alt={player.name}
              />
            }
          />
          <Link href={`/players/${player.slug}`}>
            <a>{" " + player.name}</a>
          </Link>
        </Space>
      ),
      width: "30%",
    },
    {
      title: "Recent Runs",
      dataIndex: "recentRuns",
      render: (_, timeline) =>
        timeline.scoreTimelines.length
          ? timeline.scoreTimelines[0].score.runs
          : "-",
      sorter: (a, b) =>
        a.scoreTimelines.length ??
        a.scoreTimelines[0].score.runs - b.scoreTimelines[0].score.runs,

      defaultSortOrder: "descend",
    },
    {
      title: "Best",
      dataIndex: "bestRuns",
      render: (_, timeline) => (timeline.bestRuns ? timeline.bestRuns : "-"),
      sorter: (a, b) => a.bestRuns - b.bestRuns,
    },
    {
      title: "Total Runs",
      dataIndex: "totalScoreRuns",
      sorter: (a, b) => a.totalScoreRuns - b.totalScoreRuns,
    },
    {
      title: "Total Wickets",
      dataIndex: "totalScoreWickets",
      sorter: (a, b) => a.totalScoreWickets - b.totalScoreWickets,
    },
  ];

  // const handleTableChange = (newPagination, filters, sorter) => {
  //   console.log(newPagination, filters, sorter);
  // };

  useEffect(() => {
    dispatch(syncUsers(true));
  }, []); //eslint-disable-line

  useEffect(() => {
    if (allUsers.users.length) {
      setFilteredPlayerData(
        allUsers.users.reduce((acc, user) => {
          const isPlayerUser = user.roles.findIndex(
            (role) => role === "player"
          );
          if (isPlayerUser !== -1) {
            acc.push(user);
          }

          return acc;
        }, [])
      );
    } else {
      setFilteredPlayerData([]);
    }
  }, [allUsers.users]);
  console.log(filteredPlayerData);

  return (
    // <div>siam</div>
    <Table
      key="score-timeline-table"
      className="score-timeline-table"
      columns={columns}
      rowKey={(record) => record._id}
      dataSource={filteredPlayerData}
      loading={allUsers.loading}
      // onChange={handleTableChange}
      scroll={{
        x: "78vw",
      }}
      pagination={{
        position: ["none", "none"],
      }}
    />
  );
};

export default ScoreTimeline;
