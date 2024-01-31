import React, { useState } from 'react'

const CopyButtonWithText = ({text, ariaLabel, title}) => {
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
        <button type='button' aria-label={ariaLabel} title={title} onClick={()=>copy(text)} className="relative group cursor-pointer flex flex-row justify-center items-center gap-1 bg-brandDashGray24x rounded-fiftyPercent">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M10.5 8.17301V9.97301C10.5 12.373 9.54 13.333 7.14 13.333H4.86C2.46 13.333 1.5 12.373 1.5 9.97301V7.69301C1.5 5.29301 2.46 4.33301 4.86 4.33301H6.66" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.5002 8.17301H8.58016C7.14016 8.17301 6.66016 7.69301 6.66016 6.25301V4.33301L10.5002 8.17301Z" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.4" d="M4.5 3.13301C4.5 2.13701 5.304 1.33301 6.3 1.33301H9.9" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.4" d="M13.5 4.93262V8.64662C13.5 9.57662 12.744 10.3326 11.814 10.3326" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.4999 4.93301H11.6999C10.3499 4.93301 9.8999 4.48301 9.8999 3.13301V1.33301L13.4999 4.93301Z" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='text-brandGreen1x text-xs'>{copied ? 'Copied'  : 'Copy'}</p>
            {/* <div className="absolute -top-0 drop-shadow-md hidden group-hover:block">
                <div className="relative">
                    <div className={`bg-white -mt-8 ${copied ? 'text-brandGreen1x' : 'text-black'} truncate text-xs rounded py-1 px-4`}>{copied ? 'Copied'  : 'Copy'}</div>
                    <svg className="absolute text-white w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                    </svg>
                </div>
            </div> */}
        </button>
    )
}

export default CopyButtonWithText