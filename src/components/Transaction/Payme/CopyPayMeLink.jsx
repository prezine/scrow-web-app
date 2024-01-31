import React, {useState} from 'react'

const CopyPayMeLink = ({text, ariaLabel, title, linkName}) => {

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
    <button type='button' aria-label={ariaLabel} title={title} onClick={()=>copy(text)} className={`transition-all w-fit ease-in-out duration-300 hover:drop-shadow-md font-spaceGroteskRegular text-xs text-brandGreen5x py-2 px-2.5 border-2 border-brandGreen5x flex flex-row items-center gap-2.5 rounded-five bg-brandLightGreen5x`} >
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M11.5 9.48V11.58C11.5 14.38 10.38 15.5 7.58 15.5H4.92C2.12 15.5 1 14.38 1 11.58V8.92C1 6.12 2.12 5 4.92 5H7.02" stroke="#1FAD66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.5 9.48H9.26002C7.58002 9.48 7.02002 8.92 7.02002 7.24V5L11.5 9.48Z" stroke="#1FAD66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.4" d="M4.5 3.6C4.5 2.438 5.438 1.5 6.6 1.5H10.8" stroke="#1FAD66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.4" d="M15 5.69995V10.033C15 11.118 14.118 12 13.033 12" stroke="#1FAD66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 5.7H12.9C11.325 5.7 10.8 5.175 10.8 3.6V1.5L15 5.7Z" stroke="#1FAD66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p className='whitespace-nowrap'>{copied ? 'Copied' : `Copy ${linkName ? linkName : 'Payme Link'}`}</p>
    </button>
  )
}

export default CopyPayMeLink