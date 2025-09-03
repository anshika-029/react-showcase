import './App.css'
import { useState } from 'react';

function App() {

  const [search, setSearch] = useState("")

  const items = [
    "Apple", "Banana", "Mango", "Orange", "Grapes", "Pineapple", "Strawberry", "Watermelon", "Papaya", "Kiwi",
    "Cherry", "Peach", "Pear", "Plum", "Apricot", "Blueberry", "Raspberry", "Blackberry", "Coconut", "Pomegranate",
    "Lemon", "Lime", "Guava", "Dragonfruit", "Lychee", "Fig", "Date", "Cantaloupe", "Passionfruit", "Mulberry",
    "Carrot", "Tomato", "Cucumber", "Potato", "Onion", "Garlic", "Spinach", "Broccoli", "Cauliflower", "Cabbage",
    "Pumpkin", "Sweet Corn", "Radish", "Beetroot", "Ginger", "Zucchini", "Celery", "Lettuce", "Turnip", "Chili Pepper"
  ];

  const filtered = items.filter(item=>{
    return item.toLowerCase().includes(search.toLowerCase())
  });
  // OR
  // const filtered = items.filter(item=>
  //   item.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className='app'>
      <input placeholder='Search....'
      type='text'
        onChange={(e) => setSearch(e.target.value)} />
      <ul>
        {filtered.length>0?
        (filtered.map(items => <li key={items}>{items}</li>)):<p>No results found</p>}
      </ul>
    </div>
  )
}

export default App
