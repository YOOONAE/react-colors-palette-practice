import DeleteIcon from "@mui/icons-material/Delete";
import "./DraggableBox.css";

function DraggableBoxOverLay(props) {
  const outerContainer = {
    backgroundColor: props.color,
    width: "100%",
    height: "100%",
  };

  return (
    <div style={outerContainer}>
      <div className="innerContainer">
        <div className="inBoxName">{props.name}</div>
        <div>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}

export default DraggableBoxOverLay;
