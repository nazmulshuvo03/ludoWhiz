import { BOX_BORDER, BOX_SIZE } from "../../constants/design";

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
        height: BOX_SIZE,
        width: BOX_SIZE,
        backgroundColor: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `${BOX_BORDER}px solid`,
      }}
      className="text-text border-text"
      onClick={handleClick}
    >
      {id}
    </div>
  );
};

export default Box;
