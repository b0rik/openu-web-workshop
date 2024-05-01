interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    message && (
      <div className='rounded-md bg-[#B40000] p-3 text-[#ffffff]'>
        {message}
      </div>
    )
  );
};
