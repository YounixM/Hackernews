import React from 'react';
import { mount } from '../../../enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { BrowserRouter as Router } from "react-router-dom";

import Stories from '../../components/stories/stories.component';

describe.skip('<Stories />', () => {
    it('renders  Stories', () => {
        const wrapper = mount(<Router> <Stories /> </Router>);

        expect(wrapper.find('.stories-container')).to.have.lengthOf(1);
    });

    it('renders Page actions', () => {
        const wrapper =  mount(<Router> <Stories /> </Router>);

        expect(wrapper.find('.page-actions')).to.have.lengthOf(1);
    });

    it('calls componentDidMount', () => {
        sinon.spy(Stories.prototype, 'componentDidMount');
        const wrapper =  mount(<Router> <Stories /> </Router>);
        expect(Stories.prototype.componentDidMount).to.have.property('callCount', 1);
        Stories.prototype.componentDidMount.restore();
    });

    it('Initial Page Number should be 0 and 1 after clicking on More button', () => {
        const wrapper = mount(<Router> <Stories /> </Router>)
        expect(wrapper.state().pageNo).to.equal(0);

        wrapper.find('button').simulate('click');
        expect(wrapper.state().pageNo).to.equal(1);
    });    
})