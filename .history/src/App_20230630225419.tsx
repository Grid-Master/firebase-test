import { FC } from 'react';
import './App.css';
import Auth from './components/Auth';

const App: FC = () => {
  return (
    <div className="App">
      Firebase
      <Auth />
    </div>
  );
};

export default App;
