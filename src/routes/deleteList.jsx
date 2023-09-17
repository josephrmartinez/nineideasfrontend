import { redirect } from "react-router-dom";
import { deleteList } from "../utils/list";

export async function action({ params }) {

  const response = await deleteList(params.listId);

  const userId = response.data

  // return redirect(`/`);
  return redirect(`/user/${userId}`);
}