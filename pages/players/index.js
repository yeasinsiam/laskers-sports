import { Card, Divider } from "antd";
import ListPlayers from "components/sections/ListPlayers";

const Players = () => {
  return (
    <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
      <Divider orientation="left">
        <small>All Players</small>
      </Divider>
      <div className="p-4">
        <ListPlayers />
      </div>
    </Card>
  );
};

export default Players;
