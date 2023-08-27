import "regenerator-runtime/runtime";
import React from "react";
import { useNavigate } from "react-router-dom";

import "../assets/global.css";

function Booking({ contractId, wallet, home_id }) {
  const [uiPleaseWait, setUiPleaseWait] = React.useState(false);
  let navigate = useNavigate();
  function booking(e) {
    setUiPleaseWait(true);
    e.preventDefault();
    const { fromdate, todate } = e.target.elements;
    // use the wallet to send the greeting to the contract
    
    let _from_date = new Date(fromdate.value).getTime() / 1000
    let _to_date = new Date(todate.value).getTime() / 1000
    const dayToSeconds = 86400;

    let duration = (_to_date - _from_date) / dayToSeconds

    wallet
      .callMethod({
        method: "create_booking",
        args: {
          home_id: home_id,
          from_date: parseInt(_from_date),
          to_date: parseInt(_to_date),
          duration: parseInt(duration),
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
      <main className={uiPleaseWait ? "please-wait" : ""}>
        <form onSubmit={booking} className="change">
          <label>Booking :</label>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    autoComplete="off"
                    defaultValue=""
                    id="fromdate"
                    type="date"
                    placeholder="from date"
                  />
                </td>
                <td>
                  <input
                    autoComplete="off"
                    defaultValue=""
                    id="todate"
                    type="date"
                    placeholder="to date"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button>
            <span>Save</span>
            <div className="loader"></div>
          </button>
        </form>
      </main>
    </>
  );
}

export default Booking;
