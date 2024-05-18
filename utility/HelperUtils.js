export function getColorCode (colorName) {
    if (colorName == "ocean") {
        return "#2A5259"
    } else if (colorName == "olive") {
        return "#706947"
    } else if (colorName == "green") {
        return "#2D5C43"
    } else if (colorName == "purple") {
        return "#393158"
    } else if (colorName == "red") {
        return "#6E3E4C"
    }

    return colorName
}