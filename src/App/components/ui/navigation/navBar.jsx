import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const navArr = [
    { id: 1, name: "Main", url: "/" },
    { id: 2, name: "Login", url: "/login" },
    { id: 3, name: "Users", url: "/users" }
];

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    {navArr &&
                        navArr.map((item) => (
                            <li key={item.id} className="nav-item ">
                                <Link to={item.url} className="nav-link text-primary">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </nav>
    );
};
