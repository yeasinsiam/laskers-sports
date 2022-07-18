import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
const { Option } = Select;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "redux/usersSlice";
import AvatarFileUpload from "./FileUpload/AvatarFileUpload";

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 7,
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

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users.currentUser);
  const { loading } = useSelector((state) => state.users.updateUser);
  //   console.log(user);
  const isUserAdmin = !Boolean(
    user.roles.findIndex((role) => role === "admin")
  );

  const onFinish = (values) => {
    if (!values.password) {
      delete values.password;
    }

    // console.log(values);
    dispatch(updateUser({ userId: user._id, body: values }));
  };
  console.log(user.images.settings.mobileBackgroundPosition);
  return (
    <Form
      {...layout}
      layout="horizontal"
      initialValues={{
        name: user.name,
        email: user.email,
        roles: user.roles,
        images: {
          avatar: [
            {
              uid: "-1",
              name: "demo.png",
              status: "done",
              url: user.images.avatar,
            },
          ],
          cover: [
            {
              uid: "-2",
              name: "cover.png",
              status: "done",
              url: user.images.cover,
            },
          ],
          settings: {
            mobileBackgroundPosition:
              user.images.settings.mobileBackgroundPosition,
          },
        },

        // "images", "settings", "mobileBackgroundPosition"
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
      //   ref={formRef}
    >
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
        extra={"Don't want to change password! Leave this field empty"}
        rules={[
          // {
          //   required: true,
          // },
          {
            min: 6,
            message: "${label} must be minimum ${min} characters",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="roles"
        label="User role"
        extra={
          !isUserAdmin ? "To change user role please contact with admin" : null
        }
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
          disabled={!isUserAdmin}
        >
          <Option value="player">Player</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </Form.Item>

      <AvatarFileUpload fieldName={["images", "avatar"]} fieldLabel="Avater" />
      <AvatarFileUpload fieldName={["images", "cover"]} fieldLabel="Cover" />
      <Form.Item
        name={["images", "settings", "mobileBackgroundPosition"]}
        label="(MBGP)"
        rules={[
          {
            required: true,
            type: "number",
          },
        ]}
        extra={"(MBGP) Mobile background position of cover photo"}
      >
        <InputNumber addonAfter="%" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
        <Button
          type="primary"
          htmlType="submit"
          // disabled={loading}
          loading={loading}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProfileForm;
