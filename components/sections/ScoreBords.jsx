import { faAngry } from "@fortawesome/free-regular-svg-icons";
import { faBaseball } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import StatCard from "components/parts/StatCard";
import { theme } from "components/styles/GlobalStyles";
import Image from "next/image";
import { Bell, Bookmark, MessageCircle, PhoneCall } from "react-feather";
import SportsBaseballOutlinedIcon from "@mui/icons-material/SportsBaseballOutlined";

const ScoreBords = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          type="fill"
          title="Best"
          value={103}
          icon={<Bookmark size={20} strokeWidth={1} />}
          color={theme.primaryColor}
          clickHandler={() => Message.info("Campaign stat button clicked")}
        />
      </Col>

      <Col xs={24} sm={12} md={8}>
        <StatCard
          type="fill"
          title="Total Runs"
          value={323}
          icon={<Bell size={20} strokeWidth={1} />}
          color={theme.warningColor}
          clickHandler={() => Message.info("Queries stat button clicked")}
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          type="fill"
          title="Wickets"
          value={24}
          icon={
            <>
              {/* <FontAwesomeIcon icon="fa-regular fa-tennis-ball" /> */}
              {/* <FontAwesomeIcon icon={["fa", "tennis-ball"]} /> */}
              {/* <FontAwesomeIcon icon={faBaseball} /> */}
              <SportsBaseballOutlinedIcon />
              {/* <FontAwesomeIcon icon="fa-solid fa-tennis-ball" /> */}
              {/* <FontAwesomeIcon icon="coffee" /> */}
              {/* <FontAwesomeIcon icon={["far", "coffee"]} /> */}
              {/* <MessageCircle size={20} strokeWidth={1} />
              <MessageCircle size={20} strokeWidth={1} /> */}
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
