import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const ImageList = (props) => {
  	const images = props.images && props.images.map((img) => {
        // console.log(img)

        return (
            <img
                style={{
                    cursor: 'pointer'
                }}
                alt={img.id}
                key={uuidv4()}
                src={'data:image/jpeg;base64, ' + img.image.data}
            />
        );
	});

	return (
        <div className="ui tiny images">
            {images}
        </div>
	);
};


export default ImageList;
