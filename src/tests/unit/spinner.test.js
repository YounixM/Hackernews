import React from 'react';
import { shallow } from '../../../enzyme';
import { expect } from 'chai';

import Spinner from '../../components/base/spinner/spinner.component';

describe('<Spinner />', () => {
    it('renders an `Spinner`', () => {
        const wrapper = shallow(<Spinner />);
        expect(wrapper.find('.spinner')).to.have.lengthOf(1);
    });
})