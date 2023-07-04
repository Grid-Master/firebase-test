import { FC } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from './config/firebase';

const App: FC = () => {
  console.log(db);
  return (
    <div className="App">
      Firebase
      <Auth />
    </div>
  );
};

export default App;
