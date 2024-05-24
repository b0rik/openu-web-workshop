interface FormSuccessProps {
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

export const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    message && (
      <div>
        <style>{keyframes}</style>
        <div className='rounded-md bg-green-400 p-3 text-black' style={style}>
          {message}
        </div>
      </div>
    )
  );
};
