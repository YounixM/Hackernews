import React, { Component } from 'react';
import Moment from 'moment';
import { getFormattedDate } from '../../utils/date.utils';

import '../../assets/styles/story.scss';

export default class Story extends Component {
    getLocation (href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
    }

    render () {
        let { story } = this.props,
            date = getFormattedDate(story.created_at),
            formattedDate = Moment(date).fromNow(),
            baseURL = this.getLocation(story.url);

    return (
        <div className='story'>
            <div className="comments"> <i className="far fa-comment-alt"></i> &nbsp; {story.num_comments} </div>
            <div
                className={`upvote ${story.upVoted ? "voted" : ""}`}
                onClick={() => this.props.upVoteStory(story)}> 
                {story.points} &nbsp; <i className="fas fa-sort-up"></i> 
            </div>
            <div className='title ellipsis'>
                <a
                    href={story.url}
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    {story.title}
                </a>
            </div>
            <div className="domain ellipsis">
                <span className='text-secondary'> ({baseURL.hostname}) </span>
            </div>
            <div className="author ellipsis">
                <span className='text-secondary'> by &nbsp; </span>
                <span className='name'> {story.author} </span>
            </div>
            <div className="posted_at text-secondary"> {formattedDate} </div>
            <div className="hide" onClick={() => this.props.hideStory(story)}> <span className='text-secondary'> [ </span> hide <span className='text-secondary'> ] </span> </div>
        </div>
    )
  }
}
