"use client"

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';

// code-syntax-highlight
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs'
import React, {useEffect} from 'react';

export interface TextEditorProps {
    label:string
    onHTMLChange?:(value:string)=>void,
    initValue?:string
}

const TextEditor = ({label,onHTMLChange,initValue}:TextEditorProps) => {

const editorRef = React.useRef<Editor|null>(null);


function handleHtml(){
    const   html:string =editorRef.current?.getInstance().getHTML()

    if(editorRef.current&&onHTMLChange) {
        onHTMLChange(html)

    }
}

    useEffect(() => {

        if(initValue) {

            editorRef.current?.getInstance().setHTML(initValue)
        }

    }, [initValue]);

    return (
        <div className={"text-left"}>
            <span className={"text-title3Normal"}>{label}</span>
            <Editor
                height={"1000px"}
                initialValue={" "}
                onChange={handleHtml}
                ref={editorRef}
                useCommandShortcut={true}
                plugins={[[codeSyntaxHighlight,{ highlighter: Prism }]]}
            />
        </div>
    );
};

export default TextEditor;
