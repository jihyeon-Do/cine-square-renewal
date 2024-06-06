import React from 'react';
import './skeleton.scss';

interface Type {
  type: string;
}

const SkeletonElement = ({ type }: Type) => {
  const classes = `skeleton ${type}`;
  return (
    <div className={classes}>
      <Shimmer />
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer"></div>
    </div>
  );
};

export default SkeletonElement;
