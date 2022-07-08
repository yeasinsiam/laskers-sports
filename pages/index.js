import { Card, Divider } from "antd";
import ScoreTimeline from "components/sections/ScoreTimeline";

const Home = () => {
  return (
    <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
      <Divider orientation="left">
        <small>Timeline</small>
      </Divider>
      <div className="p-4">
        <ScoreTimeline />
      </div>
    </Card>
  );
};

export default Home;
