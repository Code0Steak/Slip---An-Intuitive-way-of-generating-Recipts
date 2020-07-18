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
}

const DraggableListComponent : React.FC<Props> = ({displayDataFields,reorder,removeDataField,writeValue,displayOrder}) =>  {
  
   
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
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              
              {...provided.droppableProps}
            >
              {  displayDataFields.map((dataField : string, index: number) => (
                <Draggable key={dataField} draggableId={`${index}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      
                    >
                        <div className = "dataFieldDiv" key = {index}>
                        <Button variant="contained"  className = "dataFieldButton" >
                        { (dataField === 'Price(/item)') ? 
       
                            <>

                                <TextField disabled id={`standard-basic ${index}`} size = "small"  value = {dataField} className = "dataField" key = {index}  />

                            </>
                            
                            : <>
                            <TextField id={`standard-basic ${index}`} size = "small"  value = {dataField} onChange = {(e)=>writeValue(e.target.value,index)} className = "dataField" key = {index}  />
                                <span onClick = {
                                    () => removeDataField(index)
                                } ><RemoveCircleTwoToneIcon/></span>
                                </> 
                                
                        }
                      </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
 
}


export default DraggableListComponent;