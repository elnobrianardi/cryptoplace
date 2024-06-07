import { createContext, useEffect, useState } from "react"
import config from '../../config.js'

export const CoinContext = createContext()

const CoinContextProvider = ({ children }) => {

    const [allCoin, setAllCoin ] = useState([])
    const apiKey = config.COINGECKO_API_KEY
    const [currency, setCurrency ] = useState({
        name: "usd",
        symbol: '$',
    })

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey }
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchAllCoin()
    },[currency])
    
    const contextValue = {
        allCoin,
        currency,
        setCurrency
    }
    
    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider