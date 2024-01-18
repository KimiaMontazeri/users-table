import UsersTable from "./components/UsersTable";
import { getURLSearchParam } from "./utils/SearchParams";
import "./App.css";
import {
  ORDER_URL_SEARCH_PARAM,
  PAGE_URL_SEARCH_PARAM,
} from "./constants/constants";
import { Order } from "./components/SortSelect";

function App() {
  const page = Number(getURLSearchParam(PAGE_URL_SEARCH_PARAM));
  const order = getURLSearchParam(ORDER_URL_SEARCH_PARAM) as Order;
  return <UsersTable page={page} order={order} />;
}

export default App;
