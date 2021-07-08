import NavbarComponent from "./navbar";
import Main from './main'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { configureStore } from '../Store';
import { BrowserRouter as Router} from 'react-router-dom';
import Footer from "../Components/footer";
import jwtDecode from 'jwt-decode';
import { setAuthorizationToken, setCurrentUser } from "../Store/actions/auth"; 

function App() {
  const store = configureStore();
  if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken)
    try{
      store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    }catch(e){
      store.dispatch(setCurrentUser({}));
    }
  }
  return (
    <Provider store={store}>
        <Router>
        <div className="App">
            <NavbarComponent />
            <Main />
            <Footer />
        </div>
        </Router>
    </Provider>
  );
}

export default App;
