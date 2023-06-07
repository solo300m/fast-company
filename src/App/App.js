import React from "react";
import Users from "./components/users";
import { NavBar } from "./components/navigation/navBar";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Main } from "./layouts/main";
import { Login } from "./layouts/login";
import { CardUser } from "./layouts/cardUser";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users" component={Users} />
                <Route path="/carduser/:userId?" component={CardUser} />
            </Switch>
        </>
    );
}
export default App;
