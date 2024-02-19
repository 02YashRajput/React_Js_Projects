import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Product from './Product';

function ProductList({category}:{category:string}) {
  const value = useContext(AppContext);
  return (
    
    <div className=' p-5'>
      <h1 className='text-2xl'>{category.toUpperCase()}</h1>
        <div className='flex justify-around mt-10 flex-wrap gap-10'>
           {
            (!value.loading?(value.filterByCategory(category).map((item,index)=>{
              return(
                <Product key={index} item = {item} />
              )
            })):(null))
           }
        </div>
    </div>
  )
}

export default ProductList