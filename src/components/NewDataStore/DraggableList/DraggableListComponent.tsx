import React, {useState } from 'react';
import TextField from "@material-ui/core/TextField";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import Button from '@material-ui/core/Button';


interface Props{
    displayDataFields : Array<string>;
    reorder: (list : Array<string>, startIndex : number, endIndex : number) => any;
    removeDataField : (index : number) => any;
    writeValue : (value : string, index : number) => any;
    displayOrder : Array<string>;
    hash : Array<number>;
}

const DraggableListComponent : React.FC<Props> = ({displayDataFields,reorder,removeDataField,writeValue,displayOrder,hash}) =>  {
  
   
  const onDragEnd = (result : any) =>  {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

     reorder(
      displayDataFields,
      result.source.index,
      result.destination.index
    );

    
  }

  
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              
              {...provided.droppableProps}
            >
              {  hash.map((i : number, index: number) => (
                <div className = "dataFieldDiv" key = {index} >
                <Draggable key={displayDataFields[i]} draggableId={displayDataFields[i]} index={index}   >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      
                    >
                        
                        <Button variant="contained"  className = "dataFieldButton"  >
                        { (displayDataFields[i] === 'Price(/item)') ? 
       
                            <>

                                <TextField disabled id={`standard-basic ${index}`} size = "small"  value = {displayDataFields[i]} className = "dataField" key = {index}  />

                            </>
                            
                            : <>
                            <TextField id={`standard-basic ${index}`} size = "small"  value = {displayDataFields[i]} onChange = {(e)=>writeValue(e.target.value,index)} className = "dataField" key = {index}  />
                                <span onClick = {
                                    () => removeDataField(index)
                                } ><RemoveCircleTwoToneIcon/></span>
                                </> 
                                
                        }
                      </Button>
                      
                    </div>
                  )}
                </Draggable></div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
 
}


export default DraggableListComponent;