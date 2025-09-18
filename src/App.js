import React, {useState, useEffect} from 'react';
import './App.css';


function App() {

  const [data , setData] = useState(null);
  const [write, setWrite] = useState();
  const [query, setQuery] = useState();
  const [ingredient, setIngredient] = useState([]);
  useEffect(() => {
    const fetchRecipe = async() => {
      try{
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const json = await res.json();
      console.log(json);
      setData(json);
      } catch(err){
        console.error("Failed to bring api data ...");
      }
    }
    fetchRecipe();
  },[query])
    if (!data){
      return <h2>Can't find recipe</h2>;
    }

  return (
    <div className='whole'>
      <div className='backgroundimg'>
      <div className='holder-top'>
        <div className='about'>About</div>
        <div className='gallery'>Gallery</div>
      </div>
      <div className='holder-titleandsubtitle'>
      <div className='title'>Delicious Recipes at a Glance</div>
      <div className='subtitle'>Search the recipe for your meal!</div>
      </div>
      <div className='holder-input'>
        <input value={write} onChange={(e) => {setWrite(e.target.value)}} 
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            setQuery(write);
          }
        }} className='input' placeholder='search' />
      </div>
      </div>

       {data.meals ? (
        <div>
          {data.meals.map((meals) => {
            for( let i = 1 ; i <= 20 ; i++){
              const ingredient = meals[`strIngredient${i}`]
            }

            return(
            <div>
            <div key={meals.idMeal} style={{ marginBottom: "20px" }}>
             
              <h3>{meals.strMeal}</h3>
              <div>{meals.strArea} · {meals.strCategory}</div>
              <img
                src={meals.strMealThumb}
                alt={meals.strMeal}
                style={{ width: "200px", borderRadius: "10px" }}
              />
              <div>
                {ingredient.map}
              </div>
              <div>
                {meals.strInstructions}
              </div>
              <iframe src={`https://www.youtube.com/embed/${meals.strYoutube.split("v=")[1]}`}></iframe>
            </div>
            </div>
            )
          })}
        </div>
      ) : (
        <div>No Research</div>
      )}
      <div className='deco'>s</div>
    <div className='section-about1'>
     <div className='content-about1-1'> 
      <div className='img-content-about1-1'></div>
      <div className='right-holder-content-about'>
      <div className='title-about1'>No need to worry about ingredients or how to cook!
     </div>
     <ul className='ul-content-about'>
      <li className='content-about1-1'>1. Search for the meal you want.</li>
      <li className='content-about1-2'>2. Click on the picture.</li>
      <li className='content-about1-3'>3. Enjoy the recipe — it's that easy!</li>
     </ul>
      </div>
      
     </div>
     <div className='gap'></div>
     <div className='section-about2'>
     <div className='title-about2'>User friendly
     <div className='content-about2'>We even put the youtube video for user comfort!</div>
     </div>
     <div className='img-content-about2'></div>
     </div>
     <div className='gap'></div>
    </div>
    <div className='section-gallery'>
      <div className='title-gallery'>Gallery</div>
      <div className='imges-gallery'>

      </div>
    </div>
    </div>
  );
}

export default App;
