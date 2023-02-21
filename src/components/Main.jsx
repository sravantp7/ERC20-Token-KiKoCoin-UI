import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import kiko from "../contract/contract.json";

const Main = ({accounts}) => {

    let contract
    const [token, setToken] = useState("")
    const [symbol, setSymbol] = useState("")
    const [supply, setSupply] = useState("")
    const [wallet, setWallet] = useState("")
    const [balancew, setBalancew] = useState("")

    useEffect(() => {
        getContract()
    })

    const getContract = async () => {
        if (window.ethereum && accounts) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                contract = new ethers.Contract(kiko.contractAddress, kiko.abi, signer)
                setToken(await contract.name())
                setSymbol(await contract.symbol())

            } catch (e) {
                console.log(e.message)
            }
        }
    }
 
    const getTotalSupply = async () => {
        if (accounts) {
            try {
                const totalSupply = await contract.totalSupply();
                setSupply(ethers.utils.formatEther(totalSupply))
                
            } catch (e) {
                console.log(e)
            }

        } else {
            console.log('Connect Wallet')
        }
    }

    const getBalance = async () => {
        if (accounts) {
            try {
                const balance = await contract.balanceOf(wallet)
                setBalancew(Math.round(ethers.utils.formatEther(balance)))
            }
            catch(e) {
                console.log(e.message)
            }
        }
    }

  return (
    accounts ? (
    <div className='w-[500px] border-4 mx-auto py-10 my-20 rounded-lg border-cyan-500 text-center bg-slate-400'>
        <div>
            <p className='font-bold text-xl mt-2'>Token Name : <span className='text-blue-700'>{token}</span></p>
            <p className='font-bold text-xl mt-2'>Token Symbol : <span className='text-blue-700'>{symbol}</span></p>
            <button className='mt-4 bg-slate-500 px-4 py-2 rounded-md text-white' onClick={getTotalSupply}>View Total Supply</button>
            <p className='mt-2 font-bold text-blue-800 text-2xl'>{supply ? (<span>{supply}</span>) : (<span></span>)}</p>
            <div className='flex justify-center items-center mt-4 gap-2'>
                <input type="text" placeholder='Wallet Address' className='outline-none px-2 py-2 rounded-md' onChange={(e) => setWallet(e.target.value
                    )} />
                <button className='bg-slate-500 px-4 py-2 rounded-md text-white' onClick={getBalance}>Check Balance</button>
            </div>
            <p className='mt-2 font-bold text-blue-800 text-xl'>{balancew ? (<span>{balancew}</span>) : (<span></span>)}</p>
        </div>
    </div> ) : (
        <div className='mx-auto py-10 my-20 text-center' >
            <p className='font-bold text-2xl'>Connect your Wallet.</p>
        </div>
    )
  )
}

export default Main