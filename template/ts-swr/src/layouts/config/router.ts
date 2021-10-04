/* eslint-disable import/no-cycle */
import loadable from '@loadable/component';

// [public] HOME
export const HOME = {
  default: {
    ord: 1,
    exact: true,
    path: '/',
    redirect: '',
    component: loadable(() => import('@/pages/Home')),
    url: () => {
      return `${HOME.default.path}`;
    },
  },
};
