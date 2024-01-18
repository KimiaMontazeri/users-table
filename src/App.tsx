import UsersTable from "./components/UsersTable";
import "./App.css";

function App() {
  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get("page"));
  return <UsersTable page={page} />;
}

export default App;
