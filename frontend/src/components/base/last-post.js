import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';


const LastPost = ({data}) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) setLoading(false);
    }, [data]);

    if (loading) {
        return null;
    }

    return (
        <main className="last-post">
            <div className="container last-post__container">
                {
                    !loading ?
                        (<>
                            <div className="last-post__text">
                                <h1 className="last-post__header">{data.title}</h1>
                                <p className="last-post__desc" dangerouslySetInnerHTML={{__html: data.announce_text}}/>
                                <Link to={`post/${data.id}`} className="last-post__link btn">Читать</Link>
                            </div>
                            <img src={data.image} alt="last post" className="last-post__img"/>
                        </>)
                        : null
                }
            </div>
        </main>
    );
};

export default LastPost;