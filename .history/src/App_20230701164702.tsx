import { FC, useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';

interface IMovie {
  id: string;
  title: string;
  recievedAnOscar: boolean;
  releaseDate: number;
}

const App: FC = () => {
  const [movieList, setMovieList] = useState<IMovie[]>([]);

  const moviesCollectionRef = collection(db, 'movies');

  useEffect(() => {
    const getMovieList = async () => {
      //read the data
      //set the movie list
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        //@ts-ignore
        setMovieList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getMovieList();
  }, []);

  return (
    <div className="App">
      Firebase
      <Auth />
      <hr />
      {movieList.map((movie) => (
        <h3>
          {movie.title}, {movie.releaseDate}
        </h3>
      ))}
    </div>
  );
};

export default App;
