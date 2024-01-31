import React, {useMemo, useState} from 'react'

const ConnectApps = () => {

  const [tab, setTab] = useState('')
  const [query, setQuery] = useState('')

  const dummyApps = [
    {
      logo:"/src/assets/media/logos/apps/google-calendar.png",
      name:"Calendar",
      description:'Automatically sync all your escrow transaction to know which is due.',
      connected:true,
      available:true,
    },
    {
      logo:"/src/assets/media/logos/apps/discord.png",
      name:"Discord",
      description:'Receive and manage escrow payment on Discord community app',
      connected:false,
      available:true,
    },
    {
      logo:"/src/assets/media/logos/apps/google-mail.png",
      name:"Gmail",
      description:'Receive and manage escrow payment on Discord community app',
      connected:false,
      available:true,
    },
    {
      logo:"/src/assets/media/logos/apps/slack.png",
      name:"Slack",
      description:'Automatically sync all your escrow transaction to know which is due.',
      connected:false,
      available:false,
    },
    {
      logo:"/src/assets/media/logos/apps/telegram.png",
      name:"Telegram",
      description:'Receive and manage escrow payment on Discord community app',
      connected:false,
      available:true,
    },
    {
      logo:"/src/assets/media/logos/apps/docsend.png",
      name:"DocSend",
      description:'Receive and manage escrow payment on Discord community app',
      connected:false,
      available:true,
    },
  ]

  const handleSearch = (e) => {
    setQuery(e.target.value)
  }

  const filteredApp = useMemo(() => dummyApps.filter(app => tab === 'connected' ? app.connected : dummyApps), [tab]);

  const searchedApps = useMemo(() => filteredApp.filter(app => app.name.toLowerCase().includes(query.toLowerCase())), [filteredApp, query]);

  return (
    <div className='pt-8'>
      <div className='pb-4 xl:pb-6 border-b-0.5 border-b-brandGray2x flex flex-col sm:flex-row justify-between gap-3 sm:gap-10 sticky top-0 pt-3 xl:pt-6 xl:top-0 left-0 bg-brandGray3x'>
          <div className='flex flex-row gap-3 items-center overflow-x-auto'>
            <button onClick={()=>setTab('')} aria-label="See all apps"  className={`py-2 px-7 whitespace-nowrap rounded-fifty trans-all-500-ease-in-out ${tab == '' ? 'bg-black text-white' : 'bg-transparent text-brandGray33x hover:bg-brandGray2x'}`}>All</button>
            <button onClick={()=>setTab('connected')} aria-label="See connected apps"  className={`py-2 px-7 whitespace-nowrap rounded-fifty trans-all-500-ease-in-out ${tab == 'connected' ? 'bg-black text-white' : 'bg-transparent text-brandGray33x hover:bg-brandGray2x'}`}>Connected App</button>
          </div>

          <div className='self-end'>
            <label htmlFor="appsSearch" className='rounded-ten py-2.5 border flex flex-row items-center gap-2 pl-2 border-brandGray7x w-full max-w-xs'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33334 13.3333C10.6471 13.3333 13.3333 10.647 13.3333 7.33325C13.3333 4.01954 10.6471 1.33325 7.33334 1.33325C4.01963 1.33325 1.33334 4.01954 1.33334 7.33325C1.33334 10.647 4.01963 13.3333 7.33334 13.3333Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M12.62 13.7931C12.9733 14.8598 13.78 14.9665 14.4 14.0331C14.9666 13.1798 14.5933 12.4798 13.5666 12.4798C12.8066 12.4731 12.38 13.0665 12.62 13.7931Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input onChange={handleSearch} type="search" name="appsSearch" id="appsSearch" placeholder='Filter by name' className='placeholder:text-xs w-full bg-transparent focus:outline-none focus:ring-none text-sm'/>
            </label>
          </div>
      </div>

      <div className='grid xs:grid-cols-1 bxs:grid-cols-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-9 gap-x-12 gap-y-7'>
          {searchedApps.map((app, idx) => {
            return <div key={idx} className={`p-5 rounded-twenty bg-white border-2 border-brandGray2x`}>
                <div className={`pb-3 flex justify-between gap-8 items-center`}>
                  <img src={app.logo} alt={app.name} className={`w-12`} />
                  <div>
                    {app.connected
                    ?
                    <p className='text-brandGreen3x text-sm px-2 py-0.5 w-fit rounded-five bg-brandLightGreen3x'>Connected</p>
                    :
                    <button type='button' aria-label={`Connect ${app.name} app`} className='text-black border-2 border-brandGray2x hover:border-brandGreen3x/50 transition-all duration-300 ease-in-out hover:shadow-lg active:translate-y-1 shadow-md text-sm px-2 py-0.5 w-fit rounded-five bg-white'>Connect</button>
                    }
                  </div>
                </div>

                <div className='pb-2'>
                  <p className='text-lg'>{app.name} {app.available || <span className={`text-xs px-2 py-0.5 text-brandRed4x rounded-five bg-brandLightRed2x`}>Coming soon</span>}</p>
                </div>
                <div>
                  <p className={`text-brandGray11x`}>{app.description}</p>
                </div>
            </div>
          })}
      </div>
    </div>
  )
}

export default ConnectApps