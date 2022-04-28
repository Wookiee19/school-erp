import React from 'react';

const BodyWrapper = ({children}) => {
  return (
      <div className="d-flex align-items-stretch" style={{width:'100%'}}>
        {children}
      </div>
  );
};

export default BodyWrapper;