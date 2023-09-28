import { useLoaderData, useFetcher, NavLink, Form, useNavigate } from "react-router-dom";
import { getOneList } from "../utils/list";
import { useAuth } from "../contexts/authContext";
import { HandsClapping, TextIndent, Trash, ShareNetwork, Copy, CopySimple } from "@phosphor-icons/react";
import { toggleStatus, updateList } from "../utils/list";
import ShareList from "../components/ShareList";

export async function loader({ params }) {
    const listData = await getOneList(params.listId);
    return { listData };
  }


export async function action({ request, params }) {
    const formData = await request.formData();

    const serializedLikes = formData.get('likes'); // Get the serialized JSON string
    const parsedLikes = JSON.parse(serializedLikes); // Parse the JSON string to an array

    const listVisibility = formData.get('public');

    let updates = {}

    if (parsedLikes) {
        updates = { likes: parsedLikes };
    } else {
        updates = { public: listVisibility };
    }

    console.log("updates:", updates)
    
    return updateList(params.listId, updates);
}



export default function ViewList(){
    const { listData } = useLoaderData();
    const { userAuthData } = useAuth()
    const navigate = useNavigate()
    const isCurrentUserList = userAuthData?.userId === listData.author._id
    
    console.log("listData:", listData)
    // console.log("currentUserId:", userAuthData?.userId)

    function createListOnTopic(){
        navigate('/', { state: {topic: listData.topic}})
    }

    return(
    <div className="h-full flex flex-col items-center">

        <div className="border-b-2 w-full max-w-3xl pr-2.5">
            <div className="w-10/12 max-w-md mx-auto my-4">
                
                <div className="text-left text-neutral-700 my-4">
                    {listData.topic.name}
                </div>
                
                <div className="my-4 flex flex-row items-center justify-between">
                    <NavLink to={`/user/${listData.author._id}`}>
                        <div className="text-neutral-400 text-left ">
                            {listData.author.username}
                        </div>
                    </NavLink>
                    
                    <div className="flex flex-row items-center">

                    { isCurrentUserList && 
                    <>      
                        <VisibilityToggle listData={listData} /> 

                        <Form
                            method="post"
                            action="delete"
                            className='flex flex-row items-center'
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
                            <button type="submit"><Trash size={22} weight={'thin'} className="cursor-pointer ml-4"/></button>
                        </Form>
                    </>
                    }
                    <ShareList listData={listData}/>
                    { !isCurrentUserList &&
                    <Copy 
                    size={24} 
                    weight="light" 
                    className="cursor-pointer mr-4 text-neutral-600"
                    onClick={createListOnTopic}/>
                    }
                        <LikeIcon listData={listData} userAuthData={userAuthData}/> 
                        
                    </div>
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

const VisibilityToggle = ({listData}) => {
    const fetcher = useFetcher();
    let publicList = listData.public


    return (
        <fetcher.Form method="post" className='flex flex-row items-center'>
            <button
                name="public"
                value={publicList ? "false" : "true"} 
                className='flex flex-row items-center justify-between text-neutral-600 outline outline-1 outline-neutral-200 active:bg-neutral-100 shadow-sm rounded-full px-3 py-1 cursor-pointer'
                >
                {publicList ? 
                    <div className='text-sm uppercase select-none'>public</div>
                :
                <div className='text-sm uppercase select-none'>private</div>}
            </button>
        </fetcher.Form>
    )
}


const LikeIcon = ({listData, userAuthData}) => {
    const fetcher = useFetcher();
    let likes = [...(listData.likes ?? [])];


    const isLoggedIn = userAuthData?.userId != null;

    const hasLiked = likes.includes(userAuthData?.userId)         

    if (hasLiked) {
        likes= likes.filter(item => item !== userAuthData.userId)
    } else {
        likes.push(userAuthData?.userId)
    }

    const formContent = isLoggedIn ? (
        <fetcher.Form method="post" className='flex flex-row items-center'>
            <div className='flex flex-row items-center w-12 justify-between text-neutral-600'>
            <button
                name="likes"
                value={JSON.stringify(likes)}
                className=''
                >
                <HandsClapping size={22} weight={hasLiked ? "duotone" : "light"} color={hasLiked ? "#489757" : "#666666"}/>
            </button>
            <div className='text-xs text-left w-4'>{listData.likes?.length || ""}</div>
            </div>
        </fetcher.Form>
    ) : (
            <div className='flex flex-row items-center w-12 justify-between text-neutral-600'>
            <button
                className=''
                >
                <HandsClapping size={22} weight={"light"} color={"#666666"}/>
            </button>
            <div className='text-xs text-left w-4'>{listData.likes?.length || ""}</div>
            </div>
        
    );

    return formContent
}
