import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

//const data = [{name: 'January', uv: 400}, {name: "March", uv: 21}, {name: "February", uv: 600}];

function ChosenProtocol(props){

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    async function fetchData() {
        let finalData = {}

        let users = props.chosenProtocol["users"]
        users.sort((a, b) => a.VaR - b.VaR);
        let array = []
        let addresses = []
        for (let i=users.length-1; i>-1; i--){
            let contains = false

            if (array.length==10){
                break
            }
            
            for (let j=0; j<addresses.length; j++){
                if (addresses[j]===users[i].id){
                    contains = true
                    break
                }
            }

            if (!contains){
                array.push(users[i])
                addresses.push(users[i].id)
            }

        }
        finalData["top10"] = array

        let approvalTransactions = []
        for (let i=0; i<users.length; i++){
            for (var j=0; j<users[i].approvals.length; j++){
                approvalTransactions.push(users[i].approvals[j])
            }
        }
        approvalTransactions.sort((a, b) => a.timeStamp - b.timeStamp)

        const currentDate = new Date()
        let bottomDate = new Date(currentDate.getFullYear()-1, currentDate.getMonth(), currentDate.getDate())
        let topDate = new Date(currentDate.getFullYear()-1, currentDate.getMonth()+1, currentDate.getDate())
        let monthlyVaR = []
        let totalVaR = 0
        for (let i=0; i<approvalTransactions.length; i++){
            if (topDate.getTime()<approvalTransactions[i].timeStamp*1000){
                monthlyVaR.push(totalVaR)
                bottomDate.setMonth(bottomDate.getMonth()+1)
                topDate.setMonth(topDate.getMonth()+1)
                totalVaR = 0
            }
            if (bottomDate.getTime()<approvalTransactions[i].timeStamp*1000 && topDate.getTime()>approvalTransactions[i].timeStamp*1000){
                let allowance = approvalTransactions[i].allowance
                let balance = approvalTransactions[i].balance
                allowance = parseInt(allowance)/10**18
                balance = parseInt(balance)/10**18
                if (balance<allowance){
                    totalVaR += balance
                } else {
                    totalVaR += allowance
                }
            }
        }

        let changingDate = new Date(currentDate.getFullYear()-1, currentDate.getMonth(), currentDate.getDate())
        let lineChartData = []
        for (let i=0; i<monthlyVaR.length; i++){
            const month = changingDate.toLocaleString('default', { month: 'short' })
            lineChartData.push({
                name: month + " " + changingDate.getFullYear(),
                uv: monthlyVaR[i]
            })
            changingDate.setMonth(changingDate.getMonth()+1)
        }
        finalData["lineChartData"] = lineChartData
        setData(finalData)
        setLoading(false)
    }

    useEffect(() =>{
        fetchData()
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
        <div className="w-9/10 md:w-auto flex flex-col md:max-w-mint-width py-6">
            <div className="w-full flex px-6">
                <div className="uppercase text-sm text-gray-600 hover:text-gray-500 cursor-pointer mb-4 flex-1" onClick={() => props.navigate("/")}>
                    ◀
                    <span className="text-xs"> Back to leader board</span>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:min-w-mint-width md:max-w-mint-width px-6 pb-6 mb-5 rounded-lg custom-animations_shine__1YTqy  md:order-2 order-1">
                <div className="general-styles_screen-centered-container__3fxeE h-full pb-2">
                    <div className="rounded-lg">
                        <div className="px-1">
                            <div className="general-styles_screen-centered-container__3fxeE h-full pb-2">
                                <h1 className="text-center text-3xl">
                                    🔥 {props.chosenProtocol.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-2 pb-3">
                    <div className="w-64 border border:black h-40 rounded-lg custom-animations_shine__1YTqy overflow-y-auto overflow-x-auto no-scrollbar">
                        <h1 className="text-center text-xl pt-2">
                            Top 10 Users
                        </h1>
                        <div className="px-1">
                            <div className="general-styles_screen-centered-container__3fxeE h-full">
                                <form className="h-full">
                                    <div className="relative">
                                        <div className="inline-block mx-auto w-full">
                                            <div className="rounded-lg w-full max-h-20">
                                                <table className="w-full text-center divide-y divide-gray-200">
                                                    <thead className="divide-y divide-gray-200 bg-white border-b sticky top-0">
                                                        <tr className="text-xs md:text-xxs lg:text-xs">
                                                            <td className="px-1 underline font-bold">Rank</td>
                                                            <td className="px-1 underline font-bold">Address</td>
                                                            <td className="px-1 underline font-bold">Approval Adjusted VaR</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {
                                                        data.top10.map( (user, i) => {
                                                            if (i==0){
                                                               return(
                                                                    <tr key={i} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                                        <td className="px-1 py-3">{1} 🏆</td>
                                                                        <td className="px-1 py-3">{user.id}</td>
                                                                        <td className="px-1 py-3">${user.VaR}</td>
                                                                    </tr>
                                                                    )
                                                            } else if (i==1){
                                                                return(
                                                                    <tr key={i} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                                        <td className="px-1 py-3">{2} 🥈</td>
                                                                        <td className="px-1 py-3">{user.id}</td>
                                                                        <td className="px-1 py-3">${user.VaR}</td>
                                                                    </tr>
                                                                    )
                                                            } else if (i==2){
                                                                return(
                                                                    <tr key={i} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                                        <td className="px-1 py-3">{3} 🥉</td>
                                                                        <td className="px-1 py-3">{user.id}</td>
                                                                        <td className="px-1 py-3">${user.VaR}</td>
                                                                    </tr>
                                                                    )
                                                            } else {
                                                                return(
                                                                    <tr key={i} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                                        <td className="px-1 py-3">{i+1}</td>
                                                                        <td className="px-1 py-3">{user.id}</td>
                                                                        <td className="px-1 py-3">${user.VaR}</td>
                                                                     </tr>
                                                                    )
                                                            }
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>    
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="w-64 border border:black h-40 rounded-lg custom-animations_shine__1YTqy overflow-y-auto no-scrollbar">
                        <h1 className="text-center text-xl pt-2">
                            Top 10 Tokens
                        </h1>
                        <div className="px-1">
                            <div className="general-styles_screen-centered-container__3fxeE h-full">
                                <form className="h-full">
                                    <div className="relative">
                                        <div className="inline-block mx-auto py-2 w-full">
                                            <div className="rounded-lg w-full max-h-20">
                                                <table className="w-full text-center divide-y divide-gray-200">
                                                    <thead className="divide-y divide-gray-200 bg-white border-b sticky top-0">
                                                        <tr className="text-xs md:text-xxs lg:text-xs">
                                                            <td className="px-1 underline font-bold py-3">Rank</td>
                                                            <td className="px-1 underline font-bold py-3">Name</td>
                                                            <td className="px-1 underline font-bold py-3">Approval Adjusted VaR</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {
                                                           
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="general-styles_screen-centered-container__3fxeE h-full pt-2 pb-2">
                    <div className="border border:black rounded-lg overflow-x-auto no-scrollbar">
                        <div className="px-1">
                            <div className="general-styles_screen-centered-container__3fxeE h-full pt-2">
                                <h1 className="text-center text-xl pt-2">
                                    💸 Yearly Approval Adjusted VaR
                                </h1>
                            </div>
                        </div>
                        <div className="px-1">
                            <div className="general-styles_screen-centered-container__3fxeE h-full pt-2 pb-2">
                                <LineChart width={800} height={300} data={data.lineChartData}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
    }

}

export default ChosenProtocol