import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './custom-editor.css';
import '../../../stylesheets/content-styles.scss';

const PostEditor = ({onChange, data}) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            onChange={(event, editor) => {
                onChange(editor.getData());
            }}
        />
    );
};

export default PostEditor;
