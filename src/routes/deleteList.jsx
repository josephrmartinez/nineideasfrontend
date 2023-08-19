import { redirect } from "react-router-dom";
import { deleteList } from "../utils/list";

export async function action({ params }) {
  await deleteList(params.listId);
  return redirect("/");
}