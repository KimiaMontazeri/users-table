import { UserDataProps } from "..";

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
    <tr style={{ border: "3px solid white" }}>
      <td>{index}</td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{date}</td>
      <td>{address}</td>
      <td>{phone}</td>
    </tr>
  );
}
