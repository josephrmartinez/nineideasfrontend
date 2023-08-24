import { useLoaderData, redirect, useNavigation, useFetcher, NavLink, Form } from "react-router-dom";
import { getOneList } from "../utils/list";
import { useAuth } from "../contexts/authContext";
import { HandsClapping, Chat, Trash, ToggleLeft, ToggleRight } from "@phosphor-icons/react";
// import VisibilityToggle from "../components/VisibilityToggle";
import { useState } from "react";
import { toggleStatus, updateList } from "../utils/list";

export async function loader({ params }) {
    const listData = await getOneList(params.listId);
    return { listData };
  }

export async function action({ request, params }) {
let formData = await request.formData();
return updateList(params.listId, 
    (formData.get("visibilityToggle") === "true")
);
}

export default function ViewList(){
    const { listData } = useLoaderData();
    const { userAuthData } = useAuth()
    const isCurrentUserList = userAuthData.userId === listData.author._id
    
    // const [publicList, setPublicList] = useState(listData.public)
    // THIS ONLY WORKS ON MANUAL RELOAD. CHECK DATA BINDINGS ON REACT ROUTER
    // USE ACTION INSTEAD???
    // function handleToggleVisibility(){
    //     toggleStatus(listData._id, publicList)
    // }

   

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
                {/* users can view the delete and public toggle option on their OWN lists */}
                { isCurrentUserList && 
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
                    <VisibilityToggle listData={listData} /> 
                    {/* <div className="cursor-pointer uppercase text-sm text-neutral-700">public</div>                 */}
                </div>
                }
                     
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

const VisibilityToggle = ({listData}) => {
    const fetcher = useFetcher();
    let publicList = listData.public


    return (
        <fetcher.Form method="post">
            <button
                name="visibilityToggle"
                value={publicList ? "false" : "true"} 
                className='flex flex-row items-center w-[86px] justify-between text-neutral-600'
                >
                {publicList ? 
                <>
                <ToggleRight size={24} className='cursor-pointer'/>
                <div className='text-sm uppercase select-none'>public</div>
                </>
                :
                <>
                <ToggleLeft size={24} className='cursor-pointer'/>
                <div className='text-sm uppercase select-none'>private</div>
                </>}
            </button>
        </fetcher.Form>
    )
        }