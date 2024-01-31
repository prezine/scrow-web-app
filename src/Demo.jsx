import React, { useRef, useState } from 'react'
import TemplatePage from './components/Elements/Wraps/TemplatePage'
import { Switch } from '@mantine/core';
import { PieChart } from 'react-minimal-pie-chart';

const Demo = () => {

  const switchRef = useRef(null)
  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    checked:checked,
    toggle:false
  })


  const handleChange = (e) => {
    // console.log(switchRef.currentTarget.checked);
    // setChecked(e.currentTarget.checked)
    setFormData({...formData, [e.target.name]:e.target.checked})
    console.log(e);
    console.log(formData);
    // console.log(switchRef);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
  }


  return (
    <TemplatePage hasButton={true} headerTitle={'Demo'} headerDescription={'Testing Stuff out'} >
      Widgets
      <form onSubmit={handleSubmit} >
        {/* <Switch
          ref={switchRef}
          checked={checked}
          value={checked ? 1 : 'off'}
          name={'checked'}
          id={'checked'}
          label="I agree to sell my privacy"
          color="#3BB75E"
          onLabel="ON" offLabel="OFF"
          onChange={()=>setChecked(switchRef.current.checked)}
        /> */}

  <div class="relative inline-block w-11 mr-2 align-middle select-none transition duration-200 ease-in">
      <input onChange={handleChange} type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute checked:left-6 left-1 peer top-fiftyPercent -translate-y-fiftyPercent block w-4 h-4 rounded-full bg-white appearance-none cursor-pointer"/>
      <label htmlFor="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 peer-checked:bg-brandGreen1x cursor-pointer"></label>
  </div>


        <button type="submit">Submit this</button>
      </form>

      <div className="w-fiftyPercent mx-auto aspect-square">
      <PieChart lineWidth={15} paddingAngle={5} labelStyle={{
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
          fontSize: '5px',
          fontFamily: 'sans-serif',
        }}
      >
        Hello
        <text style={{
          fontSize: '5px',
          fontFamily: 'sans-serif',
        }}>Hi</text>
      </text>) } labelPosition={0}
        data={[
          { title: 'One', value: 10, color: '#E38627' },
          { title: 'Two', value: 15, color: '#C13C37' },
          { title: 'Three', value: 20, color: '#6A2135' },
          { title: 'Four', value: 20, color: '#E38627' },
          { title: 'Five', value: 20, color: '#6A2135' },
        ]}
      />;
      </div>
    </TemplatePage>
  )
}

export default Demo