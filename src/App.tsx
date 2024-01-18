import UsersTable from "./components/UsersTable";
import { getURLSearchParam } from "./utils/SearchParams";
import "./App.css";

function App() {
  const page = Number(getURLSearchParam("page"));
  return <UsersTable page={page} />;
}

export default App;
