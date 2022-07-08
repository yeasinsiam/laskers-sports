import { Badge, Dropdown, Layout, List, Space } from "antd";
import mockNotifications from "demos/mock/nofificaitons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart, Bell, Settings, Triangle } from "react-feather";
import DashHeader, { Notification } from "./styles/Header";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileDevice, setMobileDrawer } from "redux/optionsSlice";

// const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    mobile: false,
  });

  // state
  const {
    mobile: { isMobileDevice },
    name,
  } = useSelector((state) => state.options);

  const [notifications] = useState(mockNotifications);

  useEffect(() => {
    const mediaWatcher = window.matchMedia(`(max-width: 992px)`);

    dispatch(setIsMobileDevice(mediaWatcher.matches)); //setting mobile device value

    const mediaQueryChanged = (e) => {
      dispatch(setIsMobileDevice(e.matches)); //setting mobile device value
    };
    if (mediaWatcher.addEventListener) {
      mediaWatcher.addEventListener("change", mediaQueryChanged);
      return function cleanup() {
        mediaWatcher.removeEventListener("change", mediaQueryChanged);
      };
    } else {
      mediaWatcher.addListener(mediaQueryChanged);
      return function cleanup() {
        mediaWatcher.removeListener(mediaQueryChanged);
      };
    }
  }, []); //eslint-disable-line

  return (
    <DashHeader>
      <Header>
        {isMobileDevice && (
          <a
            onClick={() => dispatch(setMobileDrawer(true))}
            className="trigger"
          >
            <BarChart size={20} strokeWidth={1} />
          </a>
        )}
        <Link href="/">
          <a className="brand">
            <Triangle size={24} strokeWidth={1} />
            <strong className="mx-1 text-black">{name}</strong>
          </a>
        </Link>
        <span className="mr-auto" />
        <Space size={28} style={{ marginRight: "14px" }}>
          <Settings size={20} strokeWidth={1} />
          <Dropdown
            overlay={
              <List
                className="header-notifications"
                itemLayout="horizontal"
                dataSource={notifications}
                footer={<div>5 Notifications</div>}
                renderItem={(item) => (
                  <Notification>
                    <List.Item>
                      <List.Item.Meta
                        avatar={item.avatar}
                        title={<a>{item.title}</a>}
                        description={<small>{item.description}</small>}
                      />
                    </List.Item>
                  </Notification>
                )}
              />
            }
          >
            <div>
              <Badge count={5}>
                <span className="submenu-title-wrapper">
                  <Bell size={20} strokeWidth={1} />
                </span>
              </Badge>
            </div>
          </Dropdown>
        </Space>
      </Header>
    </DashHeader>
  );
};

export default MainHeader;
