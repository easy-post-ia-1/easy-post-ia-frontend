const ErrorFormHelperText = ({ text }: { text: string | undefined }) => {
  if (text?.length === 0) return <></>;

  return (
    <>
      {text?.split('\n').map((line: string, index: number) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </>
  );
};

export default ErrorFormHelperText;
