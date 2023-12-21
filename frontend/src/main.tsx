import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { autoLoginAsync } from "./redux/actions/user.ts";
import { shopAutoLoginAsync } from "./redux/actions/shop.ts";
import { getAllProductAsync } from "./redux/actions/product.ts";

store.dispatch(autoLoginAsync());
store.dispatch(shopAutoLoginAsync());
store.dispatch(getAllProductAsync());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
