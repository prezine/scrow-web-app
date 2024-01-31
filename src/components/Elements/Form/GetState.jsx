import React from 'react'
import { Country, State, City }  from 'country-state-city';

const GetState = ({stateName}) => {
    // console.log(Country.getAllCountries())
    // console.log(State.getStatesOfCountry('NG'))

  return (
    <>
        {
            stateName !== '' && stateName.toLowerCase() == 'nigeria'
            &&
            State.getStatesOfCountry('NG').map((state, idx)=>{
                return <option key={idx} value={state.name}>{state.name}</option>
            })

        }
        {
            stateName !== '' && stateName.toLowerCase() == 'ghana'
            &&
            State.getStatesOfCountry('GH').map((state, idx)=>{
                return <option key={idx} value={state.name}>{state.name}</option>
            })

        }
        {
            stateName !== '' && stateName.toLowerCase() == 'kenya'
            &&
            State.getStatesOfCountry('KE').map((state, idx)=>{
                return <option key={idx} value={state.name}>{state.name}</option>
            })

        }
        {
            stateName !== '' && stateName.toLowerCase() == 'united states'
            &&
            State.getStatesOfCountry('US').map((state, idx)=>{
                return <option key={idx} value={state.name}>{state.name}</option>
            })

        }
    </>
  )
}

export default GetState