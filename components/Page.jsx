import { Spin, Layout } from "antd";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
// components
import MainHeader from "./Header";
import { theme } from "components/styles/GlobalStyles";
// styled-components
import { Container, Inner } from "./styles/Page";
import SidebarMenu from "./SidebarMenu";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setInitialPageLoading } from "redux/actions";
import NextNProgress from "nextjs-progressbar";

const { Content } = Layout;

const Page = ({ children }) => {
  const dispatch = useDispatch();
  //state
  const { pageLoading, isNotDashbord } = useSelector((state) => state.options);

  useEffect(() => {
    // Set Up page initial loader
    initialPageLoader();
  }, []); //eslint-disable-line

  // initial page loader function
  const initialPageLoader = () => {
    if (document.readyState === "ready" || document.readyState === "complete") {
      dispatch(setInitialPageLoading(false));
    } else {
      document.onreadystatechange = function () {
        if (document.readyState == "complete") {
          dispatch(setInitialPageLoading(false));
        }
      };
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NextNProgress
        showOnShallow={false}
        color={theme.infoColor}
        options={{ showSpinner: false }}
      />
      <Spin tip="Loading..." size="large" spinning={pageLoading}>
        <Container>
          {!isNotDashbord && <MainHeader />} {/* main header component */}
          <Layout className="workspace">
            {!isNotDashbord && (
              // SideMenu
              <SidebarMenu />
            )}
            <Layout>
              <Content>
                {!isNotDashbord ? <Inner>{children}</Inner> : children}
              </Content>
            </Layout>
          </Layout>
        </Container>
      </Spin>
    </ThemeProvider>
  );
};

export default Page;
