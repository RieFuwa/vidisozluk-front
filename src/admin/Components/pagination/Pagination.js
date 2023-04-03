import React from 'react'

const Pagination=({userPerPage,totalUser,paginate})=>{
    const pageNumbers=[];
    for(let i = 1; i<=Math.ceil(totalUser/userPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <nav>
            <ul class="flex  text-2xl  cursor-pointer  text-white">
                {pageNumbers.map(number=>(
                    <li key={number} onClick={()=>paginate(number)} class="m-2 cur bg-lime-500 text-black border-2 px-2 rounded-full hover:bg-lime-600">
                        <a class="">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination