import React, {useMemo} from 'react';
import ArticleTeaser from '../components/ArticleTeaser';

import './MyBookmarks.css';


const MyBookmarks = ({articles, userBookmarks}) => {

  const bookmarkedPosts = useMemo(() => 
    articles.filter(post => userBookmarks.includes(post.slug)),
    [articles, userBookmarks]
  );

  return (
    <div className="bookmarks__list__wrapper">
      {bookmarkedPosts.map(post => (
        <ArticleTeaser content={post} className="bookmarks__list__item first-article" />
      ))}
    </div>
  );
};

export default MyBookmarks;
