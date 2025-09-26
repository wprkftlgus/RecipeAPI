import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./App";
import '../src/Search.css';
import { useNavigate } from "react-router-dom";

function Search() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("query")
    const [data , setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
                const data = await res.json();
                setData(data);
                setIsLoading(false);
                console.log(data);
            } catch(err) {
                console.error("failed to fetch")
            }
        } 
        fetchRecipe();
    },[query]);
  return(
    <div className="whole">
     <div className="home" onClick={() => {
        navigate('/');
     }}></div>
     <div><SearchBar /></div>
     <div className="titleAndHand">   
     <div className="title1-search">Click the picture!</div>
     <div className="hand"></div>
     </div>
     
     {isLoading ? (
        <div className="bugAndLoading">
        <div className="bug"></div>
        <div className="loading">loading ...</div>
        </div>) : data && data.meals ? (
        <div className="holder-map">     
        {data.meals.map((meals) => {
        for(let i = 0 ; i <= 20 ; i++){

        }
        return(
        <div key={meals.idMeal} onClick={() => {
            navigate(`/detail/${meals.idMeal}`);
        }}>
        <div className="holder-imgName" key={meals.idMeal}>
        <img className="img-meals" src={meals.strMealThumb} />
        <div className="name-meals">{meals.strMeal}</div>
        </div> 
        </div>
        ) 
        })}</div>
     ) : (
        <div className="no">No Research Found ㅠ~ㅠ</div>
     )   }
     <div className='bottom'>
     <div>&copy; 2025 Sihyeon. All rights reserved.</div>
    </div>     
    </div>
  )
}

export default Search;