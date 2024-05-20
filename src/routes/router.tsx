import {createBrowserRouter} from "react-router-dom";
// import ErrorPage from "../error-page";
import App from '../App'
import Onboarding from '../pages/Onboarding'
import Location from "../components/Location";
import Tracking from "../components/Tracking";
import SelectRates from "../components/SelectRates";
import CreateNewSafe from "../pages/CreateNewSafe";
import CreateNewSafe2 from "../pages/CreateNewSafe2";
import Success from "../pages/Success";
import Dashboard from "../pages/Dashboard";
import TransactionHistory from "../pages/TransactionHistory";
import EditTransaction from "../pages/EditTransaction";
import Profile from "../pages/Profile";
import UserSettings from "../pages/UserSettings";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      // errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Onboarding/>
        },
        {
          path: '/location',
          element: <Location/>
        },
        {
          path: '/tracking',
          element: <Tracking/>
        },
        {
          path: '/selectrates',
          element: <SelectRates/>
        },
        {
          path: '/newsafe',
          element: <CreateNewSafe/>
        },
        {
          path: '/newsafe/2',
          element: <CreateNewSafe2/>
        },
        {
          path: '/success/:message/:buttonText/:route',
          element: <Success/>
        },
        {
          path: '/dashboard',
          element: <Dashboard/>
        },
        {
          path: '/transaction-history',
          element: <TransactionHistory/>
        },
        {
          path: '/edit-transaction/:transaction_id',
          element: <EditTransaction/>
        },
        {
          path: '/profile/:user_id',
          element: <Profile/>
        },
        {
          path: '/user-settings/:user_id',
          element: <UserSettings/>
        }
      ]
    },
  ]);

  export default router;