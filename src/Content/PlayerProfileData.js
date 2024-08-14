import React,{createContext, useState, useEffect} from "react";

export const PlayerProfileContext = createContext();

function PlayerProfileData({children}) {

    const [playerProfile, setPlayerProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const fetchPlayerProfile = async () => {
            try{
                const response = await fetch ('/');
                const data = await response.json();
                setPlayerProfile(data)
            }
            catch(error){
                console.error("Error getting data",error)
            }
            finally{
                setLoading(false)
            }
            
        };
        fetchPlayerProfile();
    },[]);

    console.log("Player state:", playerProfile);

    if(loading){
        return(
            <div>
                loading
            </div>
        )
    }

    return(
        <PlayerProfileContext.Provider value={{playerProfile}}>
            {children}
        </PlayerProfileContext.Provider>
    );
    

}

export default PlayerProfileData;