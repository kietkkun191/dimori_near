import "regenerator-runtime/runtime";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/AddRentals.css";

import { SignInPrompt, SignOutButton } from "../ui-components";

function AddRentals({ isSignedIn, contractId, wallet }) {
  const [uiPleaseWait, setUiPleaseWait] = React.useState(false);

  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return (
      <SignInPrompt
        greeting={valueFromBlockchain}
        onClick={() => wallet.signIn()}
      />
    );
  }
  let navigate = useNavigate();
  function addHome(e) {
    setUiPleaseWait(true);
    e.preventDefault();
    const { name, address, city, img_url, theme, description, price } =
      e.target.elements;
    // use the wallet to send the greeting to the contract
    console.log(name, address, city, img_url, theme, description, price);
    wallet
      .callMethod({
        method: "create_home",
        args: {
          name: name.value,
          address: address.value,
          city: city.value,
          img_url: img_url.value,
          theme: theme.value,
          description: description.value,
          price: parseInt(price.value),
        },
        contractId: contractId,
      })
      .then(() => {
        setUiPleaseWait(false);
        navigate("/");
      });
  }

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
      <hr className="line1" />
      <main className={uiPleaseWait ? "please-wait" : ""}>
        <form onSubmit={addHome} className="change">
          <div className="addRentalContent row">
            <div className="row">
              <div className="rentalContent col-8">
                <table className="pure-table pure-table-horizontal marginTable">
                  <tbody>
                    <tr>
                      <td>
                        <input
                          autoComplete="off"
                          defaultValue=""
                          id="name"
                          placeholder="home name"
                        />
                      </td>
                      <td>
                        <input
                          autoComplete="off"
                          defaultValue=""
                          id="address"
                          placeholder="home address"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          autoComplete="off"
                          defaultValue=""
                          id="city"
                          placeholder="city"
                        />
                      </td>
                      <td>
                        <input
                          autoComplete="off"
                          defaultValue=""
                          id="img_url"
                          placeholder="image"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          autoComplete="off"
                          defaultValue=""
                          id="theme"
                          placeholder="home theme"
                        />
                      </td>
                      <td>
                        <input
                          autoComplete="off"
                          defaultValue=""
                          id="description"
                          placeholder="description"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input
                          autoComplete="off"
                          defaultValue=""
                          id="price"
                          type="number"
                          placeholder="home price"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button>
            <span>Save</span>
            <div className="loader"></div>
          </button>
        </form>
      </main>
    </>
  );
}

export default AddRentals;
