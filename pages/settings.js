import { Card, Col, Divider, Row } from "antd";
import ListUsers from "components/sections/ListUsers";
import AddUser from "components/settings/AddUser";
import InsertPlayerScore from "components/settings/InsertPlayerScore";

function Settings() {
  return (
    <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
      <Divider orientation="left">
        <small>Insert Player Score</small>
      </Divider>
      <div className="p-4">
        <InsertPlayerScore />
      </div>

      <Row>
        <Col lg={10} md={24}>
          <Divider orientation="left">
            <small>Add a user</small>
          </Divider>
          <div className="p-4">
            <AddUser />
          </div>
        </Col>
        <Col lg={14} md={24}>
          <Divider orientation="left">
            <small>List of users</small>
          </Divider>
          <div className="p-4">
            <ListUsers />
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default Settings;
