import {React, useState} from 'react';
/**
 * SearchForm
 * 
 * State: formData
 * Props: handleSearch
 * 
 * {CompanyList, JobList} --> SearchForm --> Alert
 */

 function SearchForm({handleSearch}) {
 
   const [formData, setFormData] = useState({search:''});
 
   /** Update form input. */
   function handleChange(evt) {
     const { name, value } = evt.target;
     setFormData(fData => ({
       ...fData,
       [name]: value,
     }));
   }

   /** Call parent function and clear form. */
   function handleSubmit(evt) {
     evt.preventDefault();
     handleSearch(formData.search || null);
   }
   
   return (
     <form onSubmit={handleSubmit}>
       <input
           id="search"
           name="search"
           placeholder="search"
           onChange={handleChange}
           value={formData.search}
           aria-label="Search"
         />
         <button>Search!</button>
     </form>
   )
 }
 
 export default SearchForm;