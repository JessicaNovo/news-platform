import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Editor from '../components/Editor';

const EditArticle = ({categories, articles, setArticles, user}) => {
  const location = useLocation();
  const path = location.pathname;

  const [postToEdit, setPostToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const editPost = articles && articles.find(post => `/edit/${post.slug}` === path);

    setPostToEdit(editPost);
  }, [articles, path, setPostToEdit]);

  useEffect(() => {
    if (!!postToEdit) {
      setLoading(false);
    }
  }, [postToEdit]);

   const saveAsDraftHandler = () => {
    setArticles([
      ...articles.filter(article => `/edit/${article.slug}` !== path),
      {
        slug: postToEdit.slug,
        title: postToEdit.title,
        description: postToEdit.description,
        imageUrl: postToEdit.imageUrl,
        category: postToEdit.category,
        content: postToEdit.content,
        author: user.nickname, 
        state: 'draft',
      },
    ]);
  };

  const publishHandler = () => {
    setArticles([
      ...articles.filter(article => `/edit/${article.slug}` !== path),
      {
        slug: postToEdit.slug,
        title: postToEdit.title,
        description: postToEdit.description,
        imageUrl: postToEdit.imageUrl,
        category: postToEdit.category,
        content: postToEdit.content,
        author: user.nickname,
        state: 'published'
      },
    ]);
  };

  
  return (
    (!loading ) ?  (
      <Editor
        noEditSlug
        slug={postToEdit.slug}
        title={postToEdit.title}
        description={postToEdit.description}
        imageUrl={postToEdit.imageUrl}
        category={postToEdit.category}
        state={postToEdit.state}
        content={postToEdit.content}
        publishHandler={publishHandler}
        saveAsDraftHandler={saveAsDraftHandler}
        categories={categories}
        data={postToEdit}
        setData={setPostToEdit}
      />
    ) : (
      <div>Loading...</div>
    )
  );
}

export default EditArticle;
