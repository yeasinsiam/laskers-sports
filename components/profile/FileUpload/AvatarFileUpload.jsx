import { Form, Upload } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AvatarFileUpload = ({ fieldName, fieldLabel }) => {
  // state
  const { user } = useSelector((state) => state.users.currentUser);

  // const [fileList, setFileList] = useState();

  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <Form.Item
      // name={["images", "avatar"]}
      name={fieldName}
      label={fieldLabel}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Upload
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        // fileList={fileList}
        // onChange={onChange}
        onPreview={onPreview}
        maxCount={1}
      >
        + Upload
      </Upload>
    </Form.Item>
  );
};

export default AvatarFileUpload;
