import React, {useEffect, useState} from 'react';

const Post = ({itemId}) => {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`/api/post/${itemId}`)
            .then(response => {
                if (response.status > 400) {
                    setData(null);
                }
                return response.json();
            })
            .then(data => {
                setData(data.post);
                setIsLoaded(true);
            });
    }, []);

    return (
        <div className="post">
            {
                isLoaded ?
                    <div className="post__container">
                        <h1 className="post__title">{data.title}</h1>
                        <img className="post__img" src={data.image} alt="post"/>
                        <div className="post__content ck-content"dangerouslySetInnerHTML={{__html: data.text}}/>
                    </div>
                    : null
            }
        </div>
    );
};

export default Post;