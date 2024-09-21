import { FaSearch } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const hanldeSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
    
  }
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    console.log(searchTermFromUrl)
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  return (
    <header className="bg-slate-200 shadow-sm ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Anil</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form onSubmit={hanldeSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64 ">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>   <FaSearch className="text-slate-500" /></button>
       
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            {" "}
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="anil"
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <li className=" sm:inline text-slate-700 hover:underline cursor-pointer">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};
