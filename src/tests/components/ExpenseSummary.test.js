import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('should render ExpenseSummary with expenses', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={23} expenseTotal={2348574083} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with 1 expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={234} />);
    expect(wrapper).toMatchSnapshot();
});