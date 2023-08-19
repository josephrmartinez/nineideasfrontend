import { useLoaderData, redirect, useNavigation, NavLink, Form } from "react-router-dom";
import { getOneList } from "../utils/list";
import { HandsClapping, Chat, Trash } from "@phosphor-icons/react";
import VisibilityToggle from "../components/VisibilityToggle";
import { useState } from "react";
import { toggleStatus } from "../utils/list";

export async function loader({ params }) {
    const listData = await getOneList(params.listId);
    return { listData };
  }


export default function ViewList(){
    const { listData } = useLoaderData();
    const [privateList, setPrivateList] = useState(listData.visible)


    // THIS ONLY WORKS ON MANUAL RELOAD. CHECK DATA BINDINGS ON REACT ROUTER
    function handleToggleVisibility(){
        toggleStatus(listData._id, !privateList)
    }

    function deleteList(){
        null
    }

    return(
    <div className="h-full flex flex-col items-center">

        <div className="border-b-2 w-full max-w-3xl">
            <div className="w-10/12 max-w-md mx-auto my-4">
                <div className="text-left text-neutral-700 my-4">
                    {listData.topic.name}
                </div>
                <div className="my-4 flex flex-row justify-between">
                    <NavLink to={`/user/${listData.author._id}`}>
                        <div className="text-neutral-400 text-left ">
                            {listData.author.username}
                        </div>
                    </NavLink>
                    {/* UPDATE WITH CONDITIONAL RENDERING FOR CLAPS AND COMMENTS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-2 items-center text-neutral-600"><HandsClapping size={22} weight="light"/> 3</div>
                        <div className="grid grid-cols-2 gap-2 items-center text-neutral-600"><Chat size={22} weight="light"/> 6</div>
                    </div>
                </div>
                <div className="flex flex-row justify-end">
                
                    <div className="mr-12">
                    <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit"><Trash size={22} weight={'thin'} className="cursor-pointer"/></button>
          </Form>
                        
                    </div>
                    {/* <VisibilityToggle privateList={privateList} onToggleClick={handleToggleVisibility}/>  */}
                    <div className="cursor-pointer uppercase text-sm text-neutral-700">public</div>                
                </div>
                     
            </div>
        </div>

        <div className="flex-grow overflow-y-scroll w-full">
        {listData.ideas.map((each) => (
            <div className="border-b-2 pb-4 w-10/12 max-w-md mx-auto my-4 text-left text-neutral-600" key={each._id}>
                {each.text}
            </div>))}
        </div>
    
    </div>
    )
}