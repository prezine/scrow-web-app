import React from 'react'
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const TransactionInsight = ({year, transactionData}) => {

    const labels = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    Chart.defaults.font.size = 12;
    const data = {
        labels: labels,
        barPercentage: 0.5,
        barThickness: 25,
        maxBarThickness: 25,
        minBarLength: 2,
        datasets: [
          {
            label: "Transaction Insight",
            backgroundColor: "#E2E2E2",
            borderColor: "#E2E2E2",
            data: [
                transactionData ? transactionData['January'] : 0, 
                transactionData ? transactionData['February'] : 0, 
                transactionData ? transactionData['March'] : 0, 
                transactionData ? transactionData['April'] : 0, 
                transactionData ? transactionData['May'] : 0, 
                transactionData ? transactionData['June'] : 0, 
                transactionData ? transactionData['July'] : 0, 
                transactionData ? transactionData['August'] : 0, 
                transactionData ? transactionData['September'] : 0, 
                transactionData ? transactionData['October'] : 0, 
                transactionData ? transactionData['November'] : 0, 
                transactionData ? transactionData['December'] : 0
            ],
          },
        ]
      };

      const options={
        responsive:true,
        maintainAspectRatio: false,  
        // allows setting height and width of chart element
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                border: {
                    display: false
                },
                ticks:{
                    maxTicksLimit: 7,
                    callback: function(label){
                       return new Intl.NumberFormat('en', { notation: 'compact' }).format(label)
                    },
                    autoSkip: false
                }
            },
            x: {
                grid: {
                    display: false
                },
                border: {
                    display: false
                },
                ticks: {
                    autoSkip: false
                },
            }
        },
        plugins: {
            legend: {
               display: false
               
            }
         }
      }

  return (
    <div className="xl:w-sixtyPercent px-6 py-6 rounded-thirty flex flex-col justify-between gap-10 self-stretch w-full border border-brandGray2x bg-white">
        <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg font-avenirMedium text-black">Transaction Insight</h2>
            <div className="relative">
                <div className="relative">
                    <button id="" type="submit" className="toggle-filter flex gap-2 items-center text-brandDashBluex shadow-md bg-white py-1 px-3 rounded-five border border-brandLightGray">
                        <p id="" className="md:inline-block hidden pr-1">{year ? year : new Date().getFullYear()}</p>
                        <svg className="inline-block" width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_7430_8043)">
                                <path d="M15.0417 1.58333H14.25V0.791667C14.25 0.581704 14.1666 0.38034 14.0181 0.231874C13.8697 0.0834075 13.6683 0 13.4583 0C13.2484 0 13.047 0.0834075 12.8985 0.231874C12.7501 0.38034 12.6667 0.581704 12.6667 0.791667V1.58333H6.33333V0.791667C6.33333 0.581704 6.24993 0.38034 6.10146 0.231874C5.95299 0.0834075 5.75163 0 5.54167 0C5.3317 0 5.13034 0.0834075 4.98187 0.231874C4.83341 0.38034 4.75 0.581704 4.75 0.791667V1.58333H3.95833C2.9089 1.58459 1.90282 2.00203 1.16076 2.74409C0.418698 3.48615 0.00125705 4.49224 0 5.54167L0 15.0417C0.00125705 16.0911 0.418698 17.0972 1.16076 17.8392C1.90282 18.5813 2.9089 18.9987 3.95833 19H15.0417C16.0911 18.9987 17.0972 18.5813 17.8392 17.8392C18.5813 17.0972 18.9987 16.0911 19 15.0417V5.54167C18.9987 4.49224 18.5813 3.48615 17.8392 2.74409C17.0972 2.00203 16.0911 1.58459 15.0417 1.58333ZM1.58333 5.54167C1.58333 4.91178 1.83356 4.30769 2.27895 3.86229C2.72435 3.41689 3.32844 3.16667 3.95833 3.16667H15.0417C15.6716 3.16667 16.2756 3.41689 16.721 3.86229C17.1664 4.30769 17.4167 4.91178 17.4167 5.54167V6.33333H1.58333V5.54167ZM15.0417 17.4167H3.95833C3.32844 17.4167 2.72435 17.1664 2.27895 16.721C1.83356 16.2756 1.58333 15.6716 1.58333 15.0417V7.91667H17.4167V15.0417C17.4167 15.6716 17.1664 16.2756 16.721 16.721C16.2756 17.1664 15.6716 17.4167 15.0417 17.4167Z" fill="#182CD1" />
                                <path d="M9.5 13.0625C10.1558 13.0625 10.6875 12.5308 10.6875 11.875C10.6875 11.2192 10.1558 10.6875 9.5 10.6875C8.84416 10.6875 8.3125 11.2192 8.3125 11.875C8.3125 12.5308 8.84416 13.0625 9.5 13.0625Z" fill="#182CD1" />
                                <path d="M5.54102 13.0625C6.19685 13.0625 6.72852 12.5308 6.72852 11.875C6.72852 11.2192 6.19685 10.6875 5.54102 10.6875C4.88518 10.6875 4.35352 11.2192 4.35352 11.875C4.35352 12.5308 4.88518 13.0625 5.54102 13.0625Z" fill="#182CD1" />
                                <path d="M13.459 13.0625C14.1148 13.0625 14.6465 12.5308 14.6465 11.875C14.6465 11.2192 14.1148 10.6875 13.459 10.6875C12.8031 10.6875 12.2715 11.2192 12.2715 11.875C12.2715 12.5308 12.8031 13.0625 13.459 13.0625Z" fill="#182CD1" /> </g>
                            <defs>
                                <clipPath id="clip0_7430_8043">
                                    <rect width="19" height="19" fill="white" /> </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <div id="" className="filter bg-white h-fit right-0 absolute top-11 w-44 rounded-fifteen shadow-md shadow-black/10 px-3 pb-4 hidden">
                        <button title="Last 7 days" type="button" className="pt-tenPixel  whitespace-nowrap w-full text-left border-b border-brandDashGray25x  text-brandDashGray26x">2020</button>
                        <button title="Last 30 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">2021</button>
                        <button title="Last 90 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">2023</button>
                        <button title="Last 180 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">2024</button>
                        <button title="Today" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">2050</button>
                        <button title="Custom range" type="button" className="pt-tenPixel text-left w-full  text-brandDashGray26x">Custom range</button>
                    </div>
                </div>
                {/* <div id="" className="bg-white h-fit right-0 absolute top-11 w-44 rounded-fifteen shadow-md shadow-black/10 px-3 pb-4 hidden">
                    <button title="Last 7 days" type="button" className="pt-tenPixel  whitespace-nowrap w-full text-left border-b border-brandDashGray25x  text-brandDashGray26x">Last 7 days</button>
                    <button title="Last 30 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">Last 30 days</button>
                    <button title="Last 90 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">Last 90 days</button>
                    <button title="Last 180 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">Last 180 days</button>
                    <button title="Today" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">Today</button>
                    <button title="Custom range" type="button" className="pt-tenPixel text-left w-full  text-brandDashGray26x">Custom range</button>
                </div> */}
            </div>
        </div>
        <div className='' id="transactionHistory" >
            <Bar data={data} options={options} className={'h-254 sm:h-307'} />
        </div>
    </div>
  )
}

export default TransactionInsight