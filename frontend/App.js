import "regenerator-runtime/runtime";
import React from "react";
import "./assets/global.css";
import { Route, Routes, HashRouter } from "react-router-dom";
import YourRentals from "./pagelist/YourRentals";
import Home from "./pagelist/Home";
import AddRentals from "./page/AddRentals";

import { SignInPrompt, SignOutButton } from "./ui-components";

// export default function App({ isSignedIn, contractId, wallet }) {
//   const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

//   const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

//   // Get blockchian state once on component load
//   const getRentalsList = async () => {
//     const rentals = await getGreeting();
//     const items = rentals.map((r) => {
//       return {
//         id: r[0],
//         val: r[1]
//       };
//     });
//     console.log(rentals);
//     console.log(items);
//     setValueFromBlockchain(JSON.stringify(items));
//   };

//   React.useEffect(() => {
//     getRentalsList().finally(() => {
//       setUiPleaseWait(false);
//     });
//   }, []);

//   /// If user not signed-in with wallet - show prompt
//   if (!isSignedIn) {
//     // Sign-in flow will reload the page later
//     return (
//       <SignInPrompt
//         greeting={valueFromBlockchain}
//         onClick={() => wallet.signIn()}
//       />
//     );
//   }

//   function changeGreeting(e) {

//     e.preventDefault();
//     setUiPleaseWait(true);
//     const { name, address, city, img_url, theme, description, price } = e.target.elements;
//     // use the wallet to send the greeting to the contract
//     console.log(name, address, city, img_url, theme, description, price)
//     wallet
//       .callMethod({
//         method: "create_home",
//         args: {
//           name: name.value,
//           address: address.value,
//           city: city.value,
//           img_url: img_url.value,
//           theme: theme.value,
//           description: description.value,
//           price: parseInt(price.value),
//         },
//         contractId: contractId,
//       })
//       .then(async () => {
//         return getRentalsList();
//       })
//       .finally(() => {
//         setUiPleaseWait(false);
//       });
//   }

//   function getGreeting() {
//     // use the wallet to query the contract's greeting
//     return wallet.viewMethod({ method: "get_all_homes", contractId: contractId })
//   }

//   const getImage = async (e) => {
//     e.preventDefault();
//     const reader = new window.FileReader();
//     const file = e.target.files[0];

//     if (file !== undefined) {
//       reader.readAsArrayBuffer(file);

//       reader.onloadend = () => {
//         const buf = Buffer(reader.result, "base64");
//         setImage(buf);
//         setImagePreview(file);
//       };
//     }
//   };

//   return (
//     <>
//       <SignOutButton
//         accountId={wallet.accountId}
//         onClick={() => wallet.signOut()}
//       />
//       <main
//        className={uiPleaseWait ? "please-wait" : ""}>
//         <h1>
//           The contract says:{" "}
//           <span className="greeting">{valueFromBlockchain}</span>
//         </h1>
//         <form onSubmit={changeGreeting} className="change">
//           <label>Add home:</label>
//           <table>
//             <tr>
//               <td>
//                 <input
//                 autoComplete="off"
//                 defaultValue=""
//                 id="name"
//                 placeholder="home name"
//                 />
//               </td>
//               <td>
//                 <input
//                 autoComplete="off"
//                 defaultValue=""
//                 id="address"
//                 placeholder="home address"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <input
//                 autoComplete="off"
//                 defaultValue=""
//                 id="city"
//                 placeholder="city"
//                 />
//               </td>
//               <td>
//                 <input
//                 autoComplete="off"
//                 defaultValue=""
//                 id="img_url"
//                 placeholder="image"
//                />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <input
//                   autoComplete="off"
//                   defaultValue=""
//                   id="theme"
//                   placeholder="home theme"
//                 />
//               </td>
//               <td>
//                 <input
//                 autoComplete="off"
//                 defaultValue=""
//                 id="description"
//                 placeholder="description"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>
//                 <input
//                 autoComplete="off"
//                 defaultValue=""
//                 id="price"
//                 type="number"
//                 placeholder="home price"
//                 />
//               </td>
//             </tr>
//             <button>
//               <span>Save</span>
//               <div className="loader"></div>
//             </button>
//           </table>
//         </form>
//       </main>
//     </>
//   );
// }

function App({ isSignedIn, contractId, wallet }) {
  return (
    <>
      <div className="App">
        <HashRouter>
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
        </HashRouter>
      </div>
    </>
  );
}

export default App;
