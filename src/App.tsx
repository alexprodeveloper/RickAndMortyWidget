import './App.css';
import Widget from "./components/Widget/Widget";

function App() {
  return (
      <div className="container">
        <Widget heading="Rick and Morty widget" key="RickAndMortyWidget" />
      </div>
  );
}

export default App;