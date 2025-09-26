import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../src/Detail.css'

function Detail(){
    const [meal, setMeal] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id);
    
    useEffect(() => {
        try{
            const fetchDetail = async () => {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const json = await res.json();
            if(json.meals){
             setMeal(json.meals[0]);
            }
        }
        fetchDetail();
        console.log(meal);
        } catch(err){
            console.log('Failed to fetch');
        }
    },[id])
    const youtubeID = meal.strYoutube ? meal.strYoutube.split("v=")[1] : null;

    return(
        <div className="whole-detail">
        <div className="back-detail" onClick={() => {
            navigate('/search')
        }}></div>
        <div className="holder-img-detail"><img className="img-detail" src={meal.strMealThumb} /></div>
        <div className="name-detail">{meal.strMeal}</div>
        <div className="title-instructions-detail">Instructions</div>
        <div className="content-instructions-detail">{meal.strInstructions}</div>
        <div className="title-video-detail">Youtube Video</div>
        {youtubeID && <div className="holder-iframe"><iframe className="video" frameBorder={0} src={`https://www.youtube.com/embed/${youtubeID}`}></iframe></div>}
        <div className='bottom'>
        <div>&copy; 2025 Sihyeon. All rights reserved.</div>
        </div>    
        </div>
    );
}

export default Detail;