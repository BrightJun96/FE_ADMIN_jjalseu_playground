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
    const [htmlContent, setHtmlContent] = React.useState<string>(initValue || "");


    function handleHtml() {
        if (editorRef.current) {
            const newHtml = editorRef.current.getInstance().getHTML();

            // 변경된 경우에만 상태 업데이트
            if (newHtml !== htmlContent) {
                setHtmlContent(newHtml);
                if(onHTMLChange) {
                    onHTMLChange(newHtml);
                }
            }
        }
    }

    useEffect(() => {
        if (initValue && initValue !== htmlContent) {
            editorRef.current?.getInstance().setHTML(initValue);
            setHtmlContent(initValue);
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
