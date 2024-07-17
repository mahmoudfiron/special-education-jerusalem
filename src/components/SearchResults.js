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

    const collections = ['math-home-posts','math-curriculum', 'english-posts', 'linguistic-education-posts']; // Add all your collection names here

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
      case 'math-curriculum':
        path = '/math-curriculum';
        break;  
      case 'math-mapping-assessment':
        path = '/math-mapping-assessment';
        break;  
      case 'math-activities':
        path = '/math-activities';
        break;    
      case 'math-functional':
        path = '/math-functional';
        break;   
      case 'math-teaching-strategies':
        path = '/math-teaching-strategies';
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

  const getPostPath = (collectionName) => {
    switch (collectionName) {
      case 'math-home-posts':
        return 'דף ראשי מתמטיקה';
      case 'math-curriculum':
        return 'מתווים ותוכניות לימודים';
      case 'math-mapping-assessment':
        return 'מיפוי והערכה';
      case 'math-activities':
        return 'פעילויות במתמטיקה';  
      case 'math-functional':
        return 'חשבון פונקציונאלי'; 
      case 'math-teaching-strategies':
        return 'אסטרטגיות להוראה מותאמת'; 




      case 'english-posts':
        return 'English Home';
      case 'linguistic-education-posts':
        return 'Linguistic Education Home';
      default:
        return 'Home';
    }
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
            {expandedPostIds.includes(postId) ? 'קרא פחות' : 'קרא עוד'}
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
            <span className="post-path" onClick={() => handleNavigateToPost(post.collectionName, post.id)}>
              {getPostPath(post.collectionName)}
            </span>
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
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
