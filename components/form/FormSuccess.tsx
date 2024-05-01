interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    message && (
      <div className='rounded-md bg-green-400 p-3 text-black'>{message}</div>
    )
  );
};
