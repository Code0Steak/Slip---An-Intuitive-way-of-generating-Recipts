import React from 'react'

interface Props {
    displayText : string;
}

const Loader : React.FC<Props> = ({displayText}) => {
    return (
        <div>
            {displayText}
        </div>
    )
}

export default Loader;