import React from 'react';
import Editor from '../components/Editor';

const NewArticle = ({articleData, setArticleData, articles, setArticles, categories, user}) => {
  const {slug, title, description, imageUrl, category, content, state} = articleData;

  const saveAsDraftHandler = () => {
    setArticles([
      ...articles,
      {
        slug: articleData.slug,
        title: articleData.title,
        description: articleData.description,
        imageUrl: articleData.imageUrl,
        category: articleData.category,
        content: articleData.content,
        author: user.nickname, 
        state: 'draft',
      },
    ]);
    setArticleData({
      slug: "",
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      content: "",
    });
  };

  const publishHandler = () => {
    setArticles([
      ...articles,
      {
        slug: articleData.slug,
        title: articleData.title,
        description: articleData.description,
        imageUrl: articleData.imageUrl,
        category: articleData.category,
        content: articleData.content,
        author: user.nickname,
        state: 'published'
      },
    ]);
    setArticleData({
      slug: "",
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      content: "",
    });
  };

  return (
    <Editor
      slug={slug}
      title={title}
      description={description}
      imageUrl={imageUrl}
      category={category}
      state={state}
      content={content}
      data={articleData}
      setData={setArticleData}
      publishHandler={publishHandler}
      saveAsDraftHandler={saveAsDraftHandler}
      categories={categories}
      noEditSlug={false}
    />
  );
}

export default NewArticle;
