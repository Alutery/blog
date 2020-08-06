import React, {useEffect, useState} from 'react';

const UploadedImage = ({file}) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!file) {
            return;
        }

        setLoading(true);

        let reader = new FileReader();
        reader.onloadend = () => {
            setLoading(false);
            setImage(reader.result);
        };

        reader.readAsDataURL(file);

    }, [file]);

    return (
        <div className="upload-empty" onClick={(event) => {
            const btn = document.querySelector('.upload-empty__btn');
            const image = document.querySelector('.upload-image');
            if ((btn && !btn.contains(event.target)) || (image && !image.contains(event.target))) {
                event.preventDefault();
            }
        }}>
            <span className="upload-empty__message">Загрузить изображение</span>
            {
                (file && !loading) ?
                    <img src={image}
                         alt={file.name}
                         className="upload-image"
                         height={260}
                         width={286}
                    />
                    : <span className="upload-empty__btn">Файл</span>
            }
        </div>
    );
};

export default UploadedImage;