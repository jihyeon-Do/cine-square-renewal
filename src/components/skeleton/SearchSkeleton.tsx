import React from 'react';
import SkeletonElement from '../SkeletonElement';
import './searchSkeleton.scss';

export default function SearchSkeleton() {
  return (
    <div className="search-skeleton">
      <SkeletonElement type={'thumbnail'} />
      <SkeletonElement type={'movie-text'} />
      <SkeletonElement type={'movie-text'} />
    </div>
  );
}
