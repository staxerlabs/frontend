import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../error-page";
import App from '../App'
import Onboarding from '../pages/Onboarding'
import Location from "../components/Location";
import Tracking from "../components/Tracking";
import SelectRates from "../components/SelectRates";
import CreateNewSafe from "../pages/CreateNewSafe";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Onboarding/>
        },
        {
          path: '/homepage/location',
          element: <Location/>
        },
        {
          path: '/homepage/tracking',
          element: <Tracking/>
        },
        {
          path: '/homepage/selectrates',
          element: <SelectRates/>
        },
        {
          path: '/newsafe',
          element: <CreateNewSafe/>
        }
      ]
    },
  ]);

  export default router;