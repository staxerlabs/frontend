import { useRouteError } from "react-router-dom";
import logo from './assets/staxer-black.png';

const ErrorPage: React.FC = () => {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page">
        <img src={logo} alt="Staxer logo" className='Staxer'/>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>Please try again later.</p>
      </div>
    );
  };
  
  export default ErrorPage;