import "regenerator-runtime/runtime";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../assets/global.css";

import { SignInPrompt, SignOutButton } from "../ui-components";

function YourRentals({ isSignedIn, contractId, wallet }) {
  const [showDetail, setShowDetail] = useState(false);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  const [showRemove, setShowRemove] = useState(false);

  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = () => setShowRemove(true);

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [valueFromBlockchain, setValueFromBlockchain] = useState([]);

  const getRentalsList = async () => {
    const rentals = await getGreeting();
    const items = rentals
      .map((r) => r[1])
      .filter((r) => r.owner == wallet.accountId);
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
      {valueFromBlockchain.map((e, i) => {
        return (
          <div className="itemDiv" key={i}>
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
            <div className="button-area">
              <a className="btn btn-secondary" onClick={handleShowDetail}>
                Details
              </a>
              &nbsp;
              <a
                className="btn btn-secondary"
                onClick={handleShowEdit}
                role="button"
              >
                Edit rental
              </a>
              &nbsp;
              <a
                className="btn btn-danger"
                onClick={handleShowRemove}
                role="button"
              >
                Remove rental
              </a>
            </div>
          </div>
        );
      })}
      <Modal
        show={showDetail}
        onHide={handleCloseDetail}
        size="xl"
        centered
        scrollable
        animation
        dialogClassName="detail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>Comming Soon</Modal.Body>
      </Modal>
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        size="xl"
        centered
        scrollable
        animation
        dialogClassName="edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>Comming Soon</Modal.Body>
      </Modal>
      <Modal
        show={showRemove}
        onHide={handleCloseRemove}
        size="xl"
        centered
        scrollable
        animation
        dialogClassName="remove-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>Comming Soon</Modal.Body>
      </Modal>
    </>
  );
}

export default YourRentals;
