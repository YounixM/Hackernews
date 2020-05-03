import React, { Component } from "react";
import '../../assets/styles/stories.scss';

import { fetchItemObjFromLocalStorage, updateVotedStoriesInLocalStorage, updateHiddenStoriesInLocalStorage } from '../../utils/storage.utils';
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

export default class Stories extends Component {
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
    this.setState({
        loadingStories: true
    }, () => {
        this.fetchStories();
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
        this.fetchStories();
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
        this.fetchStories();
      }
    );
  }

  fetchStories() {
    let url =
      "http://hn.algolia.com/api/v1/search?tags=front_page&page=" +
      this.state.pageNo;

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
            this.processStories(result);
        },
        (error) => {
          console.log(error);
        }
      );
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
