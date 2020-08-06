import React, {useState} from 'react';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';

import PostEditor from './post-editor';
import UploadedImage from './uploaded-image';
import {Formik} from 'formik';

const AddForm = () => {
    const [text, setText] = useState('');
    const history = useHistory();

    const getCookie = (name) => {
        let cookieValue = null;

        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    return (
        <div className="add-form">
            <div className="container">
                <h1 className="add-form__title">Добавить статью</h1>
                <Formik
                    initialValues={{file: null}}
                    onSubmit={(values) => {
                        const formData = new FormData();
                        formData.append('image', values.file);
                        formData.append('title', values.title);
                        formData.append('text', text);
                        formData.append('announce_text', text.substring(0, 180) + (text.length > 180 ? '...' : ''));

                        const csrftoken = getCookie('csrftoken');

                        const request = new Request(
                            'api/posts',
                            {headers: {'X-CSRFToken': csrftoken}}
                        );

                        fetch(request, {
                            method: 'POST',
                            body: formData,
                            mode: 'same-origin',
                        }).catch(error => {
                            console.error('Error:', error)
                        }).then(response => {
                            console.log('Success:', JSON.stringify(response));
                            history.push('/');
                        });
                    }}
                    validationSchema={yup.object().shape({
                        title: yup.string().required(),
                        file: yup.mixed().required(),
                    })}
                    render={({
                                 isSubmitting,
                                 values,
                                 handleSubmit,
                                 setFieldValue,
                                 handleChange
                             }) => {
                        return (
                            <form className="add-form__form" onSubmit={handleSubmit} autoComplete="off">
                                <input name="title" className="add-form__input" placeholder="Введите название статьи"
                                       onChange={handleChange} required/>
                                <button type="submit" className="add-form__submit" disabled={isSubmitting}>Опубликовать</button>
                                <PostEditor onChange={(text) => setText(text)} data={text}/>
                                <div className="add-form__image-wrapper">
                                    <label htmlFor="image-upload">
                                        <UploadedImage file={values.file}/>
                                    </label>
                                    <input type="file" id="image-upload" name="image" accept="image/*"
                                           className="add-form__upload"
                                           onChange={(event) => {
                                               setFieldValue("file", event.currentTarget.files[0]);
                                           }}/>
                                </div>
                            </form>
                        )
                    }}/>
            </div>
        </div>
    );
};

export default AddForm;