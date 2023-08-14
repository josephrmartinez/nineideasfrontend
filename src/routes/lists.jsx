import { useLoaderData, redirect, useNavigation } from "react-router-dom";
import { getAllLists } from "../utils/list";

export async function loader() {
    const allLists = await getAllLists();
    return { allLists };
  }


export default function Lists(){
    const { allLists } = useLoaderData();
    
    return(
        <div className="h-full overflow-y-scroll">
            {allLists.map((each) => (
                <div className="border-b-2 w-10/12 mx-auto my-4 cursor-pointer" key={each._id}>
                    <div className="text-left text-neutral-700 my-4">{each.topic.name}</div>
                    <div className="text-neutral-400 text-left my-4">{each.author.username}</div>
                </div>
            ))}
        </div>
    )
}