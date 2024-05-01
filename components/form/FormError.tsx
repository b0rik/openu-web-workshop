interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    message && (
      <div className='rounded-md bg-red-600 p-3 text-white'>{message}</div>
    )
  );
};
