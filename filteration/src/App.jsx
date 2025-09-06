import './App.css'
import React, { useState, useEffect } from 'react'

function App() {
  const [meals, setMeals] = useState([]);

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Fetch options
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(res => res.json())
      .then(data => setCategories(data.meals))

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => res.json())
      .then(data => setAreas(data.meals))

  }, []);

  // Fetch meals when any filter changes
  useEffect(() => {
    const fetchMeals = async () => {
      let mealSets = [];

      if (selectedCategory) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        const data = await res.json();
        mealSets.push(data.meals || []);
      }

      if (selectedArea) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`);
        const data = await res.json();
        mealSets.push(data.meals || []);
      }

      if (mealSets.length === 0) {
        setMeals([]);
        return;
      }

      // Find intersection of meal sets
      const intersection = mealSets.reduce((acc, curr) => {
        return acc.filter(meal1 => curr.some(meal2 => meal2.idMeal === meal1.idMeal));
      });

      setMeals(intersection);
    };

    fetchMeals();
  }, [selectedCategory, selectedArea]);

  return (
    <div>
      <h2>Filters</h2>

      {/* Categories */}
      <div>
        <h3>Categories</h3>
        {categories.map((cat) => (
          <button
            key={cat.strCategory}
            className={selectedCategory === cat.strCategory ? "active-btn" : ""}
            onClick={() => setSelectedCategory(cat.strCategory)}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>

      {/* Areas */}
      <div>
        <h3>Areas</h3>
        {areas.map((area) => (
          <button
            key={area.strArea}
            className={selectedArea === area.strArea ? "active-btn" : ""}
            onClick={() => setSelectedArea(area.strArea)}
          >
            {area.strArea}
          </button>
        ))}
      </div>


      <h2>Meals</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.idMeal} style={{ border: "1px solid #ccc", padding: "10px" }}>
              <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: "150px" }} />
              <p>{meal.strMeal}</p>
            </div>
          ))
        ) : (
          <p>No meals found with selected filters.</p>
        )}
      </div>
    </div>
  )
}

export default App
