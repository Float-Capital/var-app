import React, { useEffect, useState } from 'react'

const APIURL = "https://api.thegraph.com/subgraphs/name/greg-torrington/greg-v3"
const assetQuery = `
query {
  assets {
    id
    name
  	count
  }
}
`

function LeaderBoard(props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [totalVaR, setTotalVaR] = useState(0)
  const [allProtocols, setAllProtocols] = useState([])

  async function fetchBlockChainData() {
    let protocols = []
    let protocolInfo = []

    const assetResponse = await props.client.query(assetQuery).toPromise()
    let rawAssetData = assetResponse.data.assets
    protocolInfo[0] = "Maker"
    protocolInfo[1] = rawAssetData

    let usersPromiseArray = []
    let protocolVaR = 0;
    for (let i=0; i<protocolInfo[1].length; i++){
        let noUsers = protocolInfo[1][i].count
  
        let skip = 0
        let first = 1000
        while (noUsers>0) {
            if (noUsers<1000){first=noUsers}

            let usersQuery = `
                query {
                    users (
                    first: `+first+`
                    after: `+skip+`
                    ){
                        id
                        balance
                        allowance
                    }
                }
                `

            skip += 1000
            noUsers = noUsers - 1000

            usersPromiseArray.push(props.client.query(usersQuery).toPromise())
        }
        let allUsersPromise = await Promise.all(usersPromiseArray)
        
        let users = []
        for (let j=0; j<allUsersPromise.length; j++){
            users.push(allUsersPromise[j].data.users)
        }
        protocolInfo[1][i][0] = users

        let contractVaR = 0
        for (let j=0; j<protocolInfo[1][i][0].length; j++){
            for (let c=0; c<protocolInfo[1][i][0][j].length; c++){
                let allowance = protocolInfo[1][i][0][j][c].allowance
                let balance = protocolInfo[1][i][0][j][c].balance
                allowance = parseInt(allowance)/10**18
                balance = parseInt(balance)/10**18
                if (allowance<balance){
                    contractVaR = contractVaR + allowance
                } else {
                    contractVaR = contractVaR + balance
                }
            }
        }
        protocolVaR += contractVaR
    }

    protocolInfo[2] = protocolVaR.toFixed(2)
    setTotalVaR(totalVaR+parseFloat(protocolVaR.toFixed(2)))
    protocols.push(protocolInfo)
    setAllProtocols(protocols)
    props.setProtocols(allProtocols)
    setLoading(false)
  }

  useEffect(() => {
      fetchBlockChainData()
  }, []);


  if (loading){
    return (
      <div className="flex flex-col items-center justify-center w-full">
      <div role="status">
        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      </div>
    );
  } else { 
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
                                        allProtocols
                                        .filter( (item) => {
                                          if (searchTerm===""){
                                            return item
                                          } else if (item[0].toLowerCase().includes(searchTerm.toLowerCase())){
                                            return item
                                          }
                                        })
                                        .map((item, i) => {

                                          if (i===0){
                                            return(
                                              <tr key={i+1} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                <td className="px-1 py-3">{1} 🏆</td>
                                                <td className="px-1 py-3 cursor-pointer" onClick={() => {
                                                  props.navigate("/protocol") 
                                                  props.setChosenProtocol(allProtocols[i])
                                                  }}>{item[0]}</td>
                                                <td className="px-1 py-3">${item[2]}</td>
                                              </tr>
                                            )
                                          } else if (i===1){
                                            return(
                                              <tr key={i+1} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                <td className="px-1 py-3">{2} 🥈</td>
                                                <td className="px-1 py-3 cursor-pointer" onClick={() => props.navigate("/protocol")}>{item[0]}</td>
                                                <td className="px-1 py-3">${item[2]}</td>
                                              </tr>
                                            )
                                          } else if (i===2){
                                            return(
                                              <tr key={i+1} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                <td className="px-1 py-3">{3} 🥉</td>
                                                <td className="px-1 py-3 cursor-pointer" onClick={() => props.navigate("/protocol")}>{item[0]}</td>
                                                <td className="px-1 py-3">${item[2]}</td>
                                              </tr>
                                            )
                                          } else {
                                            return(
                                              <tr key={i+1} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                <td className="px-1 py-3">{i+1}</td>
                                                <td className="px-1 py-3 cursor-pointer" onClick={() => props.navigate("/protocol")}>{item[0]}</td>
                                                <td className="px-1 py-3">${item[2]}</td>
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
                      <h3 className="text-center text-base pb-2 cursor-pointer pt-3" onClick={() => props.navigate("/totalVAR")}>
                      💸 Total: ${totalVaR}
                      </h3>
                    </div>
                  </div>
                  </div>
                  </div>
    );
  }
}

export default LeaderBoard