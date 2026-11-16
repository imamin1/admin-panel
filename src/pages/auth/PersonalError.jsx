const PersonalError = ({children}) => {
  return (
    <small className='block text-center text-red-500 mt-2'>
      {children}
    </small>
  )
}

export default PersonalError