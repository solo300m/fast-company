import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import { CardUser } from "./ui/cardUser";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }

        return _.get(item, columns[column].path);
    };
    // console.log(data);
    return (
        <>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {Object.keys(columns).map((column) => {
                            if (columns[column].path === "name") {
                                return (
                                    <td key={column} className="nameClass">
                                        <Link to={`carduser/${item._id}`}>
                                            {renderContent(item, column)}
                                        </Link>
                                        <Switch>
                                            <Route
                                                path="/carduser/:userId?"
                                                component={CardUser}
                                            />
                                        </Switch>
                                    </td>
                                );
                            }
                            return (
                                <td key={column}>
                                    {renderContent(item, column)}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
