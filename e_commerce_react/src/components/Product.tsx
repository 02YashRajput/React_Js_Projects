import { NavLink } from "react-router-dom";

type pageDatatype = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
function Product({ item }: { item: pageDatatype }) {
  return (
    <NavLink key={item.id} to={`product/${item.id}`}>
      <div className="w-52 flex flex-col justify-around items-center gap-4 hover:scale-[1.2] transition-all duration-200 ease-in-out relative ">
       
        <img src={item.image} alt={item.title} className="h-52" />
        <p>{item.title}</p>
      </div>
    </NavLink>
  );
}

export default Product;
