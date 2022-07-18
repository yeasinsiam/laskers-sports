import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { useRef } from "react";
const { Option } = Select;
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "redux/usersSlice";
const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
    // min: ,
  },
};
/* eslint-enable no-template-curly-in-string */

const AddUser = () => {
  const dispatch = useDispatch();
  const formRef = useRef();

  // state
  const newAddedUser = useSelector((state) => state.users.newAddedUser);

  const onFinish = (values) => {
    dispatch(addUsers(values));
    formRef.current.resetFields();

    // notification["success"]({
    //   message: "A new user created!",
    //   // placement: "top",
    // });
  };

  return (
    <Form
      {...layout}
      layout="horizontal"
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      ref={formRef}
    >
      <Form.Item
        name="roles"
        label="User role"
        rules={[
          {
            required: true,
            type: "array",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Please select a user role"
          placement="topLeft"
        >
          <Option value="player">Player</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
          },
          {
            min: 6,
            message: "${label} must be minimum ${min} characters",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name={["user", "age"]}
        label="Age"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item> */}

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
        <Button
          type="primary"
          htmlType="submit"
          // disabled={newAddedUser.loading}
          loading={newAddedUser.loading}
        >
          {newAddedUser.loading ? "Creating" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
