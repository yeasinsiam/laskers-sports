import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
const { Option } = Select;
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addScoreTimeline,
  updateScoreTimeline,
} from "redux/scoreTimelinesSlice";
import {
  currentUserScoreTimeline,
  syncUser,
  syncUsers,
} from "redux/usersSlice";

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 5,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
};
/* eslint-enable no-template-curly-in-string */

const InsertPlayerScore = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [form] = Form.useForm();

  // state
  const { allUsers, currentUser } = useSelector((state) => state.users);
  const stateScoreTimelines = useSelector((state) => state.scoreTimelines);
  const [formDisabled, setFormDisabled] = useState(true);

  const onFinish = (values) => {
    if (currentUser.singleScoreTimeline) {
      // update timeline

      dispatch(
        updateScoreTimeline({
          scoreTimelineId: currentUser.singleScoreTimeline._id,
          body: values,
        })
      );
    } else {
      // create new timeline
      dispatch(addScoreTimeline(values));
      formRef.current.resetFields();
      setFormDisabled(true);
    }
  };

  const handleSelectPlayer = (userId) => {
    if (userId) {
      dispatch(syncUser(userId));
    } else {
      setFormDisabled(true);
    }
  };

  useEffect(() => {
    dispatch(syncUsers(true));
  }, []); //eslint-disable-line

  useEffect(() => {
    if (currentUser.user) {
      setFormDisabled(false);
    } else {
      setFormDisabled(true);
      formRef.current.resetFields();
    }
  }, [currentUser.user]);

  //setting initial value for form
  useEffect(() => {
    // form.setFieldsValue(initialValues);
    if (currentUser.singleScoreTimeline) {
      form.setFieldsValue({
        score: {
          runs: parseInt(currentUser.singleScoreTimeline.score.runs),
          wickets: parseInt(currentUser.singleScoreTimeline.score.wickets),
        },
        best: {
          runs: parseInt(currentUser.singleScoreTimeline.best.runs),
        },
      });
    } else {
      // console.log("null");
      form.resetFields([
        ["score", "runs"],
        ["score", "wickets"],
        ["best", "runs"],
      ]);
    }
  }, [form, currentUser.singleScoreTimeline]);

  return (
    <Form
      {...layout}
      form={form}
      key="insert-player-score-form"
      layout="horizontal"
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      // onValuesChange={(value) => console.log(value)}
      ref={formRef}
    >
      {/* select player */}
      <Form.Item
        key="insert-player-score-form-player"
        name="player"
        label="Select player"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          key="select-player-field"
          placeholder="Select a player"
          //   onChange={onGenderChange}
          allowClear
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          onChange={handleSelectPlayer}
          loading={allUsers.loading || currentUser.loading}
          // disabled={!allUsers.users.length}
        >
          {allUsers.users.map((user) => (
            <Option key={user._id} value={user._id}>
              {user.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        key="insert-player-score-form-date"
        name="date"
        label="Select Date"
        rules={[
          {
            type: "object",
            required: true,
            message: "Please select time!",
          },
        ]}
      >
        <DatePicker
          key="insert-player-score-form-date-field"
          dateRender={(current) => {
            // console.log(
            //   new Date(
            //     currentUser.user.scoreTimelines[0].date
            //   ).toLocaleDateString(),
            //   current._d.toLocaleDateString()
            // );

            const foundDate =
              currentUser.user === null
                ? false
                : currentUser.user.scoreTimelines.find(
                    (scoreTimeline) =>
                      new Date(scoreTimeline.date).toLocaleDateString() ===
                      current._d.toLocaleDateString()
                  );
            // console.log(foundDate);

            const style = {};

            if (foundDate) {
              style.border = "1px solid #1890ff";
              style.borderRadius = "50%";
            }

            return (
              <div className="ant-picker-cell-inner" style={style}>
                {current.date()}
              </div>
            );
          }}
          loading={currentUser.loading}
          disabled={formDisabled}
          onChange={(date) =>
            dispatch(
              currentUserScoreTimeline(
                date ? date._d.toLocaleDateString() : null
              )
            )
          }
        />
      </Form.Item>
      <Form.Item
        key="insert-player-score-form-score-runs"
        name={["score", "runs"]}
        label="Runs"
        rules={[
          {
            required: true,
            type: "number",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
          disabled={formDisabled}
        />
      </Form.Item>
      <Form.Item
        key="insert-player-score-form-score-wickets"
        name={["score", "wickets"]}
        label="Wickets"
        rules={[
          {
            required: true,
            type: "number",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
          disabled={formDisabled}
        />
      </Form.Item>
      <Form.Item
        key="insert-player-score-best-runs"
        name={["best", "runs"]}
        label="Best (runs)"
        rules={[
          {
            required: true,
            type: "number",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
          disabled={formDisabled}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ ...layout.wrapperCol, offset: 3 }}
        key="insert-player-score-form-submit"
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={
            !stateScoreTimelines.new.loading &&
            !stateScoreTimelines.update.loading &&
            formDisabled
          }
          loading={
            stateScoreTimelines.new.loading ||
            stateScoreTimelines.update.loading
          }
        >
          {currentUser.singleScoreTimeline ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertPlayerScore;
