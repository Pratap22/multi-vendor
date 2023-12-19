import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { autoLoginAsync } from "./redux/actions/user.ts";
import { shopAutoLoginAsync } from "./redux/actions/shop.ts";

store.dispatch(autoLoginAsync());
store.dispatch(shopAutoLoginAsync());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
