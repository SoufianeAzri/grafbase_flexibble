import React from 'react'

type Props = {
  type?: string;
  title : string;
  state : string;
  placeholder : string;
  isTextArea? : boolean;
  setState: (value: string) => void;
}

const FormField = ({type, title, state, placeholder, isTextArea, setState}: Props) => {
  return (
    <div className='flexStart gap-4 w-full flex-col'>
      <label className='w-full text-gray-100'>
        {title}
      </label>
      {
        isTextArea ? (
          <textarea 
            placeholder={placeholder}
            value={state}
            required
            className='form_field-input'
            onChange={(e)=> setState(e.target.value)}
          />
        ) : (
          <input 
            type={type || 'text'}
            placeholder={placeholder}
            value={state}
            required
            className='form_field-input'
            onChange={(e)=> setState(e.target.value)}
          />
        )
      }
    </div>
  )
}

export default FormField