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

export function getVariantName(text) {
  if (text.includes('Small') || text.includes('Medium' || text.includes('Large'))) {
    const toBreak = text.includes('Small') ? 'Small'
      : text.includes('Medium') ? 'Medium'
        : text.includes('Large') ? 'Large'
          : null

    const split = text.split(toBreak + " / ")
    return split[1].toLowerCase()
  }
}