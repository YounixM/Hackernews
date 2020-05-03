import React from 'react';
import Spinner from "../base/spinner/spinner.component";

import '../../assets/styles/page-actions.scss';

export default function PageActions (props) {
    return (
        <div className="page-actions">
          {props.loadingStories && <Spinner />}

          {props.pageNo > 0 &&
            <button
            type="button"
            className={`fetchPrevBtn action ${
              props.loadingStories ? "disabled" : ""
            }`}
              onClick={props.fetchPrevStories}
            >
              Previous
            </button>
          }
          
          <button
            type="button"
            className={`fetchNextBtn action ${
              (props.loadingStories || props.stories.length === 0) ? "disabled" : ""
            }`}
            onClick={props.fetchNextStories}
          >
            Next
          </button>
        </div>
    )
}
