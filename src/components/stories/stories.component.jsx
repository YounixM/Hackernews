import React, { Component } from "react";
import '../../assets/styles/stories.scss';

import { fetchItemFromLocalStorage, updateItemInLocalStorage } from '../../utils/storage.utils';
import Story from "../story/story.component";
import Spinner from "../base/spinner/spinner.component";

export default class Stories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      pageNo: 0,
      loadingStories: false,
      hiddenStories: [],
      upVotedStories: [],
    };

    this.fetchStories = this.fetchStories.bind(this);
    this.fetchMoreStories = this.fetchMoreStories.bind(this);
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
    let hiddenStories = fetchItemFromLocalStorage("hiddenStories"),
        upVotedStories = fetchItemFromLocalStorage("upVotedStories"),
        stories = [...this.state.stories, ...newStories.hits],
        updatedStories = [];

    for (let currIndex = 0; currIndex < stories.length; currIndex++) {
        let story = stories[currIndex];
        if(hiddenStories.includes(story.objectID)) {
            stories.splice(currIndex, 1);

            continue;
        }

        if(upVotedStories.includes(story.objectID)) {
          if(!story.upVoted) {
            story.upVoted = true;
            story.points += 1;
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

  fetchMoreStories() {
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

    if(story.upVoted) {
        return;
    }

    updateItemInLocalStorage("upVotedStories", story.objectID);

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
    updateItemInLocalStorage("hiddenStories", story.objectID);

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
    return (
      <div className="stories-container">
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

         {!this.state.loadingStories && !this.state.stories.length > 0 &&
            <h4> No stories available </h4>
         }
        </div>
        <div className="page-actions">
          <button
            type="button"
            className={`fetchMoreBtn action ${
              this.state.loadingStories ? "disabled" : ""
            }`}
            onClick={this.fetchMoreStories}
          >
            More
          </button>

          {this.state.loadingStories && <Spinner />}
        </div>
      </div>
    );
  }
}
