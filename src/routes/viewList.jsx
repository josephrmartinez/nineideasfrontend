import { useLoaderData, redirect, useNavigation } from "react-router-dom";
import { getOneList } from "../utils/list";
import { HandsClapping, Chat } from "@phosphor-icons/react";


export async function loader({ params }) {
    const listData = await getOneList(params.listId);
    return { listData };
  }


export default function ViewList(){
    const { listData } = useLoaderData();

    return(
    <div className="h-full flex flex-col items-center">

        <div className="border-b-2 w-full max-w-3xl">
            <div className="w-10/12 max-w-md mx-auto my-4 cursor-pointer">
                <div className="text-left text-neutral-700 my-4" onClick={()=> console.log(listData)}>
                    {listData.topic.name}
                </div>
                <div className="my-4 flex flex-row justify-between">
                    <div className="text-neutral-400 text-left ">
                        {listData.author.username}
                    </div>
                    {/* UPDATE WITH CONDITIONAL RENDERING FOR CLAPS AND COMMENTS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-2 items-center text-neutral-600"><HandsClapping size={22} weight="light"/> 3</div>
                        <div className="grid grid-cols-2 gap-2 items-center text-neutral-600"><Chat size={22} weight="light"/> 6</div>
                    </div>
                </div>      
            </div>
        </div>
        <div className="flex-grow overflow-y-scroll">
        {listData.ideas.map((each) => (
            <div className="border-b-2 pb-4  w-10/12 max-w-md mx-auto my-4 text-left text-neutral-600" key={each._id}>
                {each.text}
            </div>))}
        </div>
    
    </div>
    )
}