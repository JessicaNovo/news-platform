import React, {useMemo, useState} from "react";
import ReactPaginate from 'react-paginate';
import ArticleTeaser from '../components/ArticleTeaser';

import './Home.css';


const Home = ({articles, categories}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const filteredArticles = useMemo(() => 
    articles.filter(post => post.category === selectedCategory),
    [articles, selectedCategory]
  );

  const posts = selectedCategory === '' ? articles.slice(1) : filteredArticles;

  // Handling pagination
  const postsPerPage = 8;
  const pageCount = selectedCategory === '' ? Math.ceil(articles.length / postsPerPage) : Math.ceil(filteredArticles.length / postsPerPage);
  const [postOffset, setPostOffset] = useState(0);

  const endOffset = postOffset + postsPerPage;
  const currentPosts = posts.slice(postOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * postsPerPage) % posts.length;
    setPostOffset(newOffset);
  };

  return (
    <div className="homepage__wrapper">
      <ArticleTeaser content={articles[0]} className="first-article"/>
      <div className="homepage__categories">
        <div>Categories:</div>
        {categories.map(cat =>
            <button
              type="submit"
              className={`homepage__category ${selectedCategory === cat && 'selected'}`}
              key={cat}
              onClick={() =>
                selectedCategory === cat ? 
                  setSelectedCategory('') :
                  setSelectedCategory(cat)
              }
            >
              {cat}
            </button>
        )}
      </div>
      <div className="homepage__articles-list">
        {currentPosts.map(post => (
          <ArticleTeaser content={post} className="list-article"/>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
};

export default Home;
