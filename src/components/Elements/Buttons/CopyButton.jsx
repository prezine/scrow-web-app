import React, { useState } from 'react'

const CopyButton = ({text, ariaLabel, title}) => {
    const [copied, setCopied] = useState(false)

    const copy = (copy_text) => {
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
            textArea.defaultValue = copy_text;
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
    }
    
    return (
        <button type='button' aria-label={ariaLabel} title={title} onClick={()=>copy(text)} className="relative group cursor-pointer flex flex-row justify-center items-center bg-brandDashGray24x rounded-fiftyPercent">
            <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.9441 21.0328V24.2995C23.9441 27.0217 22.8552 28.1106 20.133 28.1106H16.8663C14.1441 28.1106 13.0552 27.0217 13.0552 24.2995V21.0328C13.0552 18.3106 14.1441 17.2217 16.8663 17.2217H20.133C22.8552 17.2217 23.9441 18.3106 23.9441 21.0328Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.4" d="M28.6106 16.3663V19.633C28.6106 22.3552 27.5217 23.4441 24.7995 23.4441H23.9439V21.033C23.9439 18.3107 22.855 17.2218 20.1328 17.2218H17.7217V16.3663C17.7217 13.6441 18.8106 12.5552 21.5328 12.5552H24.7995C27.5217 12.5552 28.6106 13.6441 28.6106 16.3663Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="absolute -top-0 drop-shadow-md hidden group-hover:block">
                <div className="relative">
                    <div className={`bg-white -mt-8 ${copied ? 'text-brandGreen1x' : 'text-black'} truncate text-xs rounded py-1 px-4`}>{copied ? 'Copied'  : 'Copy'}</div>
                    <svg className="absolute text-white w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                    </svg>
                </div>
            </div>
        </button>
    )
}

export default CopyButton