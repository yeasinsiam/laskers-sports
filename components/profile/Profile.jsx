import { Avatar, Card, Divider, Row, Tabs } from "antd";
import PlayerScoreTimeline from "components/sections/PlayerScoreTimeline";
import ScoreBords from "components/sections/ScoreBords";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Activity, Settings } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setInitialPageLoading } from "redux/actions";
import EditProfileForm from "./EditProfileForm";

const { TabPane } = Tabs;

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.users.currentUser);
  useEffect(() => {
    if (loading) {
      dispatch(setInitialPageLoading(true));
    } else {
      dispatch(setInitialPageLoading(false));
    }
  }, [loading]); //eslint-disable-line

  return !loading && user ? (
    <div>
      <Card
        headStyle={{
          backgroundImage: `url(${user.images.cover})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${user.images.settings.mobileBackgroundPosition}%`,
          height: 400,
        }}
        bodyStyle={{ padding: 0 }}
        className="mb-4 overflow-hidden w-100"
        style={{
          height: 400,
        }}
        title={
          <Row type="flex" align="middle">
            <Avatar size={64} src={user.images.avatar} />
            {/* {!state.mobile && ( */}
            {true && (
              <div
                className="px-4 text-light"
                css={`
                  display: inline-block;
                `}
              >
                <h5 className="my-0 text-white">
                  {/* <span>Siom</span> */}
                  <b>{user.name}</b>
                </h5>
                <small style={{ textTransform: "capitalize" }}>
                  {/* Player | Admin */}
                  {user.roles.map((singleRole, index) =>
                    index + 1 === user.roles.length
                      ? `${singleRole} `
                      : `${singleRole} | `
                  )}
                </small>
              </div>
            )}
          </Row>
        }
      />

      <Tabs
        activeKey={router.query.tab}
        onTabClick={(key) =>
          router.push(`/players/${user.slug}?tab=${key}`, undefined, {
            shallow: true,
          })
        }
      >
        <TabPane
          tab={
            <span>
              <Activity
                size={20}
                strokeWidth={1}
                style={{ marginRight: ".5rem" }}
              />
              Activity
            </span>
          }
          key="activity"
        >
          {/* Score Metas */}
          <ScoreBords />
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Score Timeline</small>
            </Divider>
            <div className="p-4">
              <PlayerScoreTimeline />
            </div>
          </Card>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Settings
                size={20}
                strokeWidth={1}
                style={{ marginRight: ".5rem" }}
              />
              Settings
            </span>
          }
          key="settings"
        >
          <Card bodyStyle={{ padding: 0 }}>
            <Divider orientation="left">
              <small>Edit Profile information</small>
            </Divider>
            <div className="p-4">
              <EditProfileForm />
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  ) : null;
};

export default Profile;
