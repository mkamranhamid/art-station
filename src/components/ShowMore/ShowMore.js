import React, { useState } from "react";

function ShowMore({ children }) {
    const [overflow, setOverflow] = useState('overflow-hidden')

    const handleShowTextBtn = () => {
        setOverflow('overflow-auto-height')
    }

    const isOverflowHidden = () => {
        return overflow == 'overflow-hidden';
    }

    return (
        <div>
            <p className={`show-more ${overflow}`} >{children}</p>
            {isOverflowHidden() && <div className="separator" onClick={handleShowTextBtn}>Show more</div>}
        </div>
    )
}

export { ShowMore }