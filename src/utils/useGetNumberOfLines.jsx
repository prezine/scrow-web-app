import React from 'react'

const useGetNumberOfLines = (id) => {
    // Get the paragraph element
    const paragraph = document.getElementById(id || 'terms');

    if(paragraph){
        // Get the computed style for the paragraph
        const style = window.getComputedStyle(paragraph);

        // Calculate the line height in pixels
        const lineHeight = parseFloat(style.lineHeight);

        // Get the height of the paragraph element in pixels
        const height = paragraph.offsetHeight;

        // Calculate the number of lines
        const numberOfLines = Math.round(height / lineHeight);

        // console.log('Number of lines:', numberOfLines);
        return numberOfLines
    }

}

export default useGetNumberOfLines