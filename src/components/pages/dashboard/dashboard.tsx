import React from 'react';
import Shirt from '../../3dComponents/shirt';
import ImageUpload from '../canvas/imageUpload';

const dashBoard: React.FC = () => {

  return (
    <div className='w-100 flex-column'>
      <Shirt>
      </Shirt>
      <ImageUpload></ImageUpload>

    </div>
  );
};

export default dashBoard;
