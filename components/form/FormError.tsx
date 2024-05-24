interface FormErrorProps {
  message?: string;
}

const style = {
  animation: 'open 0.20s linear',
};

const keyframes = `
  @keyframes open {
    from {
      opacity: 0;

    }
    to {
      opacity: 1;
    }
  }
`;

export const FormError = ({ message }: FormErrorProps) => {
  return (
    message && (
      <div>
        <style>{keyframes}</style>
        <div className='rounded-md bg-red-600 p-3 text-white' style={style}>
          {message}
        </div>
      </div>
    )
  );
};
