import React from 'react';
import ContentUpload from '../../components/ContentUpload';
import ContentList from '../../components/ContentList';

const MathTeachingStrategies = () => {
  return (
    <div>
      <h1>אסטרטגיות להוראה מותאמת</h1>
      <ContentUpload collectionName="math-teaching-strategies" />
      <ContentList collectionName="math-teaching-strategies" />
    </div>
  );
};

export default MathTeachingStrategies;
