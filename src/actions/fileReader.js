import { SET_FILE_READER_INFO } from './actionTypes';
export const setFileReaderInfo = (data) => {
  return { type: SET_FILE_READER_INFO, payload: data };
};
