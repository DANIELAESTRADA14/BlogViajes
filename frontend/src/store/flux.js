

const API = process.env.REACT_APP_API;

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
            token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

            syncTokenFRomSessionStore: () => {
                const token = sessionStorage.getItem("token")
                console.log("App just loaded, synching session storage ")
                if(token && token != "" && token != undefined) setStore({token: token})
            },

            logout: () => {
                sessionStorage.removeItem("token")
                console.log("Login out ")
                setStore({token: null})
    
            },
        
            login: async (username, password) => {
                const resp = await fetch(`${API}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            username,
                            password
                        }
                    )
                })
                try {
                    if (resp.status !== 200) {
                        alert("User not found")
                        return false
                    } else {
                        const data = await resp.json();
                        console.log("this came from the backend", data)
                        sessionStorage.setItem("token", data.access_token)
                      
                        return true;
                        
                    }
        
                
                }
                catch (error) {
                    console.error("There was an error!!", error)
                }
            },

			getMessage: () => {
                const store= getStore()
                const opts = {
                    headers: {
                        "Authorization" : "Bearer" + store.token
                    }
                }
				// fetching data from the backend
				fetch(`${API}/registros`, opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;