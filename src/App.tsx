import { Outlet} from 'react-router-dom';
import Header from './components/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App()  {

  return (
    <div className='layout'>
      <Header />
      <div className="content">
        <Outlet /> 
      </div>
    </div>
  );
}

export default App;
