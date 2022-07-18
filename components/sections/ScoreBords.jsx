import { Col, Row } from "antd";
import StatCard from "components/parts/StatCard";
import { theme } from "components/styles/GlobalStyles";
import { Bookmark } from "react-feather";
import SportsBaseballOutlinedIcon from "@mui/icons-material/SportsBaseballOutlined";
import SportsCricketOutlinedIcon from "@mui/icons-material/SportsCricketOutlined";
import { useSelector } from "react-redux";

const ScoreBords = () => {
  const { user } = useSelector((state) => state.users.currentUser);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          type="fill"
          title="Best"
          value={`${user.bestRuns ? user.bestRuns : 0} (Runs)`}
          icon={<Bookmark size={20} strokeWidth={1} />}
          color={theme.primaryColor}
          clickHandler={() => Message.info("Campaign stat button clicked")}
        />
      </Col>

      <Col xs={24} sm={12} md={8}>
        <StatCard
          type="fill"
          title="Total Runs"
          value={user.totalScoreRuns}
          icon={<SportsCricketOutlinedIcon />}
          color={theme.warningColor}
          clickHandler={() => Message.info("Queries stat button clicked")}
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          type="fill"
          title="Wickets"
          value={user.totalScoreWickets}
          icon={
            <>
              <SportsBaseballOutlinedIcon />
            </>
          }
          color={theme.errorColor}
          clickHandler={() => Message.info("Opens stat button clicked")}
        />
      </Col>
    </Row>
  );
};

export default ScoreBords;
