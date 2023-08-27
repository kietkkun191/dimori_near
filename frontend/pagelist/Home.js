import "regenerator-runtime/runtime";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../assets/global.css";
import Booking from "../page/Booking";

import { SignInPrompt, SignOutButton } from "../ui-components";

function Home({ isSignedIn, contractId, wallet }) {
  const [showBooking, setShowBooking] = useState(false);

  const handleCloseBooking = () => setShowBooking(false);
  const handleShowBooking = () => setShowBooking(true);

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

  return (
    <>
      <SignOutButton
        accountId={wallet.accountId}
        onClick={() => wallet.signOut()}
      />
      {valueFromBlockchain.map((e, i) => {
        return (
          <div className="itemDiv" key={i}>
            <div className="rentalInfo">
              <div className="rentalTitle">{e.name.toUpperCase()}</div>
              <div className="rentalInformation">
                <table>
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
            <div>
              <button className="btn btn-secondary" onClick={handleShowBooking}>
                Booking
              </button>
              <Modal
                show={showBooking}
                onHide={handleCloseBooking}
                size="xl"
                centered
                scrollable
                animation
                dialogClassName="booking-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Booking
                    contractId={contractId}
                    wallet={wallet}
                    home_id={e.home_id}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Home;
