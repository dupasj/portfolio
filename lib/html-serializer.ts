import {useI18n} from "vue-i18n";


const htmlSerializer = (type: string, element: string, content: string, children: string) => {
  if (type === 'paragraph') {
    return `<p class='scroll-animation'>${children}</p>`
  }
  if (type === 'list-item' || type === 'o-list-item') {
    return `<li class='scroll-animation'>${children}</li>`
  }

  if (type === 'heading1') {
    return `<h1 class='scroll-animation'>${children}</h1>`
  }
  if (type === 'heading2') {
    return `<h2 class='scroll-animation'>${children}</h2>`
  }
  if (type === 'heading3') {
    return `<h3 class='scroll-animation'>${children}</h3>`
  }
  if (type === 'heading4') {
    return `<h4 class='scroll-animation'>${children}</h4>`
  }
  if (type === 'heading5') {
    return `<h5 class='scroll-animation'>${children}</h5>`
  }
  if (type === 'heading6') {
    return `<h6 class='scroll-animation'>${children}</h6>`
  }

  if (type === "hyperlink"){
    if (typeof element.data === "object" && typeof element.data.uid === "string" && typeof element.data.type === "string"){
      const router = useRouter()
      const { locale } = useI18n();

      const url = router.resolve({ name: `${element.data.type}-uid___${locale.value}` , params: {uid: element.data.uid}}).href;
      return `<a href="${url}">${children}</a>`
    }
    if (typeof element.data === "object" && typeof element.data.url === "string"){
      return `<a href="${element.data.url}" target="_blank">${children}</a>`
    }

    return children;
  }



  return null
}

export default htmlSerializer;
