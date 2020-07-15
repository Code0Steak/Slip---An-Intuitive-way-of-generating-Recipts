import React from 'react'

interface Props {
    shopName : string;
}

const DbSubmissionDialogueContent : React.FC<Props> = ({shopName}) => {
    return (
        <div>
            <div>Create the new Data Store <b>'{`${shopName}`}'</b>, by typing in <b>Create {`${shopName}`} Data Store</b> and the clicking on the 'Confirm Submission' button</div>
            <div>Or you can go back and edit your Data Table or other fields if your aren't sure. And ofcourse, you can create the Data Store and Update it later 😄</div>
        </div>
    )
}

export default DbSubmissionDialogueContent;