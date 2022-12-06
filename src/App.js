import React, {useState} from 'react';
import Axios from "axios";
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Recipe from './Components/Recipe';
import Alert from './Components/Alert';

const App = () => {
  const[query, setQuery] = useState("");
  const[recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "your_API_ID";

  const APP_KEY = "your_API_KEY";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async() => {
    if(query !== "")
      {const result = await Axios.get(url);
    if (!result.data.hits) {
      return setAlert ("No matching results. Try a different search");
    }
    setRecipes(result.data.more)
    console.log(result)
    setAlert("");
    setQuery("");
    } else {
      setAlert("Please fill the search field");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  const onChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className="App">
      <div className="Header">
        <h1>The Recipe App</h1>
        <p> Discover new recipes everyday</p>
      </div>
      <form className ="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert = {alert}/>}
        <input type = "text" 
        placeholder = "Search recipes" 
        autoComplete='off' 
        onChange = {onChange} 
        value ={query}/>
        <input type="submit" value = "Search"/>
      </form>
      <div className="recipes">
        {recipes !== [] && 
        recipes.map(recipe => <Recipe key={uuidv4()} recipe = {recipe}/>)}
      </div>
    </div>
  );
}

export default App;
