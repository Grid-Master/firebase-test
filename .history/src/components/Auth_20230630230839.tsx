import { FC, useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};

export default Auth;
