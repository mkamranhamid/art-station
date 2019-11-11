import React from 'react';
import { observer } from 'mobx-react-lite';

import { Thumbnail } from '../components/Thumbnail';

const HomePage = observer(() => {
    return (
        <div>
            <h1>HOME COMPONENT</h1>
            <Thumbnail />
        </div>
    )
})

export { HomePage }