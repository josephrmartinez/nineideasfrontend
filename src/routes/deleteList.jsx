import { redirect } from "react-router-dom";
import { deleteList } from "../utils/list";

export async function action({ params }) {

  const userId = await deleteList(params.listId);

  return redirect(`/user/${userId}`);
}