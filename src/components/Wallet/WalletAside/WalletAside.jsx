
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import VirtualCard from '../../Elements/Cards/Wallet/VirtualCard'
import ModalWrap from '../../Elements/Modal/ModalWrap'
import { Navigation, Pagination } from 'swiper';import PayService from './Modals/PayService'
import SendService from './Modals/SendService'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Alert from '../../Elements/Alerts/Alert';
import VirtualCardModal from './Modals/VirtualCard/VirtualCardModal';
import NoVirtualCardModal from './Modals/VirtualCard/NoVirtualCardModal';


const WalletAside = ({balance, currency, walletDataFetched, accountDataIsFetched, accountDataFetched, mutate, virtualAccount}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCardModalOpen, setIsCardModalOpen] = useState(false)
    const [isNoCardModalOpen, setIsNoCardModalOpen] = useState(false)
    const [currentService, setCurrentService] = useState('fund')
    const [currentCard, setCurrentCard] = useState({})
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const virtualAccountsActive = false

    const cards = [
        {
            id:"20pc",
            balance:230000,
            currency:'NGN',
            name:"Issie Ekwemuka",
            cardLabel:"Virtual Card 1 Balance",
            cardNumber:"4536 6354 7263 7236",
            cardCVV:"546",
            cardExpiry:"09/27",
            billingAddress:"672 Wokpor Street "
        },
        {
            id:"40df",
            balance:46000,
            currency:"USD",
            name:"Isioma Ekwemuka",
            cardLabel:"Virtual Card 2 Balance",
            cardNumber:"5625 3533 8345 0234",
            cardCVV:"994",
            cardExpiry:"02/28",
            billingAddress:"672 Wokpornin Street "
        }
    ]

    const handleCardModalOpen = (id) => {
        setIsCardModalOpen(true)
        const tempCard = cards.filter(card => card.id == id)
        // console.log(tempCard[0]);
        let currentTemp = tempCard[0]
        setCurrentCard(currentTemp)
    }

    const handleNoCardModalOpen = (id) => {
        setIsNoCardModalOpen(true)
    }

    const handleModal = (current) => {
        setIsModalOpen(true)
        setCurrentService(current)
    }

    const services = [
        // {
        //     icon:<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <circle cx="23" cy="23" r="23" fill="#3BB75E"/>
        //     <path opacity="0.4" d="M29.0939 26.4224L20.7713 29.1966C17.0378 30.4411 15.0025 28.4058 16.247 24.6723L19.0212 16.3497C20.888 10.7494 23.9409 10.7559 25.8012 16.3497L26.3586 18.0349C26.5271 18.5275 26.9096 18.91 27.4022 19.0785L29.0939 19.6424C34.6877 21.5027 34.6877 24.5621 29.0939 26.4224Z" fill="white"/>
        //     <path d="M20.1166 24.3547L23.6168 20.8546C23.8825 20.5888 24.3233 20.5888 24.5891 20.8546C24.8548 21.1203 24.8548 21.5611 24.5891 21.8268L21.0889 25.327C20.8231 25.5928 20.3824 25.5928 20.1166 25.327C19.8509 25.0613 19.8509 24.6205 20.1166 24.3547Z" fill="white"/>
        //     </svg>,
        //     name:"Fund Wallet",
        //     description:"Send money into your Pandascrow wallet",
        //     actionType:"button",
        //     link:"",
        //     id:'fund'
        // },
        {
            icon:<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="23" cy="23" r="23" fill="#FF9800"/>
            <path opacity="0.4" d="M18.5175 17.4633L26.7859 14.7041C30.4984 13.4666 32.515 15.4924 31.2867 19.2049L28.5275 27.4733C26.6759 33.0374 23.6325 33.0374 21.7809 27.4733L20.965 25.0166L18.5084 24.2008C12.9534 22.3583 12.9534 19.3241 18.5175 17.4633Z" fill="white"/>
            <path d="M23.1101 22.6608L26.6026 19.1592L23.1101 22.6608Z" fill="white"/>
            <path d="M23.11 23.3483C22.9358 23.3483 22.7617 23.2841 22.6242 23.1466C22.3583 22.8808 22.3583 22.4408 22.6242 22.1749L26.1075 18.6733C26.3733 18.4074 26.8133 18.4074 27.0792 18.6733C27.345 18.9391 27.345 19.3791 27.0792 19.6449L23.5958 23.1466C23.4583 23.2749 23.2842 23.3483 23.11 23.3483Z" fill="white"/>
            </svg>,
            name:"Send Money",
            description:"Transfer money to some other bank",
            actionType:"button",
            link:"",
            id:'send'
        },
        {
            icon:<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="23" cy="23" r="23" fill="#2A2AB3"/>
            <path opacity="0.4" d="M18.1691 30.0583C18.9208 29.2516 20.0666 29.3158 20.7266 30.1958L21.6524 31.4333C22.3949 32.4141 23.5958 32.4141 24.3383 31.4333L25.2641 30.1958C25.9241 29.3158 27.0699 29.2516 27.8216 30.0583C29.4533 31.7999 30.7824 31.2224 30.7824 28.7841V18.4533C30.7916 14.7591 29.9299 13.8333 26.4649 13.8333H19.5349C16.0699 13.8333 15.2083 14.7591 15.2083 18.4533V28.7749C15.2083 31.2224 16.5466 31.7908 18.1691 30.0583Z" fill="white"/>
            <path d="M26.6666 19.1042H19.3333C18.9574 19.1042 18.6458 18.7926 18.6458 18.4167C18.6458 18.0409 18.9574 17.7292 19.3333 17.7292H26.6666C27.0424 17.7292 27.3541 18.0409 27.3541 18.4167C27.3541 18.7926 27.0424 19.1042 26.6666 19.1042Z" fill="white"/>
            <path d="M25.75 22.7708H20.25C19.8742 22.7708 19.5625 22.4591 19.5625 22.0833C19.5625 21.7074 19.8742 21.3958 20.25 21.3958H25.75C26.1258 21.3958 26.4375 21.7074 26.4375 22.0833C26.4375 22.4591 26.1258 22.7708 25.75 22.7708Z" fill="white"/>
            </svg>,
            name:"Pay Bills",
            description:"Pay your utility bills (electricity, etc)",
            actionType:"button",
            link:"",
            id:'pay'
        },
        {
            icon:<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="23" cy="23" r="23" fill="#161616"/>
            <path opacity="0.4" d="M32.1666 20.25V27.0883C32.1666 29.1875 30.4616 30.8833 28.3624 30.8833H17.6374C15.5383 30.8833 13.8333 29.1875 13.8333 27.0883V20.25H32.1666Z" fill="white"/>
            <path d="M32.1666 18.9117V20.25H13.8333V18.9117C13.8333 16.8125 15.5383 15.1167 17.6374 15.1167H28.3624C30.4616 15.1167 32.1666 16.8125 32.1666 18.9117Z" fill="white"/>
            <path d="M19.3333 27.8125H17.5C17.1242 27.8125 16.8125 27.5008 16.8125 27.125C16.8125 26.7492 17.1242 26.4375 17.5 26.4375H19.3333C19.7092 26.4375 20.0208 26.7492 20.0208 27.125C20.0208 27.5008 19.7092 27.8125 19.3333 27.8125Z" fill="white"/>
            <path d="M25.2917 27.8125H21.625C21.2492 27.8125 20.9375 27.5008 20.9375 27.125C20.9375 26.7492 21.2492 26.4375 21.625 26.4375H25.2917C25.6675 26.4375 25.9792 26.7492 25.9792 27.125C25.9792 27.5008 25.6675 27.8125 25.2917 27.8125Z" fill="white"/>
            </svg>,
            name:"Create Virtual Card",
            description:"Create virtual card for online purchases",
            actionType: virtualAccountsActive ? 'link' : 'button',
            link:"#",
            id:'create'
        },
    ]

 

  return (
    <div className='flex flex-col gap-10'>
        <div>
            <h2 className='text-sm font-avenirMedium'>WALLET SERVICE</h2>
            <div>
          {services.map((data, idx)=>{
            return <>
                {data.actionType == 'button'
                &&
                <button type='button' onClick={()=>{data.id == 'create' ? handleNoCardModalOpen() : handleModal(data.id)}} key={idx} className={'py-5 flex flex-col md:flex-row md:items-center gap-10 justify-between'}>
                    <div className='flex items-center gap-3'>
                    {data.icon}
                    <div>
                        <div className='flex items-center gap-2 hover:gap-3 group trans-all-500-ease-in-out'>
                                <h3 className='font-avenirHeavy text-brandGray12x pb-1'>{data.name}</h3>
                                <svg className="trans-all-500-ease-in-out group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0 -translate-x-6 invisible opacity-0" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.3999 4.94751L14.7746 9.50001L10.3999 14.0525" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path opacity="0.4" d="M2.52246 9.5H14.652" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                        <p className='text-xs font-avenirMedium text-brandGray8x'>{data.description}</p>
                    </div>
                    </div>
                </button>
                }
                {data.actionType == 'link'
                &&
                <NavLink to={data.link} key={idx} className={'py-5 flex flex-col md:flex-row md:items-center gap-10 justify-between'}>
                    <div className='flex items-center gap-3'>
                    {data.icon}
                    <div>
                        <div className='flex items-center gap-2 hover:gap-3 group trans-all-500-ease-in-out'>
                                <h3 className='font-avenirHeavy text-brandGray12x pb-1'>{data.name}</h3>
                                <svg className="trans-all-500-ease-in-out group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0 -translate-x-6 invisible opacity-0" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.3999 4.94751L14.7746 9.50001L10.3999 14.0525" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path opacity="0.4" d="M2.52246 9.5H14.652" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                        <p className='text-xs font-avenirMedium text-brandGray8x'>{data.description}</p>
                    </div>
                    </div>
                </NavLink>
                }
            </>
          })}
        </div>
        </div>


        <div>
            <div className='flex flex-row gap-5 justify-between'>
                <h2 className='text-sm font-avenirMedium'>VIRTUAL CARD</h2>
            </div>
            {virtualAccountsActive ?
            <div className='py-4'>
                    {cards.length == 1 
                        ? 
                        <div>
                            {cards[0].card}
                        </div> 
                        :
                        <Swiper 
                        modules={[Navigation, Pagination]}
                        pagination={{ clickable: true }}
                        slidesPerView={1} 
                        spaceBetween={10}
                        className={`pb-12 virtual--card--swiper`}
                        >
                            {cards.map((card, idx)=>{
                                return <SwiperSlide key={idx}>
                                    <VirtualCard id={card.id} handleClick={()=>handleCardModalOpen(card.id)} expDate={card.cardExpiry} cardNumber={card.cardNumber} name={card.name} />
                                </SwiperSlide>
                            })}
                        </Swiper>
                    }
            </div> 
            :
            <div className='py-4'>
                <VirtualCard handleClick={()=>setIsNoCardModalOpen(true)} name={'COMING SOON'} expDate={'00/00'} cardType={'Null'} />
            </div>
            }
        </div>

        <ModalWrap conditional={currentService} key={'servicesModal'} id={'servicesModal'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
            <div className={`${currentService == 'fund' ? 'bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-sm h-fit' : 'bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-md h-fit'}`}>
                {currentService == 'pay' && <PayService key={'pay'} balance={balance} currency={currency} openAlert={openAlert} mutate={()=>walletDataFetched.mutate()} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={()=>setIsModalOpen(false)} />}
                {currentService == 'send' && <SendService key={'send'} balance={balance} currency={currency} openAlert={openAlert} mutate={()=>walletDataFetched.mutate()} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={()=>setIsModalOpen(false)} />}
            </div>
        </ModalWrap>
        <ModalWrap key={'cardModal'} id={'cardModal'} modalState={isCardModalOpen} handleModal={()=>setIsCardModalOpen(false)}>
            <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-md h-fit'>
                <VirtualCardModal currentCard={currentCard} />
            </div>
        </ModalWrap>
        <ModalWrap key={'noCardModal'} id={'noCardModal'} modalState={isNoCardModalOpen} handleModal={()=>setIsNoCardModalOpen(false)}>
            <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-md h-fit'>
                <NoVirtualCardModal  />
            </div>
        </ModalWrap>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default WalletAside
