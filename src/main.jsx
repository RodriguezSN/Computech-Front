import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { FirebaseAppProvider } from "reactfire";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store/store.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import axios from "axios";
const firebaseConfig = {
	apiKey: "AIzaSyARKII_-ZRbbhXP3--TdeH4JIgRErz9F3U",
	authDomain: "computech-log.firebaseapp.com",
	projectId: "computech-log",
	storageBucket: "computech-log.appspot.com",
	messagingSenderId: "1095527705323",
	appId: "1:1095527705323:web:dadcbebc67d49ef9292cae",
	measurementId: "G-XL46QPYWW2"
};

const onRedirectCallback = (appState) => {
	window.history.replaceState(
		{},
		document.title,
		appState?.returnTo || window.location.pathname
	);
};
// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "computech-back-production.up.railway.app";
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PayPalScriptProvider
			options={{
				clientId:
					"AU91H9mUAAD-fARbDuP_OPx39hNyS1skJA2VgOAesbelmW0piHJX_4e5mFROHO8Q6V3ozXLD0-7zoOvT"
			}}
		>
			<React.StrictMode>
				<FirebaseAppProvider firebaseConfig={firebaseConfig}>
					<BrowserRouter>
						<LoadingProvider>
							<App />
						</LoadingProvider>
					</BrowserRouter>
				</FirebaseAppProvider>
			</React.StrictMode>
		</PayPalScriptProvider>
	</Provider>
);
