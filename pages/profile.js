import { Avatar, Button, Card, Menu, Row } from "antd";
import { Share } from "react-feather";

const profile = () => {
  return (
    <div>
      {" "}
      <Card
        headStyle={{
          backgroundImage: "url(/images/siom.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
          height: 400,
        }}
        bodyStyle={{ padding: 0 }}
        className="mb-4 overflow-hidden w-100"
        style={{
          height: 400,
        }}
        title={
          <Row type="flex" align="middle">
            <Avatar
              size={64}
              src="https://scontent.fdac27-2.fna.fbcdn.net/v/t39.30808-6/271747629_448232366779856_1409621942675144598_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFx7KIgLcb3SqTecZjWpIS8X4aqcmNCwy5fhqpyY0LDLpDPYclQ9Ceu3WmEpVNGeeQYABwafV4VWN_i2FXEAwvJ&_nc_ohc=0o6RNwkhwBsAX_Q0kmV&tn=38tIHbBnj_ZMzYEv&_nc_ht=scontent.fdac27-2.fna&oh=00_AT_y3qRJXbKejAgj4kXk_xcvvFq2CiNUQ-pUAarrTBE7ig&oe=62CBDF56"
            />
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
                  <b> Siom</b>
                </h5>
                <small>Player | Admin</small>
              </div>
            )}
          </Row>
        }
      />
    </div>
  );
};

export default profile;
