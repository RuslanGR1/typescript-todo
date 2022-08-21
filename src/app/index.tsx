import { Fragment, useEffect, useState } from "react";

import Navigation from "widgets/Navigation";
import { withProviders } from "./providers";
import { Routing } from "pages";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/redux";
import { logOut, selectCurrentToken } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { apiSlice } from "store/slices/apiSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const onLogout = () => {
    dispatch(logOut());
    dispatch(apiSlice.util.resetApiState());
    navigate("/");
  };

  return (
    <Fragment>
      <Navigation isAuthenticated={isAuth} onLogout={onLogout} />
      <Routing />
    </Fragment>
  );
};

const AppLayout = () => {
  return <App />;
};

export default withProviders(AppLayout);
