import authReducer from "../../reducers/auth";

test('should authorise login with uid', () => {
    const uid = 'abc123';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer(uid, action);
    expect(state.uid).toEqual(action.uid);
});

test('should authorise logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: 'abc123' }, action);
    expect(state).toEqual({});
});