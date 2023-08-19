const htmlSerializer = (type, element, content, children) => {
  if (type === 'paragraph') {
    return `<p class='scroll-animation'>${children.join('')}</p>`
  }
  if (type === 'list-item') {
    return `<li class='scroll-animation'>${children.join('')}</li>`
  }

  if (type === 'heading1') {
    return `<h1 class='scroll-animation'>${children.join('')}</h1>`
  }
  if (type === 'heading2') {
    return `<h2 class='scroll-animation'>${children.join('')}</h2>`
  }
  if (type === 'heading3') {
    return `<h3 class='scroll-animation'>${children.join('')}</h3>`
  }
  if (type === 'heading4') {
    return `<h4 class='scroll-animation'>${children.join('')}</h4>`
  }
  if (type === 'heading5') {
    return `<h5 class='scroll-animation'>${children.join('')}</h5>`
  }
  if (type === 'heading6') {
    return `<h6 class='scroll-animation'>${children.join('')}</h6>`
  }

  return null
}

module.exports = htmlSerializer;
