import { FC, useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signIn = () => {};

  return (
    <div>
      <input placeholder="email" />
      <input placeholder="password" />
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};

export default Auth;
