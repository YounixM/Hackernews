import React from 'react';
import { mount } from '../../../enzyme';
import { expect } from 'chai';
import { BrowserRouter as Router } from "react-router-dom";

import Home from '../../components/home/home.component';

describe('<Home />', () => {
    it('renders Header and Stories', () => {
        const wrapper = mount(<Router> <Home /> </Router>);

        expect(wrapper.find('.header')).to.have.lengthOf(1);
        expect(wrapper.find('.stories-container')).to.have.lengthOf(1);
    });
})