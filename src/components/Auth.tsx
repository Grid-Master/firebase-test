import { FC, useState, useReducer } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

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

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
    setEmail('');
    setPassword('');
  };

  const logout = async () => {
    try {
      await signOut(auth);
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
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}>Logout</button>
      <h1>{auth.currentUser?.photoURL}</h1>

      <img src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : 'null'} alt="photo" />
    </div>
  );
};

export default Auth;
