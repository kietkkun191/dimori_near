import React from 'react';

export function SignInPrompt({greeting, onClick}) {
  return (
    <main>
      <h1>
        Rentals List
      </h1>
      {/* <div>
        {greeting.length !== 0 ? (
            greeting.map((e, i) => {
              return (
                <>
                  <br />
                  <div className="itemDiv" key={i}>
                    <Rental
                      rental={e}
                      bookingInfo={{
                        checkIn: info.checkIn.getTime(),
                        checkOut: info.checkOut.getTime(),
                      }}
                      searchFilters={searchFilters}
                    />
                  </div>
                </>
              );
            })
          ) : (
            <div
              style={{
                textAlign: "center",
                paddingTop: "10%",
                paddingBottom: "10%",
              }}
            >
              <p style={{ color: "#00aed0" }}>
                No rentals found for your search
              </p>
            </div>
        )}
      </div> */}
      <h3>
        DIMORI!
      </h3>
      <p>
        Your contract is storing a greeting message in the NEAR blockchain. To
        change it you need to sign in using the NEAR Wallet. It is very simple,
        just use the button below.
      </p>
      <p>
        Do not worry, this app runs in the test network ("testnet"). It works
        just like the main network ("mainnet"), but using NEAR Tokens that are
        only for testing!
      </p>
      <br/>
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

export function SignOutButton({accountId, onClick}) {
  return (
    <button style={{ float: 'right' }} onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}

export function EducationalText() {
  return (
    <>
      <p>
        Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
      </p>
      <ol>
        <li>
          Look in <code>frontend/App.js</code> - you'll see <code>getGreeting</code> and <code>setGreeting</code> being called on <code>contract</code>. What's this?
        </li>
        <li>
          Ultimately, this <code>contract</code> code is defined in <code>./contract</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
        <li>
          When you run <code>npm run deploy</code>, the code in <code>./contract</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code>.</li>
      </ol>
      <hr />
      <p>
        To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
      </p>
    </>
  );
}
