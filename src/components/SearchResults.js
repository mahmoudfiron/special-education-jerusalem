import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './SearchResults.css';
import DOMPurify from 'dompurify';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [expandedPostIds, setExpandedPostIds] = useState([]);
  const [targetPostId, setTargetPostId] = useState(null);
  const [scrollToPost, setScrollToPost] = useState(false);
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
          let containsSearchTerm = postData.mainTitle.toLowerCase().includes(searchQuery.toLowerCase());

          if (!containsSearchTerm) {
            postData.sections.forEach(section => {
              if (
                section.secondaryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                section.text.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                containsSearchTerm = true;
              }
            });
          }

          if (containsSearchTerm) {
            allPosts.push({ id: doc.id, collectionName, ...postData });
          }
        });
      }
      setPosts(allPosts);
    };

    fetchPosts();
  }, [searchQuery]);

  useEffect(() => {
    if (scrollToPost && targetPostId) {
      const element = document.getElementById(targetPostId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setScrollToPost(false); // Reset scroll flag after scrolling
      }
    }
  }, [scrollToPost, targetPostId]);

  const handleNavigateToPost = (collectionName, postId) => {
    let path;
    switch (collectionName) {
      case 'math-home-posts':
        path = '/math-home';
        break;
      case 'english-posts':
        path = '/english-home';
        break;
      case 'linguistic-education-posts':
        path = '/linguistic-education-home';
        break;
      default:
        path = '/';
    }
    navigate(path);
    setTargetPostId(postId);
    setScrollToPost(true);
  };

  const toggleExpandPost = (postId) => {
    setExpandedPostIds((prevExpandedPostIds) =>
      prevExpandedPostIds.includes(postId)
        ? prevExpandedPostIds.filter((id) => id !== postId)
        : [...prevExpandedPostIds, postId]
    );
  };

  const renderText = (text, postId) => {
    const wordLimit = 200;
    const words = text.split(' ');
    const isLongText = words.length > wordLimit;
    const displayText = isLongText && !expandedPostIds.includes(postId)
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;

    return (
      <div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayText) }} />
        {isLongText && (
          <span onClick={() => toggleExpandPost(postId)} className="read-more-label">
            {expandedPostIds.includes(postId) ? 'Read Less' : 'Read More'}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="search-results-page">
      <h1>Search Results</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="search-result-item" id={post.id} dir="rtl">
            <h2>{post.mainTitle}</h2>
            {post.sections.map((section, index) => (
              <div key={index} className="post-section">
                <h3>{section.secondaryTitle}</h3>
                {section.fileUrl && (
                  <div className="media-container">
                    {section.fileUrl.endsWith('.mp4') ? (
                      <video controls>
                        <source src={section.fileUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={section.fileUrl} alt="Uploaded" className="uploaded-image" />
                    )}
                  </div>
                )}
                {renderText(section.text, `${post.id}-${index}`)}
              </div>
            ))}
            <div className="post-footer">
              <span className="author-name">{post.authorName}</span>
              <span className="post-date">{new Date(post.timestamp.toMillis()).toLocaleDateString()}</span>
            </div>
            <span className="navigate-label" onClick={() => handleNavigateToPost(post.collectionName, post.id)}>
              מעבר לדף
            </span>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
