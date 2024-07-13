import React from 'react';
import ContentUpload from '../../components/ContentUpload';
import ContentList from '../../components/ContentList';

const MathHomePage = () => {
  return (
    <div className="math-home-page">
      <ContentUpload collectionName="math-home-posts" />
      <ContentList collectionName="math-home-posts" />
    </div>
  );
};

export default MathHomePage;
