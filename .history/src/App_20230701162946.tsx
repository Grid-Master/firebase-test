import { FC, useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const App: FC = () => {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, 'movies');

  useEffect(() => {
    const getMovieList = async () => {
      //read the data
      //set the movie list
      try {
        const data = await getDocs(moviesCollectionRef);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return (
    <div className="App">
      Firebase
      <Auth />
    </div>
  );
};

export default App;
