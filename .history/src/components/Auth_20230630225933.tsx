import { FC, useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signIn = () => {};

  return (
    <div>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};

export default Auth;
