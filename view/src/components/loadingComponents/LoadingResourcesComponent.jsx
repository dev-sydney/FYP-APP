import React from 'react';
import './../../styles/resourceStyle.scss';
import './../../styles/skeletonStyle.scss';
/**
 * This component is a skeleton loading component
 * @returns Skeleton Loading Component
 */
const LoadingResourcesComponent = () => {
  return (
    <div className="skeleton resource_loading skeleton__items professors__container">
      {[1, 2, 3, 4, 5].map((el, i) => (
        <div className="skeleton_item" key={i}>
          <div className="skeleton__info">
            <div className="image "></div>
            <div className="skeleton_name__privilege">
              <h2> </h2>
              <p> </p>
            </div>
          </div>
          <div className="skeleton_controls"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingResourcesComponent;
