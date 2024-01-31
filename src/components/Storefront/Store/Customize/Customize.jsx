import React, {useEffect, useRef, useState} from 'react'
import Alert from '../../../Elements/Alerts/Alert'
import CopyButton from '../../../Elements/Buttons/CopyButton'
import FormSwitch from '../../../Elements/Form/FormSwitch'
import Preview from './Preview'

const Customize = ({store, storefront_color}) => {

  const [color, setColor] = useState('')
  const [newColor, setNewColor] = useState(color)
  const [editAbout, setEditAbout] = useState(false)
  const [editFB, setEditFB] = useState(true)
  const [editTwitter, setEditTwitter] = useState(true)
  const [editInsta, setEditInsta] = useState(true)
  const [error, setError] = useState(false)
  const link = 'jambtom'
  const [colorsData, setColorsData] = useState(
    [
      {
        color:"#6666FF"
      },
      {
        color:"#FF9800"
      },
      {
        color:"#FC5245"
      },
      {
        color:"#30C56B"
      },
      {
        color:"#67CCFA"
      },
      {
        color:"#6D3131"
      },
      {
        color:"#060463"
      },
    ]
  )

  useEffect(() => {
    if(storefront_color){
      const colorExists = colorsData.filter(data => data.color.toUpperCase() == storefront_color.toUpperCase()).length > 0
      if(!colorExists){
        setColorsData([...colorsData, {color:storefront_color.toUpperCase()}])
      }
      setColor(storefront_color.toUpperCase())
    }
  }, [])
  

  const [width, setWidth] = useState(null)
  const dummyWidthRef = useRef(null)

  const [formData, setFormData] = useState({
    about:"",
    fBURL:"",
    twitterURL:"",
    instaURL:"",
    color:color,
    darkMode:false,
    storeTip:false
  })
  
  const storeToUppercase  = store.charAt(0).toUpperCase() + store.slice(1)

  const addColor = (e) => {
    setNewColor(e.target.value);
    setColor((e.target.value).toUpperCase())
  }

  const confirmColor = (e) => {
    setError(false);
    const currentColor = color;
    setNewColor((e.target.value).toUpperCase());
    const lastColor = colorsData[colorsData.length - 1].color.toUpperCase();
    const colorExists = colorsData.filter(data => data.color.toUpperCase() == newColor.toUpperCase()).length > 0;

    if (newColor === lastColor) {
      return;
    }
    if (colorExists && newColor !== lastColor) {
      setColor(newColor)
      setFormData({...formData, color:newColor})
      // console.log("Colors => ", colorsData);
      // console.log("newColor => ", newColor);
      // console.log("e.target.value => ", e.target.value);
      // console.log("Color => ", color);
      setError(true);
      return;
    }

    const confirmed = window.confirm("Are you sure you want to use this color?");
    
    if (confirmed) {
      setColorsData([...colorsData, { "color": (e.target.value).toUpperCase() }]);
      setColor((e.target.value).toUpperCase())
      setFormData({...formData, color:(e.target.value).toUpperCase()})
    }else {
      setColor(currentColor);
      setFormData({...formData, color:currentColor})
    }
  }

  

  const handleChange = (e) => {
    // console.log(e);
    
      if(e.target.type == 'checkbox'){
        setFormData({...formData, [e.target.name]:e.target.checked})
      }else{
        setFormData({...formData, [e.target.name]:e.target.value})
      }
  }

  useEffect(() => {
    setWidth(dummyWidthRef.current.clientWidth)
  
    return () => {
      
    }
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
  }

  return (
    <div className='h-full md:flex md:flex-col'>
      <div className={`flex flex-col-reverse md:flex md:flex-row h-full md:overflow-hidden`}>
        {/* <div className='fixed bottom-0 h-seventyPercent' style={{width:`${width}px`}}>
        <Preview color={color} store={store} width={''} />
        </div> */}
        <div ref={dummyWidthRef} id='dummyWidth' className='hidden w-full md:w-fiftyFivePercent h-full'></div>

        <Preview color={color} store={store} width={'w-full md:w-fiftyFivePercent'} />


        <form action="" onSubmit={handleSubmit}  className='md:overflow-y-auto md:pl-10 md:h-full md:pr-4 pt-10 text-left pb-10 md:pb-0 flex flex-col w-full md:w-fortyFivePercent'>
          <div>
              
            {/* edit about business */}
            <div>
              <h3 className='text-lg font-avenirMedium pb-1'>About your business</h3>
              <div className='flex gap-6 items-center w-full'>
                <label htmlFor="about" className={`w-full sm:w-auto`}>
                  <input type="text" id='about' name='about' onChange={handleChange} readOnly={!editAbout} className={`bg-transparent ${!editAbout ? '' : 'px-2'} transition-all ease-in-out duration-300 py-1 text-sm w-full sm:min-w-240px placeholder:text-brandGray30x`} placeholder={`Welcome to ${storeToUppercase} Storefront`} />
                </label>
                <button className={`w-fit text-brandGreen1x`} onClick={()=>setEditAbout(prevEditAbout => !prevEditAbout)}>{editAbout ? 'save' : 'edit'}</button>
              </div>
            </div>

            {/* copy shareable link */}
            <div className='pt-10'>
              <h3 className='text-lg font-avenirMedium pb-1'>Shareable Link</h3>
              <div className='flex gap-6 items-center w-full'>
                <p className='text-brandGray30x text-sm w-full lg:w-auto lg:min-w-240px'>pandascrow.shop/<span className='text-black font-avenirMedium'>jambtom</span></p>
                <CopyButton text={`pandascrow.shop/${link}`} ariaLabel={'Copy shareable link'} />
              </div>
            </div>

            {/* edit socials url */}
            <div className={`pt-10`}>
              <h3 className='text-lg font-avenirMedium pb-1'>Social Media</h3>
              <div className={`space-y-1`}>

                {/* facebook */}
                <div className='flex gap-6 items-center w-full'>
                  <label htmlFor="fBURL" className={`w-full sm:w-auto`}>
                    <input type="text" id='fBURL' name='fBURL' onChange={handleChange} readOnly={!editFB} className={`bg-brandGray38x py-1.5 px-2 border-2 border-brandGray17x rounded-four transition-all ease-in-out duration-300 text-sm w-full sm:min-w-240px placeholder:text-black`} placeholder={`Facebook URL`} />
                  </label>
                  <button className={`w-fit text-brandGreen1x`} onClick={()=>setEditFB(prevEditFB => !prevEditFB)}>{editFB ? 'save' : 'edit'}</button>
                </div>

                {/* twitter */}
                <div className='flex gap-6 items-center w-full'>
                  <label htmlFor="twitterURL" className={`w-full sm:w-auto`}>
                    <input type="text" id='twitterURL' name='twitterURL' onChange={handleChange} readOnly={!editTwitter} className={`bg-brandGray38x py-1.5 px-2 border-2 border-brandGray17x rounded-four transition-all ease-in-out duration-300 text-sm w-full sm:min-w-240px placeholder:text-black`} placeholder={`Twitter URL`} />
                  </label>
                  <button className={`w-fit text-brandGreen1x`} onClick={()=>setEditTwitter(prevEditTwitter => !prevEditTwitter)}>{editTwitter ? 'save' : 'edit'}</button>
                </div>

                {/* instagram */}
                <div className='flex gap-6 items-center w-full'>
                  <label htmlFor="instaURL" className={`w-full sm:w-auto`}>
                    <input type="text" id='instaURL' name='instaURL' onChange={handleChange} readOnly={!editInsta} className={`bg-brandGray38x py-1.5 px-2 border-2 border-brandGray17x rounded-four transition-all ease-in-out duration-300 text-sm w-full sm:min-w-240px placeholder:text-black`} placeholder={`Instagram URL`} />
                  </label>
                  <button className={`w-fit text-brandGreen1x`} onClick={()=>setEditInsta(prevEditInsta => !prevEditInsta)}>{editInsta ? 'save' : 'edit'}</button>
                </div>
              </div>
            </div>
          </div>

          {/* colors */}
          <div className={`flex flex-col pt-10`}>
              <h3 className='text-lg font-avenirMedium pb-1'>Change Color</h3>
              <div className='flex flex-wrap gap-2 items-center rounded-eight bg-brandGray39x py-2 px-4 w-fit'>
                {colorsData.map((data, idx)=>{
                  return <button key={idx} onClick={()=>setColor(data.color.toUpperCase())} className={`border-2 p-0.75 rounded-fiftyPercent`} style={{borderColor:data.color.toUpperCase() == color.toUpperCase() ? data.color.toUpperCase() : 'transparent'}}>
                    <div className='h-7 w-7 rounded-fiftyPercent aspect-square' style={{backgroundColor:data.color.toUpperCase()}}></div>
                  </button>
                })}

                <label htmlFor="newColor" className='relative  flex items-center'>
                  <input type="color" name="newColor" id="newColor" value={color} className='w-0 h-0 m-0' onBlur={confirmColor} onChange={addColor}/>
                  <svg onClick={()=>setError(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <g opacity="0.4">
                    <path d="M8 12H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 16V8" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                  </svg>
                </label>
              </div>
          </div>

          {/* dark mode toggle */}
          <div className='pt-8 flex gap-10 items-center justify-between'>
            <p className='text-lg text-brandGray20x'>{formData.darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}</p>
            <FormSwitch switchId={'darkMode'} switchName={'darkMode'} switchChecked={formData.darkMode} handleChange={handleChange} />
          </div>

          {/* store tip toggle */}
          <div className='pt-8 flex gap-10 items-center justify-between'>
            <p className='text-lg text-brandGray20x'>{formData.storeTip ? 'Turn off Store Tip' : 'Turn on Store Tip'}</p>
            <FormSwitch switchId={'storeTip'} switchName={'storeTip'} switchChecked={formData.storeTip} handleChange={handleChange} />
          </div>

          {/* button */}
          <div className='py-10'>
            <button type='submit' className='w-full px-6 hover:pr-4 transition-all duration-500 ease-in-out py-3 bg-black font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center'>
                Update Storefront Changes
                <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M2.9165 10H16.9415" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
          </div>
        </form>
      </div>
      <Alert open={error} duration={3000} message={'Color exists already! Please choose another color'} type={'danger'} />
    </div>
  )
}

export default Customize