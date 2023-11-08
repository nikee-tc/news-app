import { Provider } from "react-redux";
import "./App.css";
import store from "./store/store";
import News from "./components/News/News";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <News />
      </div>
    </Provider>
  );
}

export default App;
