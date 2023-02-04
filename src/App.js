import './App.css';
import './THEME.css';
import Register from './components/Register';
import SignIn from './components/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route , Routes } from 'react-router-dom'
import UserContextProvider from './components/Auth';
import Store from './components/main-components/Store';
import { ChakraProvider } from '@chakra-ui/react';
import WishedContextProvider from './contexts/WishedContextProvider';
import {useTheme} from './contexts/ThemeContextProvider';


function App() {
  const {themeIcon,setThemeIcon} = useTheme();

  return (
    <div className={`App container-fluid ${themeIcon} `}>
      <header className="App-header row ">
       <BrowserRouter >
          <ChakraProvider>
              <UserContextProvider>
                  <WishedContextProvider>
                     
                <Routes>
                  <Route path='/' element={<SignIn />}></Route>
                  <Route path='/register' element={<Register />}></Route>
                        <Route path='/store' element={<Store />}></Route>
                </Routes>
                     
                  </WishedContextProvider>
              </UserContextProvider>
          </ChakraProvider>
         </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
