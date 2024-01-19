import UsersTable from "./components/UsersTable";
import { getURLSearchParam } from "./utils/SearchParams";
import "./App.css";
import {
  ADDRESS_FILTER_URL_SEARCH_PARAM,
  NAME_FILTER_URL_SEARCH_PARAM,
  ORDER_URL_SEARCH_PARAM,
  PAGE_URL_SEARCH_PARAM,
  PHONE_FILTER_URL_SEARCH_PARAM,
} from "./constants/constants";
import { Order } from "./components/SortSelect";

function App() {
  const page = Number(getURLSearchParam(PAGE_URL_SEARCH_PARAM));
  const order = getURLSearchParam(ORDER_URL_SEARCH_PARAM) as Order;
  const name = getURLSearchParam(NAME_FILTER_URL_SEARCH_PARAM);
  const address = getURLSearchParam(ADDRESS_FILTER_URL_SEARCH_PARAM);
  const phone = getURLSearchParam(PHONE_FILTER_URL_SEARCH_PARAM);
  return (
    <UsersTable
      page={page}
      order={order}
      name={name}
      address={address}
      phone={phone}
    />
  );
}

export default App;
