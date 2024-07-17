import { Outlet } from "react-router-dom";

import { Flex, Layout } from "antd";
import { Breadcrumbs } from "../components";

const { Header, Content } = Layout;

const LayoutOverlay = () => {
  // Layout styles
  const layoutStyle = {
    backgroundColor: "#f5f5f5",
  };
  const contentStyle = {
    minHeight: "100%",

    padding: "20px",
  };
  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    height: "91px",
  };

  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <img src="/assets/logo.png" alt="logo-flexus" />
        </Header>

        <Content style={contentStyle}>
          <Breadcrumbs />
          <Outlet />
        </Content>
      </Layout>
    </Flex>
  );
};

export default LayoutOverlay;
