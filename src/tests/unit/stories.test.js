import React from 'react';
import { mount } from '../../../enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Stories from '../../components/stories/stories.component';

describe('<Stories />', () => {
    it('renders  Stories', () => {
        const wrapper = mount(<Stories />);

        expect(wrapper.find('.stories-container')).to.have.lengthOf(1);
    });

    it('renders Page actions', () => {
        const wrapper = mount(<Stories />);

        expect(wrapper.find('.page-actions')).to.have.lengthOf(1);
    });

    it('calls componentDidMount', () => {
        sinon.spy(Stories.prototype, 'componentDidMount');
        const wrapper = mount(<Stories />);
        expect(Stories.prototype.componentDidMount).to.have.property('callCount', 1);
        Stories.prototype.componentDidMount.restore();
    });

    it('Initial Page Number should be 0 and 1 after clicking on More button', () => {
        const wrapper = mount(<Stories />);
        expect(wrapper.state().pageNo).to.equal(0);

        wrapper.find('button').simulate('click');
        expect(wrapper.state().pageNo).to.equal(1);
    });    
})