import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './DetailedPost.css';

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id); // Make sure 'posts' is the correct collection name
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="detailed-post">
      <h2>{post.mainTitle}</h2>
      {post.sections.map((section, index) => (
        <div key={index} className="section" dir="rtl">
          {section.secondaryTitle && <h3>{section.secondaryTitle}</h3>}
          {section.fileUrl && (
            <div className="media-container" dir="rtl">
              {section.fileUrl.endsWith('.mp4') ? (
                <video controls>
                  <source src={section.fileUrl} type="video/mp4" />
                </video>
              ) : (
                <img src={section.fileUrl} alt="Uploaded" className="uploaded-image" />
              )}
            </div>
          )}
          <div className="post-content" dangerouslySetInnerHTML={{ __html: section.text }} />
        </div>
      ))}
    </div>
  );
};

export default DetailedPost;
