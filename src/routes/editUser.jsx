import { Form, useLoaderData, redirect, NavLink } from "react-router-dom";
import { updateUser } from "../utils/user";
import { getUserData } from "../utils/user";


export async function loader({ params }) {
  const userData = await getUserData(params.userId);
  return { userData };
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    
    await updateUser(params.userId, updates);
    return redirect(`/user/${params.userId}`);
  }

export default function EditUser() {
  const { userData } = useLoaderData();

  return(
    <div className="h-full flex flex-col items-center">
      <div className='w-full border-b-2'>
        <div className='text-left mt-6 w-10/12 max-w-md mx-auto space-y-2'>
        <Form method="post">
            {/* <div>
              <input
              className='font-bold border'
            placeholder="username"
            aria-label="username"
            type="text"
            name="username"
            defaultValue={userData.username}
              />
            </div> */}
            <div className='font-bold'>{userData.username}</div>
            <div className="my-[6px]">
              <input
                  className='text-sm border'
                placeholder="bio"
                aria-label="bio"
                type="text"
                name="bio"
                defaultValue={userData.bio}
              />
            </div>
            <button type="submit"><div className='text-sm font-light italic underline underline-offset-2 cursor-pointer'>save</div></button>
        </Form>

        </div>
        <div className='flex flex-row w-[22rem] my-16 justify-around mx-auto text-center'>
            <div className='flex flex-col w-16'>
                <div className='text-2xl font-bold'>{userData.completedLists}</div>
                <div className='text-sm uppercase text-neutral-600 text-center'>finished lists</div>
            </div>
            <div className='flex flex-col w-16'>
                <div className='text-2xl font-bold'>{userData.currentStreak}</div>
                <div className='text-sm uppercase text-neutral-600'>current streak</div>
            </div>
            <div className='flex flex-col w-16'>
                <div className='text-2xl font-bold'>{userData.recordStreak}</div>
                <div className='text-sm uppercase text-neutral-600'>record streak</div>
            </div>
            
        </div>
        <div className='mb-1 text-sm font-semibold uppercase text-neutral-500 tracking-wide'>lists</div>
      </div>

  
        
      <div className="flex-grow overflow-y-scroll w-full">
          {userData.lists.map((each, index) => (
              <div className={`w-10/12 max-w-md mx-auto my-4 cursor-pointer ${index !== userData.lists.length - 1 ? 'border-b-2' : ''}`} key={each._id}>
                  <NavLink to={`/lists/${each._id}`}>
                      <div className="text-left text-neutral-700 my-4">{each.topic.name}</div>
                  </NavLink>
                  <div className="my-4 flex flex-row justify-between">
                    
                    <div className="text-neutral-400 text-left uppercase ">{each.public ? 'public' : 'private'}</div>
                    <div className="text-neutral-400 text-left uppercase ">{each.completed ? '' : 'draft'}</div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {each.likes.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 items-center text-neutral-600">
                                <HandsClapping size={22} weight="light"/>
                                {each.likes.length}
                            </div>
                        )}
                        {each.comments.length > 0 && (
                            <div className={`grid gap-2 items-center text-neutral-600 ${each.likes.length === 0 ? 'col-start-2' : ''}`}>
                                <Chat size={22} weight="light"/>
                                {each.comments.length}
                            </div>
                        )}
                    </div>

                  </div>      
              </div>
          ))}
      </div>
        

    </div>
      
  )
}