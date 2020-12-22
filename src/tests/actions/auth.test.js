import { login, logout } from '../../actions/auth';

test('should set up login auth', () => {
    const uid = 'abc123';

    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});


test('should set up logout auth', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});
