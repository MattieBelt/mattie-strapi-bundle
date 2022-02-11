import produce from 'immer';
import pluginId from '../pluginId';
import { IS_LOADING_SETTINGS, RESOLVE_SETTINGS, UPDATE_SETTINGS } from './constants';

export const initialState = {
  isLoading: true,
  settings: {},
  contentTypes: [],
};

// eslint-disable-next-line default-param-last
const settingsReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_SETTINGS: {
      state.isLoading = action.isLoading ?? true;
      break;
    }

    case RESOLVE_SETTINGS: {
      state.isLoading = false;
      state.settings = action.settings;
      state.contentTypes = action.contentTypes;
      break;
    }

    case UPDATE_SETTINGS: {
      state.isLoading = false;
      state.settings = action.settings;
      break;
    }

    default:
      return state;
  }

  return state;
});

const reducers = {
  [`${pluginId}_settings`]: settingsReducer,
};

export default reducers;
