import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './SearchForm.css'
/**
 * SearchForm
 * 
 * State: formData
 * Props: handleSearch
 * 
 * {CompanyList, JobList} --> SearchForm --> Alert
 */

function SearchForm({ handleSearch }) {

  const [searchTerm, setSearchTerm] = useState('');

  /** Update form input. */
  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(searchTerm.trim() || null);
  }
  return (
    <Form className='search-form' onSubmit={handleSubmit}>
      <InputGroup size='lg'>
        <Form.Control
          id="search"
          type="text"
          name="search"
          placeholder="Enter search term.."
          onChange={handleChange}
          value={searchTerm}
          aria-label="Search"
        />
        <InputGroup.Append>
          <Button variant='primary' type='submit'> Search!</Button>
        </InputGroup.Append>
      </InputGroup>

    </Form>
  )
}

export default SearchForm;