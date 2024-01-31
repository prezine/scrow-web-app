import React, { useState } from 'react'
import CopyButton from '../../../../Elements/Buttons/CopyButton'
import { PieChart } from 'react-minimal-pie-chart';



const VirtualCardModal = ({currentCard}) => {

    const [currentCardTab, setCurrentCardTab] = useState('overview')
    const [currentCardTabName, setCurrentCardTabName] = useState('Overview')
    const [currentCardTabTitle, setCurrentCardTabTitle] = useState('Overview')

    // console.log('currentCard', currentCard);

    const cardTabsData = [
        {
          id:"overview",
          name:"Overview",
          title:"Overview 🤙🏽",
        },
        {
          id:"fundCard",
          name:"Fund Card",
          title:"Fund Card",
        },
        {
          id:"history",
          name:"History",
          title:"History",
        },
    ]
    const cardSpendingData = [
        {
            title:"Apple Music",
            value:1000,
            color:"#3BB75E"
        },
        {
            title:"Spotify",
            value:1200,
            color:"#FF9800"
        },
        {
            title:"GoogleAds",
            value:4300,
            color:"#161616"
        },
        {
            title:"Netflix",
            value:2600,
            color:"#2A2AB2"
        },
        {
            title:"Others",
            value:40000,
            color:"#161616"
        },
    ]

  return (
    <div>
        <h1 className='text-2xl md:text-3xl text-center pb-1 text-brandGray14x font-avenirHeavy capitalize'>Manage Virtual Card</h1>
        <div className='py-5 flex items-center gap-3 overflow-x-auto justify-center'>
          {cardTabsData.map((cardTab, idx)=>{
            return <button key={idx} type="button" onClick={()=>{setCurrentCardTab(cardTab.id); setCurrentCardTabName(cardTab.name); setCurrentCardTabTitle(cardTab.title);}} className={`px-4 py-1.5 whitespace-nowrap ${cardTab.id == currentCardTab ? 'bg-brandDarkViolet1x text-white' : 'hover:bg-brandDarkViolet1x/20 text-brandGray6x'} rounded-fifty transition-all duration-300 ease-in-out text-sm`}>{cardTab.name}</button>
          })}
      </div>
      <div className={`bg-brandGray45x py-4 px-10 w-full`}>
            <div>
                <button type='button' className='pb-4 mx-auto w-fit px-4 flex gap-2 items-center text-sm text-brandGray11x'>
                    Card Balance
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M9.18572 3.46372C8.67822 3.31206 8.11822 3.21289 7.49988 3.21289C4.70572 3.21289 2.44238 5.47622 2.44238 8.27039C2.44238 11.0704 4.70572 13.3337 7.49988 13.3337C10.294 13.3337 12.5574 11.0704 12.5574 8.27622C12.5574 7.23789 12.2424 6.26956 11.7057 5.46456" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.90922 3.60366L8.22339 1.66699" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.90919 3.60352L7.94336 5.03852" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <p className='text-center text-24 font-avenirBlack'>{currentCard.currency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(currentCard.balance)}</p>
                <div className="w-eightyPercent mx-auto aspect-square pt-5">
                    <PieChart lineWidth={12} paddingAngle={10} rounded={3.5} labelStyle={{
                        fontSize: '12px',
                        fontFamily: 'sans-serif',
                        fill: '#E38627',
                    }} label={({ x, y, dx, dy, dataEntry }) => (<text
                        x={x}
                        y={y}
                        dx={dx}
                        dy={dy}
                        dominant-baseline="central"
                        text-anchor="middle"
                        style={{
                        fontSize: '10px',
                        fontFamily: 'sans-serif',
                        display: 'flex',
                        flexDirection: 'column',
                        gap:"10px"
                        }}
                    >
                        Hello
                        <tspan style={{
                        fontSize: '5px',
                        fontFamily: 'sans-serif',
                        display:"block",
                        position:'absolute',
                        paddingLeft:'10px'
                        }}>Hi</tspan>
                        <tspan style={{
                        fontSize: '5px',
                        fontFamily: 'sans-serif',
                        display:"block",
                        position:'absolute',
                        paddingLeft:'10px'
                        }}>Hi</tspan>
                    </text>) } labelPosition={0}
                        data={[
                            { title: cardSpendingData[0].title, value: cardSpendingData[0].value, color: cardSpendingData[0].color },
                            { title: cardSpendingData[1].title, value: cardSpendingData[1].value, color: cardSpendingData[1].color },
                            { title: cardSpendingData[2].title, value: cardSpendingData[2].value, color: cardSpendingData[2].color },
                            { title: cardSpendingData[3].title, value: cardSpendingData[3].value, color: cardSpendingData[3].color },
                        ]}
                    />
                </div>
                <div className='pt-4 grid grid-cols-4 gap-4'>
                    {
                        cardSpendingData.slice(0,4).map((spending, idx)=>{
                            return <div key={idx} className='flex gap-2 items-center'>
                            <div className='w-2 h-2 rounded-full' style={{backgroundColor: spending.color}}></div>
                            <p className='whitespace-nowrap overflow-hidden text-ellipsis text-brandGray11x text-xxs'>{spending.title}</p>
                        </div>
                        })
                    }
                </div>
                <div className='w-full py-12'>
                    <button className='bg-black text-white flex gap-2 items-center py-2 px-3.5 rounded-five font-spaceGroteskRegular text-sm w-fit mx-auto'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_16144_32169)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99995 1.33301C8.17676 1.33301 8.34633 1.40325 8.47136 1.52827C8.59638 1.65329 8.66662 1.82286 8.66662 1.99967V2.64101L9.10262 2.41034C9.25892 2.32768 9.44165 2.3105 9.61062 2.36257C9.77959 2.41464 9.92096 2.53171 10.0036 2.68801C10.0863 2.84431 10.1035 3.02704 10.0514 3.19601C9.99932 3.36498 9.88225 3.50635 9.72595 3.58901L8.66662 4.14901V5.41701C9.14328 5.53967 9.56795 5.79034 9.90262 6.13101L11.0013 5.49701L10.9566 4.29967C10.95 4.12295 11.0138 3.95083 11.1341 3.82118C11.2544 3.69153 11.4212 3.61497 11.598 3.60834C11.7747 3.60171 11.9468 3.66555 12.0764 3.78583C12.2061 3.9061 12.2827 4.07295 12.2893 4.24967L12.3073 4.74301L12.8626 4.42234C12.9385 4.37788 13.0224 4.34885 13.1095 4.33694C13.1966 4.32503 13.2852 4.33047 13.3702 4.35294C13.4552 4.37541 13.5349 4.41448 13.6047 4.46788C13.6746 4.52129 13.7332 4.58798 13.7771 4.66412C13.8211 4.74026 13.8496 4.82435 13.8609 4.91153C13.8722 4.99872 13.8662 5.08729 13.8432 5.17214C13.8201 5.25698 13.7805 5.33644 13.7267 5.40592C13.6728 5.47541 13.6057 5.53355 13.5293 5.57701L12.974 5.89701L13.392 6.15967C13.4661 6.20625 13.5304 6.26697 13.581 6.33838C13.6317 6.40979 13.6679 6.49048 13.6874 6.57585C13.7069 6.66122 13.7093 6.74959 13.6947 6.83592C13.68 6.92225 13.6485 7.00486 13.602 7.07901C13.5554 7.15316 13.4947 7.21741 13.4232 7.2681C13.3518 7.31878 13.2711 7.35491 13.1858 7.37441C13.1004 7.39391 13.012 7.3964 12.9257 7.38175C12.8394 7.3671 12.7568 7.33558 12.6826 7.28901L11.668 6.65167L10.57 7.28501C10.6999 7.75237 10.6999 8.24631 10.57 8.71367L11.668 9.34768L12.6826 8.71034C12.8324 8.61628 13.0134 8.58556 13.1858 8.62494C13.3582 8.66432 13.5079 8.77058 13.602 8.92034C13.696 9.0701 13.7267 9.25109 13.6874 9.4235C13.648 9.59591 13.5417 9.74561 13.392 9.83967L12.974 10.1017L13.5293 10.4223C13.6057 10.4658 13.6728 10.5239 13.7267 10.5934C13.7805 10.6629 13.8201 10.7424 13.8432 10.8272C13.8662 10.9121 13.8722 11.0006 13.8609 11.0878C13.8496 11.175 13.8211 11.2591 13.7771 11.3352C13.7332 11.4114 13.6746 11.4781 13.6047 11.5315C13.5349 11.5849 13.4552 11.6239 13.3702 11.6464C13.2852 11.6689 13.1966 11.6743 13.1095 11.6624C13.0224 11.6505 12.9385 11.6215 12.8626 11.577L12.308 11.257L12.2893 11.7497C12.2827 11.9264 12.2061 12.0932 12.0764 12.2135C11.9468 12.3338 11.7747 12.3976 11.598 12.391C11.4212 12.3844 11.2544 12.3078 11.1341 12.1782C11.0138 12.0485 10.95 11.8764 10.9566 11.6997L11.0013 10.5023L9.90262 9.86834C9.56795 10.2083 9.14262 10.4597 8.66662 10.5823V11.8503L9.72595 12.4103C9.88225 12.493 9.99932 12.6344 10.0514 12.8033C10.1035 12.9723 10.0863 13.155 10.0036 13.3113C9.92096 13.4676 9.77959 13.5847 9.61062 13.6368C9.44165 13.6889 9.25892 13.6717 9.10262 13.589L8.66662 13.3583V13.9997C8.66662 14.1765 8.59638 14.3461 8.47136 14.4711C8.34633 14.5961 8.17676 14.6663 7.99995 14.6663C7.82314 14.6663 7.65357 14.5961 7.52855 14.4711C7.40352 14.3461 7.33328 14.1765 7.33328 13.9997V13.3583L6.89728 13.589C6.81989 13.6299 6.7352 13.6552 6.64803 13.6634C6.56087 13.6716 6.47294 13.6626 6.38928 13.6368C6.30561 13.611 6.22784 13.569 6.16041 13.5131C6.09298 13.4573 6.03721 13.3887 5.99628 13.3113C5.95536 13.2339 5.93007 13.1493 5.92188 13.0621C5.91368 12.9749 5.92273 12.887 5.94851 12.8033C5.9743 12.7197 6.01631 12.6419 6.07215 12.5745C6.12799 12.507 6.19656 12.4513 6.27395 12.4103L7.33328 11.8503V10.5823C6.86393 10.461 6.43658 10.2139 6.09728 9.86767L4.99862 10.5023L5.04328 11.6997C5.04652 11.7872 5.0325 11.8745 5.002 11.9565C4.97151 12.0386 4.92515 12.1139 4.86556 12.1781C4.80598 12.2422 4.73434 12.294 4.65474 12.3305C4.57513 12.367 4.48912 12.3874 4.40162 12.3907C4.31411 12.3939 4.22683 12.3799 4.14475 12.3494C4.06266 12.3189 3.98739 12.2725 3.92322 12.213C3.85906 12.1534 3.80726 12.0817 3.77078 12.0021C3.7343 11.9225 3.71386 11.8365 3.71062 11.749L3.69262 11.2563L3.13728 11.5763C3.06139 11.6233 2.97685 11.6545 2.88866 11.6682C2.80047 11.6819 2.71044 11.6777 2.6239 11.6559C2.53735 11.6342 2.45606 11.5952 2.38484 11.5415C2.31362 11.4877 2.25392 11.4202 2.20928 11.3429C2.16464 11.2656 2.13596 11.1802 2.12496 11.0916C2.11396 11.003 2.12085 10.9132 2.14522 10.8273C2.16959 10.7415 2.21095 10.6614 2.26684 10.5918C2.32274 10.5223 2.39203 10.4646 2.47062 10.4223L3.02595 10.1017L2.60795 9.83901C2.46216 9.74319 2.35973 9.59404 2.32266 9.42356C2.28559 9.25308 2.31682 9.07486 2.40965 8.92715C2.50248 8.77944 2.64952 8.674 2.81921 8.63347C2.9889 8.59293 3.16771 8.62053 3.31728 8.71034L4.33195 9.34768L5.42995 8.71367C5.30027 8.24651 5.30027 7.75284 5.42995 7.28567L4.33195 6.65234L3.31728 7.28901C3.16771 7.37882 2.9889 7.40642 2.81921 7.36588C2.64952 7.32535 2.50248 7.21991 2.40965 7.0722C2.31682 6.92449 2.28559 6.74627 2.32266 6.57579C2.35973 6.40531 2.46216 6.25616 2.60795 6.16034L3.02595 5.89767L2.47062 5.57767C2.31741 5.48927 2.2056 5.34362 2.15978 5.17278C2.11396 5.00193 2.13788 4.81988 2.22628 4.66667C2.31469 4.51347 2.46034 4.40166 2.63118 4.35583C2.80203 4.31001 2.98408 4.33394 3.13728 4.42234L3.69262 4.74301L3.71062 4.24967C3.71725 4.07295 3.79381 3.9061 3.92346 3.78583C3.98766 3.72627 4.06295 3.67995 4.14505 3.6495C4.22715 3.61904 4.31445 3.60506 4.40195 3.60834C4.48946 3.61162 4.57546 3.63211 4.65504 3.66863C4.73463 3.70515 4.80624 3.75699 4.8658 3.82118C4.92535 3.88538 4.97168 3.96068 5.00213 4.04278C5.03258 4.12488 5.04657 4.21217 5.04328 4.29967L4.99862 5.49701L6.09728 6.13167C6.43658 5.78543 6.86393 5.53833 7.33328 5.41701V4.14901L6.27395 3.58901C6.11765 3.50635 6.00059 3.36498 5.94851 3.19601C5.89644 3.02704 5.91363 2.84431 5.99628 2.68801C6.07894 2.53171 6.22031 2.41464 6.38928 2.36257C6.55825 2.3105 6.74098 2.32768 6.89728 2.41034L7.33328 2.64101V1.99967C7.33328 1.82286 7.40352 1.65329 7.52855 1.52827C7.65357 1.40325 7.82314 1.33301 7.99995 1.33301ZM7.99995 9.33301C8.35357 9.33301 8.69271 9.19253 8.94276 8.94248C9.19281 8.69243 9.33328 8.3533 9.33328 7.99967C9.33328 7.64605 9.19281 7.30691 8.94276 7.05687C8.69271 6.80682 8.35357 6.66634 7.99995 6.66634C7.64633 6.66634 7.30719 6.80682 7.05714 7.05687C6.80709 7.30691 6.66662 7.64605 6.66662 7.99967C6.66662 8.3533 6.80709 8.69243 7.05714 8.94248C7.30719 9.19253 7.64633 9.33301 7.99995 9.33301Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_16144_32169">
                            <rect width="16" height="16" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        Freeze card
                    </button>
                </div>
            </div>

            {/* overview */}
            {currentCardTab == 'overview'
            &&
            <div>
                <div className='text-sm flex py-3'>
                    <p className='font-avenirBlack text-brandGray6x w-fortyPercent pr-5'>Card Label</p>
                    <p className='w-sixtyPercent text-brandGray11x'>{currentCard.cardLabel}</p>
                </div>
                <div className='text-sm flex py-3'>
                    <p className='font-avenirBlack text-brandGray6x w-fortyPercent pr-5'>Card Name</p>
                    <p className='w-sixtyPercent text-brandGray11x'>{currentCard.name}</p>
                </div>
                <div className='text-sm flex py-3'>
                    <p className='font-avenirBlack text-brandGray6x w-fortyPercent pr-5'>Card Number</p>
                    <p className='w-sixtyPercent text-brandGray11x flex gap-2 items-center'>{currentCard.cardNumber} <CopyButton text={currentCard.cardNumber} /> </p>
                </div>
                <div className='text-sm flex py-3'>
                    <p className='font-avenirBlack text-brandGray6x w-fortyPercent pr-5'>CVV</p>
                    <p className='w-sixtyPercent text-brandGray11x'>{currentCard.cardCVV}</p>
                </div>
                <div className='text-sm flex py-3'>
                    <p className='font-avenirBlack text-brandGray6x w-fortyPercent pr-5'>Expiry Date</p>
                    <p className='w-sixtyPercent text-brandGray11x'>{currentCard.cardExpiry}</p>
                </div>
                <div className='text-sm flex pt-3'>
                    <p className='font-avenirBlack text-brandGray6x w-fortyPercent pr-5'>Billing Address</p>
                    <p className='w-sixtyPercent text-brandGray11x'>{currentCard.billingAddress}</p>
                </div>
            </div>}

            {
                currentCardTab == 'history'
                &&
                <div>
                    {cardSpendingData.map((spending, idx)=>{
                        return <div className='text-xs flex gap-8 py-3 w-full justify-between'>
                            <div className={'flex items-center gap-2'}>
                                <div className='w-3 h-3 rounded-full' style={{backgroundColor: spending.color}}></div>
                                <p className='text-brandGray6x capitalize'>{spending.title}</p>
                            </div>
                            <p className='text-brandGray11x capitalize'>{currentCard.currency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(spending.value)}</p>
                        </div>
                    })}
                </div>
            }
      </div>
    </div>
  )
}

export default VirtualCardModal