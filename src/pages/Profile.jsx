import React, {useState, useMemo} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Profile.css';


const Profile = ({ user, isAuthenticated, isLoading, articles }) => {
  const [userRole, setUserRole] = useState('User');

  const userArticles = useMemo(() => 
    articles.filter(article => article.author === user?.nickname),
    [articles, user]
  );

  const userId = user?.sub;

  if (!!isLoading) {
    return <div>Loading ...</div>;
  }

  const options = {
    method: 'POST',
    url: 'https://dev-stly4oktll8ycoko.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'c5RWd1WqMJB8r6D29ioPsoFKLD6kCXYj',
      client_secret: '_aTTSpoTKDROXEexn03RczVrmj5p8JeD5sHXLiQvTGJAf4hmj1o_qAHTRG3ggk2O',
      audience: 'https://dev-stly4oktll8ycoko.us.auth0.com/api/v2/'
    })
  };

  axios.request(options).then(function (response) {
    const userOptions = {
      method: 'GET',
      url: `https://dev-stly4oktll8ycoko.us.auth0.com/api/v2/users/${userId}/roles`,
      headers: {
      "authorization": `${response.data.token_type} ${response.data.access_token}`,
      }
    }

    axios.request(userOptions).then(function (response) {
      if(response.data[0].name === 'Admin') {
        setUserRole(response.data[0].name);
      } else {
        setUserRole('User');
      }
      
    }).catch(function (error) {
      console.error(error);
    });

  }).catch(function (error) {
    console.error(error);
  });

  return (
    isAuthenticated && (
      <>
        <h2 className="my-profile__title">Hello <span>{user.nickname}</span> ({userRole})</h2>
        <Link className="my-profile__new-post" to="/new-post">New Article</Link>
        <div className="articles-list__wrapper">
          {userRole === 'Admin' && (
            <table>
              <thead>
                <tr>
                  <th className="articles-list__title__header">Title</th>
                  <th className="articles-list__author__header">Author</th>
                  <th className="articles-list__state__header">State</th>
                </tr>
              </thead>
              <tbody>
                {articles.filter(article => !!article.slug).map(article => 
                  <tr key={`admin-${article.slug}`}>
                    <td className="articles-list__title__wrapper" key={`${article.slug}-admin-article`}><Link to={`/article/${article.slug}`}>{article.title}</Link></td>
                    <td className="articles-list__author" key={`${article.slug}-admin-author`}>{article.author}</td>
                    <td className="articles-list__state" key={`${article.slug}-admin-state`}>{article.state}</td>
                    {(article.author === user.nickname) && (
                      <td className="articles-list__edit-button__wrapper" key={`${article.slug}-admin-edit`}>
                        <Link className="articles-list__edit-button" to={`/edit/${article.slug}`}>
                          Edit
                        </Link>
                      </td>
                    )}
                    {(article.author !== user.nickname && article.state === 'draft') && (
                      <td className="articles-list__view-button__wrapper" key={`${article.slug}-admin-view`}>
                        <Link className="articles-list__view-button" to={`/article/${article.slug}?preview=true`}>
                          View
                        </Link>
                      </td>
                    )}

                  </tr>
                )}
              </tbody>
            </table>
          )}
          {userRole !== 'Admin' && (
            userArticles.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th className="articles-list__title__header">Title</th>
                    <th className="articles-list__state__header">State</th>
                  </tr>
                </thead>
                <tbody key="user-body">
                  {userArticles.map(article => (
                      <tr key={`user-${article.slug}`}>
                        <td className="articles-list__title__wrapper" key={`${article.slug}-user-article`}><Link to={`/article/${article.slug}`}>{article.title}</Link></td>
                        <td className="articles-list__state" key={`${article.slug}-admin-state`}>{article.state}</td>
                        <td className="articles-list__edit-button__wrapper" key={`${article.slug}-user-edit`}>
                          <Link className="articles-list__edit-button" to={`/edit/${article.slug}`}>
                            Edit
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) :
            (
              <div>You haven't written any articles yet</div>
            )
         )}
        </div>
      </>
    )
  );
};

export default Profile;
