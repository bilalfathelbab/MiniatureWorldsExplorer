function fitDescription(element, minSize = 16, maxSize = 28
) {

    let size = maxSize;

    element.style.fontSize = size + "px";

    while (
        element.scrollHeight > element.clientHeight &&
        size > minSize
    ) {
        size--;
        element.style.fontSize = size + "px";
    }

}