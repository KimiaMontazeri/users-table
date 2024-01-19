import { UserDataProps } from "..";
import "./User.css";

export default function User({
  id,
  name,
  date,
  address,
  phone,
  index,
}: UserDataProps & {
  index: number;
}) {
  return (
    <tr className="row">
      <td>{index}</td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{date}</td>
      <td>{address}</td>
      <td>{phone}</td>
    </tr>
  );
}
