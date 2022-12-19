/* eslint-disable default-param-last */
const initState = {
  user: {},
  fightCards: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: action.obj };

    case 'SET_FIGHT_CARDS':
      return { ...state, fightCards: action.payload };

    default:
      return state;
  }
};

export default userReducer;
