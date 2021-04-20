import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/container/private-route";
import Dashboard from "../components/pages/Dashboard";
import SignIn from "../components/pages/login";
import Settings from "../components/pages/Settings";
import UserManagements from "../components/pages/User-management";
const AppRoutes = () => {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={SignIn} />
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/settings" exact component={Settings} />
        <PrivateRoute path="/users" exact component={UserManagements} />
      </Switch>
    </>
  );
};

export default AppRoutes;
