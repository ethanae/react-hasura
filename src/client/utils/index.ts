import { ToastsStore } from 'react-toasts';
import { Notice } from '../types';

export function createToast(notice: Notice) {
  switch (notice.type) {
    case 'info': 
      ToastsStore.info(notice.message);
      break;
    case 'success': 
      ToastsStore.success(notice.message);
      break;
    case 'error': 
      ToastsStore.error(notice.message);
      break;
    default: 
      ToastsStore.info('I have no idea how to create that type of toast ¯\\_(ツ)_/¯');
      break;
  }
}