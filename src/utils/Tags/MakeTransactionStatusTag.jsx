import React from 'react'

const MakeTransactionStatusTag = (status) => {
    
    let tagColor = 'bg-brandLightGreen4x text-brandGreen4x'

    if(status){
        if (status == 2 || status == 3 || status == 4){
            tagColor = 'bg-brandLightGreen4x text-brandGreen4x'
        }else if(status == 1){
            tagColor = 'bg-brandLightYellow3x text-brandYellow2x'
        }else if(status == 5){
            tagColor = 'bg-brandLightRed3x text-brandRed5x'
        }
    }

    return tagColor
}

export default MakeTransactionStatusTag