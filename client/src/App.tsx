import './App.css';
import { Provider } from 'react-redux';
import { store } from './state/store.state';
import Main from './components/main';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>

  );
}

export default App;
