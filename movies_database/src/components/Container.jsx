import { FaChevronRight } from "react-icons/fa";

const Container = ({itemName,data }) => {
  return (
    <div className='w-full h-[27rem] text-slate-500 px-5 flex flex-col justify-evenly'>
        <div className='flex items-center justify-between '>
        <h1 className='text-2xl'>{itemName.toUpperCase().split("_").join(" ")}</h1>
        <FaChevronRight />
        </div>
        <div className=' overflow-hidden h-[22rem]  relative flex gap-5 '>

        {
            data.map((value,index)=>{
                return(
                    <div key={index} className='h-[22rem] min-w-60 flex justify-around flex-col items-center'>
                        
                        <img src={`https://image.tmdb.org/t/p/w500/${value.poster_path}` } className="h-72 w-full" alt={`${value.poster_path}`}/>
                        <h3 className="text-xl font-bold">{
                                value.original_title || value.original_name
                                    ? (value.original_title || value.original_name).length > 18
                                        ? `${(value.original_title || value.original_name).substring(0, 18)}...`
                                        : value.original_title || value.original_name
                                    : "Title not available"
                            }</h3>
                    </div>
                    )
                })
}
                </div>
    </div>
  )
}

export default Container