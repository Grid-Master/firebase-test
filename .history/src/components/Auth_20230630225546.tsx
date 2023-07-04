import { FC } from 'react';
import { auth } from '../config/firebase';

const Auth: FC = () => {
  return (
    <div>
      <input placeholder="email" />
      <input placeholder="password" />
      <button>Sign in</button>
    </div>
  );
};

export default Auth;
