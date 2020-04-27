import React from 'react';
import { mount, shallow } from '../../../enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Story from '../../components/story/story.component';

const storyStub =  {
    "created_at": "2020-04-26T15:19:34.000Z",
    "title": "Teleforking a Process onto a Different Computer",
    "url": "https://thume.ca/2020/04/18/telefork-forking-a-process-onto-a-different-computer/",
    "author": "trishume",
    "points": 383,
    "story_text": null,
    "comment_text": null,
    "num_comments": 94,
    "story_id": null,
    "story_title": null,
    "story_url": null,
    "parent_id": null,
    "created_at_i": 1587914374,
    "objectID": "22987747",
    "upVoted": true
}

describe('<Story />', () => {
    it('renders Story with the data', () => {        
        const wrapper = shallow(<Story story={storyStub}/>);

        expect(wrapper.find('.story')).to.have.lengthOf(1);
        expect(wrapper.find('.story .title').text()).to.equal('Teleforking a Process onto a Different Computer');
        expect(wrapper.find('.story .author .name').text()).to.equal(' trishume ');
    });


    it('Story is upVoted', () => {        
        const wrapper = shallow(<Story story={storyStub}/>);

        expect(wrapper.find('.story .upvote').hasClass('voted')).to.equal(true);
    });
})