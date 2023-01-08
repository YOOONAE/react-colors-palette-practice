import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "@mui/icons-material/Delete";
import './DraggableBox.css';

function DraggableBox(props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });

  const outerContainer = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: props.color,
    width: "20%",
    height: "25%",
    display: "inline-block",
    opacity: isDragging? 0.3 : 1
  };

  return (
    <div style={outerContainer} ref={setNodeRef} {...attributes} {...listeners}>
      <div className='innerContainer'>
        <div className="inBoxName">{props.name}</div>
        <div className="inBoxTrash">
          <DeleteIcon onClick={() => props.removeColorBox(props.id)} />
        </div>
      </div>
    </div>
  );
}

export default DraggableBox;
