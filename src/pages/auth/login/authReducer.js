// authReducer.js
export const initialState = {
  isLogin: false,
  accessToken: null,
  user: null,
};

export default function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user, // Cập nhật user nếu có
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogin: false,
        accessToken: null,
        user: null,
      };
    default:
      return state;
  }
}
