import React, {useState} from 'react'
import { useSpring, animated } from 'react-spring'

interface Props {
    displayString : string;
    validate: () => any;
}

const Submit : React.FC<Props> = ({displayString,validate}) => {

    const [state, toggle] = useState(true);
    const { x } = useSpring({ from: { x: 0 }, x: state ? 1 : 0, config: { duration: 1000 } })
    

    return (
             <div onClick = {() =>{
                    toggle(!state);
                    validate();
                 }
             } className="newDataStore">

                <animated.div
                style={{
                opacity: x.interpolate({ range: [0, 1], output: [0.9, 1] }),
                transform: x
                .interpolate({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                })
                .interpolate(x => `scale(${x})`)
                }}>

                  {
                      (displayString.includes("Google")) ? 
                       <div style = {{backgroundColor: '#4286F5',
                       borderRadius: '20px',color:'white'}} >  {displayString} </div>
                       :
                  <div style = {{backgroundColor: '#c4c4c4',
                    borderRadius: '20px'}}>{displayString}</div>

                  }
                  

                </animated.div>

                </div>

    )
}

export default Submit;