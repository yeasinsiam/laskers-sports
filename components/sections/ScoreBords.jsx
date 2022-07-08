import { Col, Row } from "antd";
import StatCard from "components/parts/StatCard";
import { theme } from "components/styles/GlobalStyles";
import { Bell, Bookmark, MessageCircle, PhoneCall } from "react-feather";

const ScoreBords = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          type="fill"
          title="Campaigns"
          value={103}
          icon={<Bookmark size={20} strokeWidth={1} />}
          color={theme.primaryColor}
          clickHandler={() => Message.info("Campaign stat button clicked")}
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          type="fill"
          title="Customers"
          value={230}
          icon={<PhoneCall size={20} strokeWidth={1} />}
          color={theme.darkColor}
          clickHandler={() => Message.info("Customers stat button clicked")}
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          type="fill"
          title="Queries"
          value={323}
          icon={<Bell size={20} strokeWidth={1} />}
          color={theme.warningColor}
          clickHandler={() => Message.info("Queries stat button clicked")}
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          type="fill"
          title="Wickets"
          value={24}
          icon={<MessageCircle size={20} strokeWidth={1} />}
          color={theme.errorColor}
          clickHandler={() => Message.info("Opens stat button clicked")}
        />
      </Col>
    </Row>
  );
};

export default ScoreBords;
