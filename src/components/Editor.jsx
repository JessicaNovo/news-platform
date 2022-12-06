import React from "react";

import './Editor.css';

const NewArticle = ({
  slug,
  title,
  description,
  imageUrl,
  category,
  state,
  content,
  publishHandler,
  saveAsDraftHandler,
  categories,
  data,
  setData,
  noEditSlug
}) => {

  return (
    <div className="new-post">
      <label>Title</label>
      <textarea
        rows="1"
        value={title}
        placeholder="Type...."
        onChange={e => setData({...data, title: e.target.value})}
      ></textarea>
      {!noEditSlug && (
        <>
          <label>Slug</label>
          <textarea
            rows="1"
            value={slug}
            placeholder="Type...."
            onChange={e => setData({...data, slug: e.target.value})}
          ></textarea>
        </>
      )}
      <label>Small Description</label>
      <textarea
        rows="5"
        value={description}
        placeholder="Type...."
        onChange={e => setData({...data, description: e.target.value})}
      ></textarea>
      <label>Image url</label>
      <textarea
        rows="1"
        value={imageUrl}
        placeholder="Type...."
        onChange={e => setData({...data, imageUrl: e.target.value})}
      ></textarea>
      <label>Category</label>
      <select value={category} onChange={e => setData({...data, category: e.target.value})}>
        {categories.map(cat => (
         <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <label>Content</label>
      <textarea
        rows="20"
        value={content}
        placeholder="Type...."
        onChange={e => setData({...data, content: e.target.value})}
      ></textarea>
      
      <div className="new-post__footer">
        {state !== 'published' && (        
          <button className="new-post__save-draft" onClick={saveAsDraftHandler}>
            Save as draft
          </button>
        )}
        <button className="new-post__publish" onClick={publishHandler}>
          Save and publish
        </button>
      </div>
    </div>
  );
}
export default NewArticle;
