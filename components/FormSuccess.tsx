interface FormSuccessProps {
  message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    message &&
      <div className='bg-[#8ACA8B] text-[#363636] p-3 rounded-md'>
        {message}
      </div>
  )
}
