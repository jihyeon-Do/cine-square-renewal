import React from 'react';
import SkeletonElement from '../SkeletonElement';
import './homeSkeleton.scss';

export default function HomeSkeleton() {
  return (
    <div className="home-skeleton">
      <div className="skeleton-pc">
        <SkeletonElement type={'title'} />
        <div className="movie-list">
          <SkeletonElement type={'movie-thumbnail'} />
          <SkeletonElement type={'movie-thumbnail'} />
          <SkeletonElement type={'movie-thumbnail'} />
          <SkeletonElement type={'movie-thumbnail'} />
          <SkeletonElement type={'movie-thumbnail'} />
        </div>
      </div>
      <div className="skeleton-mb">
        <SkeletonElement type={'title'} />
        <div className="movie-list">
          <SkeletonElement type={'movie-thumbnail'} />
          <SkeletonElement type={'movie-thumbnail'} />
          <SkeletonElement type={'movie-thumbnail'} />
        </div>
      </div>
    </div>
  );
}
