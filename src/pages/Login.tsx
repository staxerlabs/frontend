import logo from '../resources/assets/images/staxer-black.png';
import worldid from '../resources/assets/images/worldcoin_white.png'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();

  const loginClickHandler = () => {
    navigate('/homepage')
  }

    return (
        <div className="Login">
            
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Automate your tax withholdings and earn interest on withheld taxes.
                </p>
                <button onClick={loginClickHandler}>
                  <img src={worldid} alt="World Coin Id" className='worldcoin-icon' />
                    Login
                </button>
            
        </div>
    );
}

export default Login;