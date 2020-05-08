import React, { Component } from "react";
import '../../assets/styles/stories.scss';
import queryString from 'query-string';

import { fetchItemObjFromLocalStorage, updateVotedStoriesInLocalStorage, updateHiddenStoriesInLocalStorage } from '../../utils/storage.utils';

import { withRouter } from "react-router-dom";

import { fetchFrontPageStories } from '../../services/hackernews.service';

import Story from "../story/story.component";
import Timeline from "../timeline/timeline.component";
import PageActions from "../page-actions/page-actions.component";

export function StoriesHeader () {
  return(
    <div className='storiesHeader'>
        <div className="comments"> Comments </div>
        <div className="votes"> Vote Count </div>
        <div className="upvote"> UpVote </div>
        <div className="storyDetails"> News Details </div>
    </div>
  )
}

class Stories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      pageNo: 0,
      loadingStories: false,
      hiddenStories: [],
      upVotedStories: []
    };

    this.fetchStories = this.fetchStories.bind(this);
    this.fetchNextStories = this.fetchNextStories.bind(this);
    this.fetchPrevStories = this.fetchPrevStories.bind(this);
    this.hideStory = this.hideStory.bind(this);
    this.upVoteStory = this.upVoteStory.bind(this);
  }

  componentDidMount() {
    let values = queryString.parse(this.props.location.search),
      pageNo = parseInt(values.pageNo);

    if(Number.isNaN(pageNo)) {
      // If not a valid pageNo, set pageNo to 0;
      pageNo = 0;
    }
    
    this.setState({
        pageNo: pageNo,
        loadingStories: true
    }, () => {
        this.fetchStories(pageNo);
    });
  }

  processStories (newStories) {
    let hiddenStories = fetchItemObjFromLocalStorage("hiddenStories"),
        upVotedStories = fetchItemObjFromLocalStorage("upVotedStories"),
        stories = [...newStories.hits],
        updatedStories = [];

    for (let currIndex = 0; currIndex < stories.length; currIndex++) {
        let story = stories[currIndex],
          storyID = story.objectID;

        if(hiddenStories[storyID]) {
            stories.splice(currIndex, 1);

            continue;
        }

        if(upVotedStories[storyID]) {
          if(!story.upVoted) {
            story.upVoted = true;
            story.points += upVotedStories[storyID].count;
          }
        } else {
            story.upVoted = false;
        } 
        
        updatedStories.push(story);
    }

    this.setState({
        stories: updatedStories,
        loadingStories: false,
    });
  }

  fetchPrevStories() {
    this.setState(
      (prevState) => ({
        pageNo: prevState.pageNo - 1,
        loadingStories: true,
      }),
      () => {
        this.props.history.push(`${window.location.pathname}?pageNo=${this.state.pageNo}`);
        this.fetchStories(this.state.pageNo);
      }
    );
  }


  fetchNextStories() {
    this.setState(
      (prevState) => ({
        pageNo: prevState.pageNo + 1,
        loadingStories: true,
      }),
      () => {
        this.props.history.push(`${window.location.pathname}?pageNo=${this.state.pageNo}`);
        this.fetchStories(this.state.pageNo);
      }
    );
  }

  fetchStories = async (pageNo) => {
    try {
      let result = await fetchFrontPageStories(pageNo);
      console.log(result);
      this.processStories(result);
    } catch(error) {
      console.error(error);
    }
  }

  upVoteStory(story) {
    updateVotedStoriesInLocalStorage("upVotedStories", story.objectID);

    let { stories } = this.state;

    for (let currIndex = 0; currIndex < stories.length; currIndex++) {
        if (stories[currIndex].objectID === story.objectID) {
            stories[currIndex].upVoted = true;
            stories[currIndex].points += 1;
            break;
        }
    }

    this.setState({
        stories
    })
  }

  hideStory(story) {
    updateHiddenStoriesInLocalStorage("hiddenStories", story.objectID);

    let { stories } = this.state;

    for (let currIndex = 0; currIndex < stories.length; currIndex++) {
        if (stories[currIndex].objectID === story.objectID) {
            stories.splice(currIndex, 1);
            break;
        }
    }

    this.setState({
        stories
    })
  }

  render() {
    let noStories = !this.state.loadingStories && !this.state.stories.length;

    return (
      <div className={`stories-container ${noStories ? "noStoriesAvailable" : ""}`}>
        
        {this.state.stories.length > 0 &&
          <StoriesHeader />
        }
        <div
          className={`stories ${this.state.loadingStories ? "loading" : ""}`}
        >
          {this.state.stories.map((story) => {
            if (story.isHidden) {
                return;
            }

            return (
              <Story
                key={story.objectID}
                story={story}
                hideStory={this.hideStory}
                upVoteStory={this.upVoteStory}
              />
            );
          })
         }

         {noStories > 0 &&
            <div className="noStories">
              <div className='notFound'> 404 </div>
              <div className="title"> No stories found </div>
            </div>
         }
        </div>

        <PageActions
          stories={this.state.stories}
          pageNo={this.state.pageNo}
          loadingStories={this.state.loadingStories} 
          fetchPrevStories={this.fetchPrevStories}
          fetchNextStories={this.fetchNextStories}
        />

        {this.state.stories.length > 0 &&
          <Timeline data={this.state.stories} />
        }
      </div>
    );
  }
}

export default withRouter(Stories);
