

export default (timeHistory, scale) => {
    var path = "";

    for (var t = 0; t<timeHistory.length; t++) {
        let pos = timeHistory[t];
        if (t === 0) {
            path += `M ${pos[0]/scale} ${-pos[1]/scale} `;
        } else if (t === timeHistory.length - 1) {
            // path += "Z";
        } else {
            path += `L ${pos[0]/scale} ${-pos[1]/scale} `;
        }
    }

    return path;

}