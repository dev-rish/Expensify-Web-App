import { login, logout } from '../../actions/auth'

test('Should generate login action object', () => {
    const uid = '123abc'
    const action = login(uid)
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    })
})

test('Should generate login action object', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})