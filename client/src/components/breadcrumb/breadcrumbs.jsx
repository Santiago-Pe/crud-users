import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Breadcrumb } from "antd";

// Text
const breadcrumbsTex = {
  home: "Usuarios",
  lista_usuarios: "Lista de usuarios",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const breadcrumbStyle = {
    margin: "16px 0",
  };

  // Función
  const createBreadcrumbs = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const breadcrumbsArray = [
      {
        title: breadcrumbsTex.home,
        href: "/",
      },
    ];

    pathParts.forEach((part, index) => {
      const fullPath = `/${pathParts.slice(0, index + 1).join("/")}`;
      const nameKey = part;

      const breadcrumb = {
        title: breadcrumbsTex[nameKey] || part,
      };

      if (index < pathParts.length - 1) {
        breadcrumb.href = fullPath;
      }

      breadcrumbsArray.push(breadcrumb);
    });

    return breadcrumbsArray;
  };
  useEffect(() => {
    setBreadcrumbs(createBreadcrumbs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (breadcrumbs.length === 0) {
    return null;
  }

  return <Breadcrumb style={breadcrumbStyle} items={breadcrumbs} />;
};

export default Breadcrumbs;
