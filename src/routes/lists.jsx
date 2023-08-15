import { useLoaderData, redirect, useNavigation, NavLink } from "react-router-dom";
import { getAllLists } from "../utils/list";
import { HandsClapping, Chat } from "@phosphor-icons/react";


export async function loader() {
    const allLists = await getAllLists();
    return { allLists };
  }


export default function Lists(){
    const { allLists } = useLoaderData();
    
    return(
        <div className="h-full overflow-y-scroll">
            {allLists.map((each) => (
                <div className="border-b-2 w-10/12 max-w-md mx-auto my-4 cursor-pointer" key={each._id} onClick={()=> console.log(each)}>
                    <NavLink to={`/lists/${each._id}`}>
                        <div className="text-left text-neutral-700 my-4">{each.topic.name}</div>
                    </NavLink>
                    <div className="my-4 flex flex-row justify-between">
                        <NavLink to={`/user/${each.author._id}`}>
                            <div className="text-neutral-400 text-left ">{each.author.username}</div>
                        </NavLink>
                        {/* UPDATE WITH CONDITIONAL RENDERING FOR CLAPS AND COMMENTS */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid grid-cols-2 gap-2 items-center text-neutral-600"><HandsClapping size={22} weight="light"/> 3</div>
                            <div className="grid grid-cols-2 gap-2 items-center text-neutral-600"><Chat size={22} weight="light"/> 6</div>
                        </div>
                    </div>      
                </div>
            ))}
        </div>
    )
}