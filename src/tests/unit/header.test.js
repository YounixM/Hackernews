import React from 'react';
import { shallow } from '../../../enzyme';
import { expect } from 'chai';

import Header from '../../components/header/header.component';

describe('<Header />', () => {
    it('renders an `Logo`', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('.logo')).to.have.lengthOf(1);
    });
})