import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('should correctly add up a single expense', () => {
    const res = selectExpensesTotal([{
        id: '1',
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    }]);
    expect(res).toBe(195);
});

test('should correctly add up a multiple expenses', () => {
    console.log()
    const res = selectExpensesTotal(expenses);
    expect(res).toBe(114195);
});