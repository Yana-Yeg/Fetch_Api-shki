import { refs } from '.';

export default function paginationMarkup (totalPage, nowPage,
    {
        countItemShow = 4,

        showStart = true,
        contentStart = '&lArr;',

        showEnd = true,
        contentEnd = '&rArr;',

        dotTag = 'span',
        baseTag = 'a',
        link = ``,
        baseClass = '',
        classActive = 'active',

        query = ''
    } = {}) {
      //   console.log(totalPage, nowPage, link)

    const genElement = (page = 1, text = page) =>
        (link && baseTag === 'a') ?
            `<${baseTag} class="${(page === nowPage ? (baseClass ? classActive : `${baseClass} ${classActive}`) : baseClass)}" href="${link + page}${query ? '&' + query : ''}">${text}</${baseTag}>` :
            `<${baseTag} class="${(page === nowPage ? (baseClass ? classActive : `${baseClass} ${classActive}`) : baseClass)}">${text}</${baseTag}>`;

    let markup1 = showStart ? genElement(1, contentStart) : '';

    const startShow = nowPage - countItemShow;
    const endShow = nowPage + countItemShow;

    for (let i = 1; i <= totalPage; i++) {
      if (i > endShow) i = totalPage;

      if (startShow === i && i > 1)
          markup1 += `<${dotTag}>...</${dotTag}>`;

      if (i === 1 || i === totalPage || (i >= nowPage - 2 && i <= nowPage + 2))
          markup1 += genElement(i);

      if (endShow === i)
          markup1 += `<${dotTag}>...</${dotTag}>`;

      if (i < startShow) i = startShow - 1;
    }
  
     markup1 += showEnd ? genElement(totalPage, contentEnd) : '';
    refs.pagination.innerHTML = markup1;
    return
    }


    

