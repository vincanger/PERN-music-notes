import React, { Fragment, useState, useEffect } from 'react';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import Landing from "./components/landing";

toast.configure();


function App() {


  async function isAuth() {
    try {
      const response = await fetch("/auth/is-verify/", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      parseRes === true ? setIsAutenticated(true) : setIsAutenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  const [isAuthenticated, setIsAutenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAutenticated(boolean);
  }

  
    return (
        <Fragment>
            <Router>
                <div className="container">
                    <Switch>

                        <Route
                            exact
                            path="/"
                            render={(props) =>
                                !isAuthenticated ? (
                                    <Landing {...props} />
                                ) : (
                                    <Redirect to="/dashboard" />
                                )
                            }
                        />

                        <Route
                            exact
                            path="/login"
                            render={(props) =>
                                !isAuthenticated ? (
                                    <Login {...props} setAuth={setAuth}/>
                                ) : (
                                    <Redirect to="/dashboard" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/register"
                            render={(props) =>
                                !isAuthenticated ? (
                                    <Register {...props} setAuth={setAuth}/>
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/dashboard"
                            render={(props) =>
                                isAuthenticated ? (
                                    <Dashboard {...props} setAuth={setAuth}/>
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                    </Switch>
                </div>
            </Router>
        </Fragment>
    );
};




export default App;
