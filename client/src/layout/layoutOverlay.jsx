import { Breadcrumb, Flex, Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;
const LayoutOverlay = () => {
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
  const breadcrumbStyle = {
    margin: "16px 0",
  };
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <img src="/public/assets/logo.png" alt="logo-flexus" />
        </Header>

        <Content style={contentStyle}>
          <Breadcrumb
            style={breadcrumbStyle}
            items={[{ title: "Usuarios" }, { title: "Listado de usuarios" }]}
          />
          <Outlet />
        </Content>
      </Layout>
    </Flex>
  );
};

export default LayoutOverlay;
