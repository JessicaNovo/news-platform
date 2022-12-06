import React, {useState, useEffect, useMemo} from 'react';
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Article from './pages/Article';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle';
import MyBookmarks from './pages/MyBookmarks';

import defaultArticles from './content/defaultArticles';

import './App.css';


const categories = ["Cat1", "Cat2", "Cat3"];

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userBookmarks, setUserBookmarks]= useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [articles, setArticles] = useState([...defaultArticles]);
  const [articleData, setArticleData] = useState({
    slug: "",
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    content: "",
  });

  useEffect(() => {
    localStorage.setItem("Posts", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Posts"));
    if (!!data) {
      setArticles([...defaultArticles, data]);
    }
  }, []);

   useEffect(() => {
    localStorage.setItem("Bookmarks", JSON.stringify(userBookmarks));
  }, [userBookmarks]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Bookmarks"));
    if (!!data) {
      setUserBookmarks([data]);
    }
  }, []);

  const publishedArticles = useMemo(() => 
    articles.filter(post => post.state === 'published'),
    [articles]
  );

  return (
      <div className="news-app">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} isAuthenticated={isAuthenticated} />
        <main>
          <Routes>
            <Route exact path="/" element={<Home articles={publishedArticles} categories={categories} />} />
            <Route path="/profile" element={<Profile user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} articles={articles} />} />
            <Route path="/article/:slug" element={
              <Article
                articles={articles}
                isAuthenticated={isAuthenticated}
                userBookmarks={userBookmarks}
                setUserBookmarks={setUserBookmarks}
              />
            } />
            <Route path="/new-post" element={
              <NewArticle
                articleData={articleData}
                setArticleData={setArticleData}
                articles={articles}
                setArticles={setArticles}
                categories={categories}
                user={user}
              />
            } />
            <Route path="/edit/:slug" element={
              <EditArticle
                articles={articles}
                setArticles={setArticles}
                categories={categories}
                user={user}
              />
            } />
            <Route path="/my-bookmarks" element={
              <MyBookmarks
                articles={articles}
                userBookmarks={userBookmarks}
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;
