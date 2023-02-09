import './App.css';
import { Provider } from 'react-redux';
import { store } from './state/store.state';
import Main from './components/main';

function App() {
  return (
    <Provider store={store}>

      <Main />

    </Provider>

  );
}

export default App;
