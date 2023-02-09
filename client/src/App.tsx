import './App.css';
import { Provider } from 'react-redux';
import { store } from './state/store.state';
import Main from './components/main';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello React with TS</h1>
        <Main />
      </div>
    </Provider>

  );
}

export default App;
