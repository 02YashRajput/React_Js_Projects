import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Container = ({ itemName, data }) => {
  const navigate = useNavigate()
  const scrollRef = useRef(null);
  const leftButton = useRef(null);
  const rightButton = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  // Use useLayoutEffect to get the scroll width immediately
  useLayoutEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const width = scrollElement.scrollWidth;
      setScrollWidth(width);
    }
  }, [data]);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const handleScroll = () => {
      if (scrollElement) {
        setScrollPosition(scrollElement.scrollLeft);
      }
    };

    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollPosition <= 0) {
      leftButton.current.style.display = "none";
    } else {
      leftButton.current.style.display = "flex";
    }

    if (scrollPosition >= scrollWidth - scrollElement.clientWidth) {
      rightButton.current.style.display = "none";
    } else {
      rightButton.current.style.display = "flex";
    }
  }, [scrollPosition, scrollWidth]);
  const handleScrollLeft = () => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scrollAmount = (scrollElement.clientWidth * -1) / 2;
      scrollElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(scrollElement.scrollLeft + scrollAmount);
    }
  };

  const handleScrollRight = () => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scrollAmount = scrollElement.clientWidth / 2;
      scrollElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(scrollElement.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="w-full h-[27rem] text-slate-500 px-5 flex flex-col justify-evenly relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">
          {(itemName.split("_")[0] === "tv")?(`${itemName.toUpperCase().split("_")[0]} SHOW ${itemName.toUpperCase().split("_").slice(1).join(" ")}`):(itemName.toUpperCase().split("_").join(" "))}
        </h1>
        
        <FaChevronRight className="cursor-pointer" onClick={()=>{navigate(`/category/${itemName}`)} }/>
      </div>
      <button
        ref={leftButton}
        onClick={handleScrollLeft}
        className="absolute top-1/2 -translate-y-1/2 translate-x-2 left-0   z-10 h-10 w-10 rounded-full flex items-center justify-center bg-[rgba(0,0,0,0.7)]  dark:bg-black dark:text-white"
      >
        <FaChevronLeft />
      </button>
      <div
        ref={scrollRef}
        className="transition-all duration-800 ease-in-out overflow-x-scroll h-[22rem] overflow-y-hidden relative flex gap-5 hidingscrollbar"
      >
        {data.map((value, index) => (
          <NavLink to={`${itemName.split("_")[0]}/${value.id}`} key={value.id} >
            <div
              key={index}
              className="h-[22rem] min-w-60 flex justify-around flex-col items-center"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`}
                className="h-72 w-full"
                alt={`${value.poster_path}`}
              />

              <h3 className="text-xl font-bold">
                {value.original_title || value.original_name
                  ? (value.original_title || value.original_name).length > 18
                    ? `${(
                        value.original_title || value.original_name
                      ).substring(0, 18)}...`
                    : value.original_title || value.original_name
                  : "Title not available"}
              </h3>
            </div>
          </NavLink>
        ))}
      </div>
      <button
        ref={rightButton}
        onClick={handleScrollRight}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-2 right-0  z-10 h-10 w-10 rounded-full flex items-center justify-center bg-[rgba(0,0,0,0.7)]  dark:bg-black dark:text-white"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Container;
