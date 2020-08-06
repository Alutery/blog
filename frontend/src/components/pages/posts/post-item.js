import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const PostItem = ({data}) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date);

        return `${day}.${month}.${year}`;
    };

    useEffect(() => console.log(data));

    return (
        <Link to={`/post/${data.id}`}>
            <div className="posts__item">
                <span className="post__date">{formatDate(data.created_at)}</span>
                <img className="post__img" src={data.image} alt="post"/>
                <h3 className="post__title">{data.title}</h3>
            </div>
        </Link>
    );
};

export default PostItem;