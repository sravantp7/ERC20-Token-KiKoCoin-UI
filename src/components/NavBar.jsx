import React from 'react'
import { useEffect } from 'react'

const NavBar = ({accounts, setAccounts}) => {

    useEffect(() => {
        getConnectedWallet()
        addWalletListener()
    })

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccounts(account[0]);
            } catch(error) {
                console.log(error.message)
            }

        }
        else {
            console.log("Please install metamask..")
        }
    }

    const getConnectedWallet = async () => {
        if (window.ethereum) {
            try {
                const account = await window.ethereum.request({
                    method: "eth_accounts"
                })
                setAccounts(account[0])
            } catch(error) {
                console.log(error.message)
            }
        }
    }

    const addWalletListener = async () => {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            setAccounts(accounts[0]);
          });
        } else {
            setAccounts("");
            console.log("Please install MetaMask");
        }
      };

  return (
    <div className='flex justify-between px-20 py-8 w-full'>
        {/* title */}
        <div className='text-3xl font-bold text-blue-700'>
            <h1>KiKoCoin</h1>
        </div>

        {/* connect button */}
        <div className='px-4 py-3 rounded-2xl bg-slate-500 outline-none text-white font-bold w-fitcontent text-center hover:opacity-90'>
            <button onClick={connectWallet}>
                {
                    accounts ? (<span>{`Connected: ${accounts.substring(0,4)}...${accounts.substring(38)}`}</span>) : (<span>Connect Wallet</span>)
                }
            </button>
            
        </div>
    </div>
  )
}

export default NavBar