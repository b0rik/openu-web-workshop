interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    message && (
      <div className='rounded-md bg-[#8ACA8B] p-3 text-[#363636]'>
        {message}
      </div>
    )
  );
};
