import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import data from "./config.contracts.json"

var dataArray = []
var VaRofContracts = ["$$$","$$$","$$$", "$$$", "$$$", "$$$"]

var navigate;

export var chosenData

async function sortData(){

  data.map( (data) => {
      dataArray.push(data)
  })

}

async function navigateToProtolPage(i){
  chosenData = dataArray[i]
  navigate("/protocol");
}

function LeaderBoard() {

  const [searchTerm, setSearchTerm] = useState("")

  navigate = useNavigate()

  useEffect(() => {
      sortData()
  }, []);

    return(
      <div>
        <div className="flex flex-col items-center justify-center w-full">
        <div className="w-9/10 md:w-auto flex flex-col md:max-w-mint-width">
                    <div className="border border:black mt-5 md:mt-0 md:min-w-mint-width md:max-w-mint-width p-6 mb-5 rounded-lg custom-animations_shine__1YTqy  md:order-2 order-1">
                      <h1 className="text-center text-xl pb-2">
                          Approval Adjusted Value at Risk Leader Board
                      </h1>
                      <div className="px-1">
                        <div className="general-styles_screen-centered-container__3fxeE h-full ">
                          <form className="h-full">
                            <div className="relative">
                              <div className="flex flex-row my-3 shadow-md">
                                <input id="filter-input" onChange={event => {setSearchTerm(event.target.value)}} placeholder="Enter protocol name, token or contract address" type="text" className="py-2 font-normal text-grey-darkest w-full py-1 px-2 outline-none text-md text-gray-600 flex-1" />
                              </div>
                              <div className="inline-block mx-auto py-2 w-full">
                                <div className="rounded-lg border-2 w-full max-h-60 overflow-y-auto no-scrollbar">
                                  <table className="w-full text-center divide-y divide-gray-200">
                                    <thead className="divide-y divide-gray-200 bg-white border-b sticky top-0">
                                      <tr className="text-xs md:text-xxs lg:text-xs">
                                       <td className="px-1 underline font-bold py-3">Rank</td>
                                       <td className="px-1 underline font-bold py-3">Protocol</td>
                                       <td className="px-1 underline font-bold py-3">Approval Adjusted VaR</td>
                                      </tr>
                                    </thead>
                                    <tbody id="protocols-tbody" className="divide-y divide-gray-200">
                                      {
                                        data
                                        .filter( (item) => {
                                          if (searchTerm===""){
                                            return item
                                          } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                            return item
                                          }
                                        })
                                        .map((item, i) => {

                                          if (i===0){
                                            return(
                                              <tr key={i+1} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                <td className="px-1 py-3">{1} 🏆</td>
                                                <td className="px-1 py-3 cursor-pointer" onClick={() => navigateToProtolPage(i)}>{item.name}</td>
                                                <td className="px-1 py-3">{VaRofContracts[i]}</td>
                                              </tr>
                                            )
                                          } else if (i===1){
                                            return(
                                              <tr key={i+1} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                <td className="px-1 py-3">{2} 🥈</td>
                                                <td className="px-1 py-3 cursor-pointer" onClick={() => navigateToProtolPage(i)}>{item.name}</td>
                                                <td className="px-1 py-3">{VaRofContracts[i]}</td>
                                              </tr>
                                            )
                                          } else if (i===2){
                                            return(
                                              <tr key={i+1} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                <td className="px-1 py-3">{3} 🥉</td>
                                                <td className="px-1 py-3 cursor-pointer" onClick={() => navigateToProtolPage(i)}>{item.name}</td>
                                                <td className="px-1 py-3">{VaRofContracts[i]}</td>
                                              </tr>
                                            )
                                          } else {
                                            return(
                                              <tr key={i+1} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                <td className="px-1 py-3">{i+1}</td>
                                                <td className="px-1 py-3 cursor-pointer" onClick={() => navigateToProtolPage(i)}>{item.name}</td>
                                                <td className="px-1 py-3">{VaRofContracts[i]}</td>
                                              </tr>
                                            )
                                          }                                        
                                        }
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <h3 className="text-center text-base pb-2 cursor-pointer pt-3" onClick={() => navigate("/totalVAR")}>
                        💸 Total: $10000
                      </h3>
                    </div>
                  </div>
                  </div>
                  </div>
    );

}

export default LeaderBoard