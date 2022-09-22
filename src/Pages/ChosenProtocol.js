import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [{name: 'January', uv: 400, pv: 2400, amt: 1000}, {name: "February", uv: 400, pv: 1800, amt: 1000}];

function ChosenProtocol(props){

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
                                    🔥 {props.chosenProtocol[0]}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-2 pb-3">
                    <div className="w-64 border border:black h-40 rounded-lg custom-animations_shine__1YTqy overflow-y-auto no-scrollbar">
                        <h1 className="text-center text-xl pt-2">
                            Top 10 Users
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
                                                        //chosenContracts.map( (contract, i) => {
                                                        //    if (i==0){
                                                        //       return(
                                                        //            <tr key={i} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                        //                <td className="px-1 py-3">{1} 🏆</td>
                                                        //                <td className="px-1 py-3">{contract}</td>
                                                        //                <td className="px-1 py-3">$$$</td>
                                                        //            </tr>
                                                        //            )
                                                        //    } else if (i==1){
                                                        //        return(
                                                        //            <tr key={i} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                        //                <td className="px-1 py-3">{2} 🥈</td>
                                                        //                <td className="px-1 py-3">{contract}</td>
                                                        //                <td className="px-1 py-3">$$$</td>
                                                        //            </tr>
                                                        //            )
                                                        //    } else if (i==2){
                                                        //        return(
                                                        //            <tr key={i} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                        //                <td className="px-1 py-3">{3} 🥉</td>
                                                        //                <td className="px-1 py-3">{contract}</td>
                                                        //                <td className="px-1 py-3">$$$</td>
                                                        //            </tr>
                                                        //            )
                                                        //    } else {
                                                        //        return(
                                                        //            <tr key={i} className="text-xs md:text-xxs lg:text-xs shadow-md">
                                                        //                <td className="px-1 py-3">{i+1}</td>
                                                        //                <td className="px-1 py-3">{contract}</td>
                                                        //                <td className="px-1 py-3">$$$</td>
                                                        //             </tr>
                                                        //            )
                                                        //    }
                                                        //})
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
                    <div className="border border:black rounded-lg">
                        <div className="px-1">
                            <div className="general-styles_screen-centered-container__3fxeE h-full pt-2">
                                <h1 className="text-center text-xl pt-2">
                                    💸 Yearly Approval Adjusted VaR
                                </h1>
                            </div>
                        </div>
                        <div className="px-1">
                            <div className="general-styles_screen-centered-container__3fxeE h-full pt-2 pb-2">
                                <LineChart width={500} height={300} data={data}>
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

export default ChosenProtocol