import { FC, useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

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
  const [updatedTitle, setUpdatedTitle] = useState<string>('');

  //fileupload
  const [fileUpload, setFileUpload] = useState<any>(null);

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
  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value);
  };

  const submitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title,
        releaseDate,
        recievedAnOscar,
        userId: auth.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id: string) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const updateMovie = async (id: string, title: string) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await updateDoc(movieDoc, { title });
      getMovieList();
      setUpdatedTitle('');
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) {
      return;
    }
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
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
          <label>
            update title
            <input value={updatedTitle} onChange={handleUpdateTitle} placeholder="title..." />
          </label>
          <button onClick={() => updateMovie(movie.id, updatedTitle)}>Update title</button>
        </h3>
      ))}
      <hr />
      <div>
        <input type="file" onChange={(e: any) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
};

export default App;
