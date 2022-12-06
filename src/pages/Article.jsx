import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import bookmark from '../content/bookmark.svg';
import bookmarkFill from '../content/bookmark-fill.svg';

import './Article.css';


const Article = ({articles, isAuthenticated, userBookmarks, setUserBookmarks}) => {
  const location = useLocation();
  const path = location.pathname;
  const {title, content, author, imageUrl, category, slug} = articles.find(post => `/article/${post.slug}` === path);

  const [marked, serMarked] = useState(false);

  useEffect(() => {
    if (!!marked && !userBookmarks.includes(slug)) {
      setUserBookmarks([...userBookmarks, slug]);
    }
  }, [marked, userBookmarks, setUserBookmarks, slug]);
  
  return (
    isAuthenticated ? (
      <>
        <div className="article__bookmark__wrapper">
          <button className="article__bookmark" type="submit" onClick={() => serMarked(!marked)}>
            <img src={marked ? bookmarkFill : bookmark} alt="bookmark" height={24} width={24} />
          </button>
        </div>
        <div className="article__wrapper">
          <h2 className="article__title">{title}</h2>
          <p  className="article__category">{category}</p>
          <img className="article__image" src={imageUrl} alt={`Cover ${title}`} />
          <div className="article__content">{content}</div>
          <div className="article__author">Written by <span>{author}</span></div>
        </div>
      </>
    ) : (
      <div className="sign-up__wrapper">
        <div className="sign-up__cta">Please sign up to read the articles and contribute to the community</div>
        <LoginButton className="read-article__login" />
      </div>
    )
  );
 
};

export default Article;
