import newspaperBg from '../newspaper-bg.jpg'; 

import React, { useState } from 'react';

const Search = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <div 
      className="relative h-60 w-full flex items-center" 
      style={{backgroundImage: `url(${newspaperBg})`}}
    >

      <div className="m-auto w-2/3  p-4 rounded bg-white bg-opacity-85">
         <div className="flex justify-center my-10">
            <form className="flex w-10/12" onSubmit={handleSubmit}>
                <input 
                className="w-full rounded border border-gray-200 px-3 py-2"
                type="text" 
                placeholder='Search news'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button
                className="bg-indigo-500 text-white px-4 py-2 rounded ml-2" 
                type="submit"
                >
                Search
                </button>
            </form>
         </div>
      </div>

    </div>

  );

}

export default Search;