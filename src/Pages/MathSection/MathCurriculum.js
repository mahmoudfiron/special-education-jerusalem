import React from 'react';
import ContentUpload from '../../components/ContentUpload';
import ContentList from '../../components/ContentList';

const MathCurriculum = () => {
  return (
    <div>
      <h1>מתווים ותוכניות לימודים</h1>
      <ContentUpload collectionName="math-curriculum" />
      <ContentList collectionName="math-curriculum" />
    </div>
  );
};

export default MathCurriculum;
