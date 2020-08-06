import React, {useEffect, useState} from 'react';

import LastPost from '../base/last-post';
import PostItem from './posts/post-item';

const Main = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch('/api/posts')
            .then(response => {
                if (response.status > 400) {
                    setData([]);
                }
                return response.json();
            })
            .then(data => {
                setData(data.posts);
                setIsLoaded(true);
            });
    }, []);

    return (
        <>
            <LastPost data={data[0]}/>
            <div className="posts">
                <div className="container">
                    <h2 className="posts__title">Другие статьи</h2>
                    {
                        isLoaded ?
                            <div className="posts__grid">
                                {
                                    data.slice(1, 10).map(post => (
                                        <PostItem data={post} key={post.created_at}/>
                                    ))
                                }
                            </div>
                            : null
                    }

                </div>
            </div>
        </>
    );
};

export default Main;
