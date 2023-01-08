import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Test() {
  const [items, setItems] = useState([
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
  ]);

  function handleDragEnd(e) {
    const { active, over } = e;

    // console.log('eventL:', e)

    if (active.id != over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div style={{ width: "100%", height: "100vh" }}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

    // console.log('console.log:', transition)

  const style = {
    transform: CSS.Transform.toString(transform),
    // transform,
    transition,
    width: "25%",
    height: "20%",
    backgroundColor: "skyblue",
    display: "inline-block",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
}

// ------------------------------------------------back up

// import { useState } from "react";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// function Test() {
//   const [languages, setLanguages] = useState([
//     "Javascript",
//     "Python",
//     "Typescript",
//   ]);

//   const style = {
//     container: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       height: "100vh",
//       paddingTop: "5rem",
//     },
//     box: {
//       width: "700px",
//       height: "100px",
//       backgroundColor: "skyblue",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       margin:'3px'
//     },
//   };

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <div style={style.container}>
//           <h3 style={style.box}>{languages[0]}</h3>
//           <h3 style={style.box}>{languages[1]}</h3>
//           <h3 style={style.box}>{languages[2]}</h3>
//       </div>
//     </DndContext>
//   );
// }

// function handleDragEnd(event) {
//   console.log("drag and called!");
// }

// export default Test;
