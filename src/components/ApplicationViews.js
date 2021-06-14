import React from "react"
import { Route } from "react-router"
import { SneakerProvider } from "./Sneakers/SneakerProvider";


export const ApplicationViews = () => {
    return (
        <>
        <SneakerProvider>
            <Route exact path="/Products">
                <div className="headerText">
                    <h2>hello</h2>
                </div>
            </Route>
        </SneakerProvider>
        </>
    )
}