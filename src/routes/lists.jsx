import { useLoaderData, redirect, useNavigation, NavLink } from "react-router-dom";
import { getAllLists, getLists } from "../utils/list";
import { HandsClapping } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

// use params to pass page count into loader?
export async function loader({ page }) {
    const allLists = await getLists(page);
    return { allLists };
  }


export default function Lists(){
    const { allLists } = useLoaderData();
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [listData, setListData] = useState(allLists)
    


  const loadMoreLists = async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);
    const nextPage = page + 1;
    const { allLists: newLists } = await loader({ page: nextPage });
    console.log("allLists in loadMoreLists", allLists)

    if (newLists.length === 0) {
      setHasMore(false);
    } else {
    // Update allLists by merging the new lists with the existing ones
        setListData([...listData, ...newLists]); // Merge newLists with the existing listData
      setPage(nextPage);
    }

    setLoading(false);
  };

    return(
        <div className="h-full overflow-y-scroll">
            {listData.map((each) => (
                <div className="border-b-2 w-10/12 max-w-md mx-auto my-4" key={each._id} onClick={()=> console.log(each)}>
                    <NavLink to={`/lists/${each._id}`}>
                        <div className="text-left text-neutral-700 my-4">{each.topic.name}</div>
                    </NavLink>
                    <div className="my-4 flex flex-row justify-between">
                        <NavLink to={`/user/${each.author._id}`}>
                            <div className="text-neutral-400 text-left ">{each.author.username}</div>
                        </NavLink>
                        {each.likes.length > 0 && 
                            <div className="grid grid-cols-2 gap-2 items-center text-neutral-600">
                                <HandsClapping size={22} weight="light"/>
                                <div className='text-xs text-left w-4'>{each.likes?.length || ""}</div>    
                            </div>
                        }
                    </div>      
                </div>
            ))}
            {hasMore && 
            <div 
            className="text-xs text-neutral-400 mb-6 cursor-pointer border rounded-full p-2 w-28 mx-auto"
            onClick={loadMoreLists}>load more lists</div>}
        </div>
    )
}