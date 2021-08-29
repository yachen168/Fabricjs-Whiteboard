import { SET_FILE_READER_INFO } from '../actions/actionTypes';
const initialState = {
  file: '',
  totalPages: null,
  currentPageNumber: 1,
  currentPage: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FILE_READER_INFO: {
      return { ...state, ...payload };
    }

    default: {
      return state;
    }
  }
};
