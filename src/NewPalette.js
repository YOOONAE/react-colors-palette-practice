//imported from MUI Drawer
// import * as React from "react";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

//custom import by me
import DraggableBox from "./DraggableBox";
import "./NewPalette.css";
import NewPaletteNavForm from "./NewPaletteNavForm";

//Dnd-kit
import {
  DndContext,
  useSensor, //initialize sensor with your own config
  useSensors, //put the initialized sensor into this sensor's' . then connect it to DndContext!
  PointerSensor,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";

import DraggableBoxOverLay from "./DraggableBoxOverLay";
import ColorPickerArea from "./ColorPickerArea";

export const drawerWidth = 300;

//Drawer Style
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

//Drawer Style
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

//NewPalette Component ================================================
export default function NewPalette(props, { limit = 20 }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [colorArray, updateColorArray] = useState(props.palettes[0].colors);

  //ColorPickerArea.js --------------------------------------------------- from here
  //ClearPalette Button
  const clearPaltte = () => updateColorArray([]);
  //randColorBtn Button it picks them from the existing palettes.
  const randColorBtn = (randColor) => updateColorArray([...colorArray, randColor]);
  //when 'ADD COLOR' button clicked by user
  const handleSubmitOfAddColorButton = (currentColor, currentName) => {
    updateColorArray([...colorArray, { color: currentColor, name: currentName } ]);
    console.log(`[${currentColor}, ${currentName}]Color has been added to the new palette`);
  };
  //ColorPickerArea.js --------------------------------------------------- to here

  //Drawer related fn
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  //remove Color box, a box
  const removeColorBox = (e) => {
    console.log("remove btn clicked");
    const result = colorArray.filter((data) => data.color !== e);
    updateColorArray(result);
  };

  //drag and drop related
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  });

  const sensors = useSensors(pointerSensor);

  function handleDragStart(event) {
    const result = colorArray.filter((c) => c.color === event.active.id)[0];

    setActiveId(result);
  }

  const handleOnDragEnd = (e) => {
    setActiveId(null);
    // console.log("handleOnDragEnd - e : ", e);
    // console.log('activeID:', activeId)
    const { active, over } = e;

    try {
      if (active.id !== over.id) {
        updateColorArray((colorArray) => {
          const oldIndex = colorArray.findIndex((d) => d.color === active.id);
          //   console.log("oldIndex", oldIndex);
          const newIndex = colorArray.findIndex((d) => d.color === over.id);
          //   console.log("newIndex", newIndex);

          return arrayMove(colorArray, oldIndex, newIndex);
        });
      }
    } catch (e) {
      console.log("no move");
    }
  };

  // the order of items prop from SortableContext must match the order of id from DraggableBox component.
  // Also, data must match the id of 'useSortable' hook in the child component.
  // It's like...     <SortableContext items={}> === <DraggableBox id={}> ==== useSortable({id: })
  // otherwise, it won't move.
  const reArrayToBeSortable = colorArray.map((data) => data.color);
  const addedColorBoxes = () => (
    <DndContext
      onDragEnd={handleOnDragEnd}
      sensors={sensors}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={reArrayToBeSortable}
        strategy={rectSortingStrategy}
      >
        {colorArray.map((c) => (
          <DraggableBox
            key={c.color}
            color={c.color}
            name={c.name}
            id={c.color}
            removeColorBox={removeColorBox}
          />
        ))}

        <DragOverlay>
          <DraggableBoxOverLay
            color={activeId && activeId.color}
            name={activeId && activeId.name}
          />
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <NewPaletteNavForm
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        colorArray={colorArray}
        {...props}
      />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <div style={{height:'100%', display:'flex', justifyContent:'center'}}>
        <ColorPickerArea
          clearPaltte={clearPaltte}
          randColorBtn={randColorBtn}
          handleSubmitOfAddColorButton={handleSubmitOfAddColorButton}
          colorArray={colorArray}
          limit={limit}
          {...props}
        />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <DndContext onDragEnd={handleOnDragEnd}>
          <SortableContext
            items={reArrayToBeSortable}
            strategy={rectSortingStrategy}
          >
            <div className="DraggableBox-container">{addedColorBoxes()}</div>
          </SortableContext>
        </DndContext>
      </Main>
    </Box>
  );
}
