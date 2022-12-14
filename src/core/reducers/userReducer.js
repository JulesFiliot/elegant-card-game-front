/* eslint-disable default-param-last */
const initState = {
  user: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { user: action.obj };

    default:
      return state;
  }
};

export default userReducer;
