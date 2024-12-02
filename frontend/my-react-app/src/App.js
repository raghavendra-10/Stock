import React, { useState } from 'react';
import LockScreen from './LockScreen';
import StockData from './Stock';


const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div>
      {/* {isUnlocked ? ( */}
        <StockData/>
      {/* // ) : ( */}
      {/* //   <LockScreen onUnlock={() => setIsUnlocked(true)} /> */}
      {/* // )} */}
    </div>
  );
};

export default App;
