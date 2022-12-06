import React from 'react';
import { Link } from 'react-router-dom';

import './ArticleTeaser.css';


const ArticleTeaser = ({content, className}) => {
  const {slug, imageUrl, title, description}= content;

  return (
    !!slug && !!title && (
      <div className={`article-teaser__wrapper ${className}`} key={slug}>
        <img className="article-teaser__image" src={imageUrl} alt={`Cover ${title}`}/>
        <div className="article-teaser__text-wrapper">
          <div>
            <h2 className="article-teaser__title">{title}</h2>
            <p className="article-teaser__description">{description}</p>
          </div>
          <Link className="article-teaser__read-more" to={`/article/${slug}`}>Read more</Link>
        </div>
      </div>
    )
  );
};

export default ArticleTeaser;
