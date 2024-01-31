import { useEffect, useState } from 'react';
import $ from 'jquery'

export default function useComponentVisible( dropBtn, dropContent, callback) {
    // const [fn] = useState(callback)

    const handleClickOutside = (e) => {
        if(!(($(e.target).closest(dropContent).length > 0 ) || ($(e.target).closest(dropBtn).length > 0))){
            callback()
        }
        // alert('hi')
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);;
}