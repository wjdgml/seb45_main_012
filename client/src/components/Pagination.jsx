import React, { useState } from 'react';
import '../styles/Pagination.css';
import { current } from '@reduxjs/toolkit';

const Pagination = ({posts, postsPerPage, pagesPerGroup }) => {
  const totalPosts = posts.length;
  const totalPages = Math.ceil( totalPosts / postsPerPage);
  const [ currentPage, setCurrentPage] = useState(1);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageCount = Math.ceil(totalPages / pagesPerGroup);

    for ( let i = 1 ; i <= pageCount ; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  const pageNumbers = getPageNumbers();
  
  // 페이지네이션 선택 버튼 보여줌
  const pageButtons = () => {
    const groupIndex = Math.ceil(currentPage / pagesPerGroup) - 1;
    const startIndex = groupIndex * pagesPerGroup + 1;
    const endIndex = Math.min(startIndex + pagesPerGroup - 1, pageNumbers.length);
    
    return pageNumbers.slice(startIndex-1, endIndex).map((number) => (
      <button
        key={number}
        className={currentPage === number ? 'active' : ''}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </button>
    ));
  };

  // 페이지별 포스트 보여줌
  const renderPosts = () => {
    const startIndex = ( currentPage - 1 ) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, totalPosts);
    
    return (
      <div>
        <div className='pagination'>
          <button
            onClick={() => setCurrentPage(Math.max(currentPage -1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {pageButtons}
          <button
            onClick={() => setCurrentPage(Math.min(currentPage +1, totalPages))}
            disabled={currentPage ===totalPages1}
          >
            &gt;
          </button>
        </div>
      </div>
    )
  }
}