import { FC, useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

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
  const [recievedAnOscar, setRecievedAnOscar] = useState<boolean>(true);

  const moviesCollectionRef = collection(db, 'movies');

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

  useEffect(() => {
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

  const submitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, { title, releaseDate, recievedAnOscar });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id: string) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await deleteDoc(movieDoc);
    } catch (err) {
      console.log(err);
    }
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
          <input type="checkbox" checked={recievedAnOscar} onChange={handleRecievedAnOscar} />
          recievedAnOscar
        </label>
        <br />
        <button onClick={submitMovie}>add film</button>
      </div>
      {movieList.map((movie) => (
        <h3 style={{ color: `${movie.recievedAnOscar ? 'gold' : 'black'}` }}>
          {movie.title}, {movie.releaseDate}
          <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>
        </h3>
      ))}
    </div>
  );
};

export default App;
