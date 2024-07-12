import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './SearchResults.css';
import DOMPurify from 'dompurify';

const SearchResultsPage = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (!searchQuery) return;

    const collections = ['math-home-posts', 'english-posts', 'linguistic-education-posts']; // Add all your collection names here

    const fetchPosts = async () => {
      const allPosts = [];
      for (const collectionName of collections) {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          const plainText = DOMPurify.sanitize(postData.text, { USE_PROFILES: { html: false } });
          if (plainText.toLowerCase().includes(searchQuery.toLowerCase())) {
            allPosts.push({ id: doc.id, ...postData });
          }
        });
      }
      setPosts(allPosts);
    };

    fetchPosts();
  }, [searchQuery]);

  return (
    <div className="search-results-page">
      <h1>Search Results</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="search-result-item">
            <div className="post-header">
              <span className="author-name">{post.authorName}</span>
              <span className="post-date">{new Date(post.timestamp.toMillis()).toLocaleDateString()}</span>
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.text) }} />
            {post.fileUrl && (
              <div className="media-container">
                {post.fileUrl.endsWith('.mp4') ? (
                  <video controls>
                    <source src={post.fileUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img src={post.fileUrl} alt="Uploaded" className="uploaded-image" />
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
