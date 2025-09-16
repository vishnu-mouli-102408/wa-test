/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import "./App.css";

function App() {
	useEffect(() => {
		window.addEventListener("message", (event) => {
			if (event.origin !== "https://www.facebook.com") return;
			try {
				const data = JSON.parse(event.data);
				if (data.type === "WA_EMBEDDED_SIGNUP") {
					console.log("DATA", data);
				}
			} catch {
				console.log("ERROR", event);
			}
		});
	}, []);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const fbLoginCallback = (response: any) => {
		console.log("RESPONSE", response);
		if (response.authResponse) {
			const code = response.authResponse.code;
			console.log("CODE", code);

			// The returned code must be transmitted to your backend first and then
			// perform a server-to-server call from there to our servers for an access token.
		}
	};
	const launchWhatsAppSignup = () => {
		// Launch Facebook login
		window.FB.login(fbLoginCallback, {
			config_id: "1933840790712739", // configuration ID goes here
			response_type: "code", // must be set to 'code' for System User access token
			override_default_response_type: true, // when true, any response types passed in the "response_type" will take precedence over the default types
			extras: { version: "v3", setup: {} },
		});
	};

	return (
		<>
			<FacebookSDKLoader />
			<button onClick={launchWhatsAppSignup} type="button">
				Embedded Signup
			</button>
		</>
	);
}

export default App;

const FacebookSDKLoader = () => {
	useEffect(() => {
		window.fbAsyncInit = () => {
			window.FB.init({
				appId: "4056624121221221", // Replace with your App ID
				autoLogAppEvents: true,
				xfbml: true,
				version: "v23.0", // Use the appropriate API version
			});
		};

		const script = document.createElement("script");
		script.src = "https://connect.facebook.net/en_US/sdk.js";
		script.async = true;
		script.defer = true;
		script.crossOrigin = "anonymous";
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return <div id="fb-root" />;
};
