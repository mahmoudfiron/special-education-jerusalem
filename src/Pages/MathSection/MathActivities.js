import React from 'react';
import ContentUpload from '../../components/ContentUpload';
import ContentList from '../../components/ContentList';

const MathActivities = () => {
  return (
    <div>
      <h1>פעילויות במתמטיקה</h1>
      <ContentUpload collectionName="math-activities" />
      <ContentList collectionName="math-activities" />
    </div>
  );
};

export default MathActivities;
