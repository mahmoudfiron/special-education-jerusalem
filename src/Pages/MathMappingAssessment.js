import React from 'react';
import ContentUpload from '../components/ContentUpload';
import ContentList from '../components/ContentList';

const MathMappingAssessment = () => {
  return (
    <div>
      <h1>מיפוי והערכה</h1>
      <ContentUpload collectionName="math-mapping-assessment" />
      <ContentList collectionName="math-mapping-assessment" />
    </div>
  );
};

export default MathMappingAssessment;
