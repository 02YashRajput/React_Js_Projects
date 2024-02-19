import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom';

function ProductList({category}:{category:string}) {
  const value = useContext(AppContext);
  return (
    
    <div className=' p-5'>
      <h1 className='text-2xl'>{category.toUpperCase()}</h1>
        <div className='flex justify-around mt-10 '>
           {
            (!value.loading?(value.filterByCategory(category).map((item,index)=>{
              return(
                <NavLink key={item.id} to={`product/${item.id}`}>

                <div  className='w-40 flex flex-col justify-around items-center gap-4 hover:scale-[1.2] transition-all duration-200 ease-in-out ' >
                  <img src={item.image} alt={item.title} className='h-52' />
                  <p>{item.title}</p>
                </div>
                </NavLink>
              )
            })):(null))
           }
        </div>
    </div>
  )
}

export default ProductList