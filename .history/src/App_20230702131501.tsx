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

  //new Movie State
  const [title, setTitle] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<number>(0);
  const [recievedAnOscar, setRecievedAnOscar] = useState<boolean>(false);

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

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleReleaseDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReleaseDate(parseInt(e.target.value));
  };

  const handleRecievedAnOscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecievedAnOscar(e.target.checked);
  };

  return (
    <div className="App">
      Firebase
      <Auth />
      <hr />
      <div>
        <input placeholder="title..." value={title} onChange={handleTitle} />
        <br />
        <input
          type="number"
          placeholder="releaseDate..."
          value={releaseDate}
          onChange={handleReleaseDate}
        />
        <br />
        <label>
          recievedAnOscar
          <br />
          <input checked={recievedAnOscar} onChange={handleRecievedAnOscar} />
        </label>
        <br />
        <button>add film</button>
      </div>
      {movieList.map((movie) => (
        <h3>
          {movie.title}, {movie.releaseDate}
        </h3>
      ))}
    </div>
  );
};

export default App;
