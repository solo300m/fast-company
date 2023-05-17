import React from "react";
import Users from "./components/users";
import { NavBar } from "./components/navigation/navBar";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Main } from "./components/ui/main";
import { Login } from "./components/ui/login";
import { CardUser } from "./components/ui/cardUser";

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
