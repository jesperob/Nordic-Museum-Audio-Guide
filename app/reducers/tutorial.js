
import {
  HIDE_TUTORIAL,
  SHOW_TUTORIAL,
 } from '../actions/tutorial';

const initialState = {
  tutorialHidden: false,
};

export function tutorial(state = initialState, action) {
  switch (action.type) {
    case SHOW_TUTORIAL: {
      return (
        Object.assign({},
          state,
          {
            tutorialHidden: false,
          }
        )
      );
    }

    case HIDE_TUTORIAL: {
      return (
        Object.assign({},
          state,
          {
            tutorialHidden: true,
          }
        )
      );
    }

    default:
      return state;
  }
}
