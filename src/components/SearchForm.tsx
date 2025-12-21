import React from 'react';
import './searchForm.css';

export default function SearchForm({
  active,
  formOpen,
}: {
  active: boolean;
  formOpen: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`search-form-wrap js-search-form-wrap ${active ? 'active' : ''}`}
    >
      <form className="search-form">
        <span className='icon bi-search'></span>
        <input type="text" placeholder='Search' className='form-control' />
        <button className='btn js-search-close' onClick={formOpen}>
          <span className='bi-x'></span>
        </button>
      </form>

    </div>
  )
}
