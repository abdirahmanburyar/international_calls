import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Layouts from "./components/layout/Layout";
import GlobalStyle from "./GlobalStyle";
import { isAuthenticated } from "./redux/user/actions";
import AppRoutes from "./routes";
import "./styles.css";
import { ToasterProvider } from "./ui/toasterCtx/ToasterContext";
function App({ isAuthenticated, ...props }) {
  React.useEffect(() => {
    isAuthenticated()
      .then((res) => {
        if (res === 200) props.history.push("/");
      })
      .catch((status) => {
        if (status === 401) props.history.push("/login");
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <GlobalStyle />
      <ToasterProvider>
        <Layouts>
          <AppRoutes />
        </Layouts>
      </ToasterProvider>
    </>
  );
}

export default withRouter(
  connect(null, {
    isAuthenticated,
  })(App)
);
