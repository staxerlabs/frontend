import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../error-page";
import App from '../App'
import Onboarding from '../pages/Onboarding'
import Location from "../components/Location";
import Tracking from "../components/Tracking";
import SelectRates from "../components/SelectRates";
import CreateNewSafe from "../pages/CreateNewSafe";
import CreateNewSafe2 from "../pages/CreateNewSafe2";
import Success from "../pages/Success";

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
        }
      ]
    },
  ]);

  export default router;