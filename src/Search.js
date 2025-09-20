import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./App";
import '../src/Search.css';

function Search() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("query")
    const [data , setData] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
                const data = await res.json();
                setData(data);
                console.log(data);
            } catch(err) {
                console.error("failed to fetch")
            }
        } 
        fetchRecipe();
    },[query]);
  return(
    <div className="whole">
     <div><SearchBar /></div>
     <div className="holder-map">   
     {data && data.meals ? (
        data.meals.map((meals) => {
        for(let i = 0 ; i <= 20 ; i++){

        }
        return(
        <div>
        <div className="holder-imgName" key={meals.idMeal}>
        <img className="img-meals" src={meals.strMealThumb} />
        <div className="name-meals">{meals.strMeal}</div>
        </div> 
        </div>
        ) 
        })
     ) : (
        <div>error</div>
     )}  
    </div>  
    </div>
  )
}

export default Search;