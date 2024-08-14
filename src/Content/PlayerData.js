import React,{createContext, useState, useEffect} from "react";

export const ProductContext = createContext();

function PlayerData({children}) {

    const [player, setPlayer] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const fetchPlayers = async () => {
            try{
                const response = await fetch ('/mem');
                const data = await response.json();
                setPlayer(data)
            }
            catch(error){
                console.error("Error getting data",error)
            }
            finally{
                setLoading(false)
            }
            
        };
        fetchPlayers();
    },[]);

    console.log("Player state:", player);

    if(loading){
        return(
            <div>
                loading
            </div>
        )
    }

    return(
        <ProductContext.Provider value={{player}}>
            {children}
        </ProductContext.Provider>
    );
    

}

export default PlayerData;