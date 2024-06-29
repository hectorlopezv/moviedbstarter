import { Outlet } from "react-router-dom";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import store from "../redux/store";

function Root() {
  return (
    <Provider store={store}>
      <Layout>
        <Outlet />
      </Layout>
    </Provider>
  );
}

export default Root;
