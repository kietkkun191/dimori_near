import "regenerator-runtime/runtime";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Rentals.css";
import Booking from "../page/Booking";
import logo from "../assets/dimori-logo.png";
import { Routes, Route, useNavigate } from "react-router-dom";

import { SignInPrompt, SignOutButton } from "../ui-components";

function Home({ isSignedIn, contractId, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = useState([]);

  const getRentalsList = async () => {
    const rentals = await getGreeting();
    const items = rentals.map((r) => r[1]);
    console.log(items);
    setValueFromBlockchain(items);
  };

  React.useEffect(() => {
    getRentalsList();
  }, []);

  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt onClick={() => wallet.signIn()} />;
  }

  function getGreeting() {
    // use the wallet to query the contract's greeting
    return wallet.viewMethod({
      method: "get_all_homes",
      contractId: contractId,
    });
  }
  const navigate = useNavigate();
  const navigateBooking = () => {
    // 👇️ navigate to /contacts
    navigate("/booking");
  };

  return (
    <>
      <div className="topBanner">
        <div>
          <Link to="/">
            <img
              className="logo"
              src={logo}
              alt="logo"
              style={{ height: "70px" }}
            ></img>
          </Link>
        </div>
        <h2 class="headerText">All Rentals</h2>
        <div className="lrContainers">
          <SignOutButton
            accountId={wallet.accountId}
            onClick={() => wallet.signOut()}
          />
        </div>
      </div>
      <div className="rentalsContent">
        <div className="newContainer">
          <button className="btn btn-secondary" onClick={naviageAddRental}>Add Your Own Rental</button>
          {valueFromBlockchain.map((e, i) => {
            return (
              <div className="itemDiv" key={i}>
                <div className="rentalDiv">
                  <div className="rentalInfo">
                    <div className="rentalTitle">{e.name.toUpperCase()}</div>
                    <div className="rentalInformation">
                      <table className="pure-table pure-table-horizontal marginTable">
                        <tbody>
                          <tr>
                            <td>Ten phong na:</td>
                            <td>{e.name}</td>
                          </tr>
                          <tr>
                            <td>Dia chi na:</td>
                            <td>{e.address}</td>
                          </tr>
                          <tr>
                            <td>Place</td>
                            <td>{e.city}</td>
                          </tr>
                          <tr>
                            <td>Theme:</td>
                            <td>{e.theme}</td>
                          </tr>
                          <tr>
                            <td>Desc</td>
                            <td>{e.description}</td>
                          </tr>
                          <tr>
                            <td>Gia phong moi dem</td>
                            <td>{e.price} NEAR</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={navigateBooking}
                  >Booking
                  </button>
                  <Routes>
                    <Route
                      path="/booking"
                      element={
                        <Booking
                          contractId={contractId}
                          wallet={wallet}
                          home_id={e.home_id}
                        />
                      }
                    />
                  </Routes>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
