import removeCursor from './images/remove.svg';

const getCursor = ({ type }) => {
  switch (type) {
    case 'eraser': {
      return removeCursor;
    }

    default: {
      return '';
    }
  }
};

export default getCursor;
