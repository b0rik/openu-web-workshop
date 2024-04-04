interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    message && (
      <div className='bg-[#B40000] text-[#ffffff] p-3 rounded-md'>
        {message}
      </div>
    )
  );
};
