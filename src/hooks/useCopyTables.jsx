import React, { useState } from 'react'

const useCopyTables = (copy_text) => {
    const [copied, setCopied] = useState(false)

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copy_text)
        .then(() => {
            setCopied(true);
            setTimeout(() => {
            setCopied(false);
            }, 1000);
        })
        .catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = copy_text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => {
        setCopied(false);
        }, 1000);
    }

    return {copied}
}

export default useCopyTables