import { Card, Divider } from "antd";

function Settings() {
  return (
    <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
      <Divider orientation="left">
        <small>Add a player</small>
      </Divider>
      <div className="p-4">Create player</div>
    </Card>
  );
}

export default Settings;
