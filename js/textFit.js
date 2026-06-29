function fitDescription(element, minSize = 12, maxSize = 20
) {

    let size = maxSize;

    element.style.fontSize = size + "px";
    
     while (
        element.scrollHeight > element.clientHeight &&
        size > minSize
    ) {
        size -= 0.25;
        element.style.fontSize = size + "px";
    }

}