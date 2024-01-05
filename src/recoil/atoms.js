import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: {
    token: '',
    email:'',
    role: '',
  },
  effects_UNSTABLE: [persistAtom],
});
