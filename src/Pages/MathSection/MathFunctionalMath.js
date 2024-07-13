import React from 'react';
import ContentUpload from '../../components/ContentUpload';
import ContentList from '../../components/ContentList';

const MathFunctionalMath = () => {
  return (
    <div>
      <h1>חשבון פונקציונאלי</h1>
      <ContentUpload collectionName="math-functional-math" />
      <ContentList collectionName="math-functional-math" />
    </div>
  );
};

export default MathFunctionalMath;
