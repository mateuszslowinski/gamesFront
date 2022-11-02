import {useParams, useSearchParams} from "react-router-dom";

export const SearchGames =()=>{
    const[searchParams,setSearchParams]=useSearchParams()
    console.log(searchParams.get('search'))
    return(
        <div>searchgames</div>
    )
}
