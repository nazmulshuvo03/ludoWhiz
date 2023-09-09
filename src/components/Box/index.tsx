interface BoxProps {
  id?: number;
  color?: string;
  reference?: any;
  handleClick?: (event: any) => void;
}

const Box = ({
  id = 1,
  color = "",
  reference = null,
  handleClick = () => {},
}: BoxProps) => {
  return (
    <div
      id={id.toString()}
      ref={reference}
      style={{
        backgroundColor: color,
      }}
      className="text-text border-backgroundAccent border-box border-solid 
      h-box w-box flex justify-center items-center rounded font-medium text-base"
      onClick={handleClick}
    >
      {id}
    </div>
  );
};

export default Box;
