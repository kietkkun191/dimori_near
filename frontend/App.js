import "regenerator-runtime/runtime";
import React from "react";
import "./assets/App.css";
import { Route, Routes } from "react-router-dom";
import YourRentals from "./pagelist/YourRentals";
import Home from "./pagelist/Home";
import AddRentals from "./page/AddRentals";

function App({ isSignedIn, contractId, wallet }) {
  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isSignedIn={isSignedIn}
                contractId={contractId}
                wallet={wallet}
              />
            }
          />
          <Route
            path="/your-rentals"
            element={
              <YourRentals
                isSignedIn={isSignedIn}
                contractId={contractId}
                wallet={wallet}
              />
            }
          />
          <Route
            path="/add-rental"
            element={
              <AddRentals
                isSignedIn={isSignedIn}
                contractId={contractId}
                wallet={wallet}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
