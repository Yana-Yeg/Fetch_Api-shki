import { refs } from '.';

export default function paginationMarkup(totalPage, nowPage,
    {
        countItemShow = 4,

        showStart = false,
        contentStart = '',

        showEnd = false,
        contentEnd = '',

        dotTag = 'span',
        baseTag = 'a',
        link = ``,
        baseClass = '',
        classActive = 'activePage',

        query = ''
    } = {}) {
        // console.log(totalPage, nowPage, link)
       
         const genElement = (page = 1, text = page) =>
        (link && baseTag === 'a') ?
            `<${baseTag} class="${(page === nowPage ? (baseClass ? classActive : `${baseClass} ${classActive}`) : baseClass)}" href="${link + (+page-1)}${query ? '&' + query : ''}">${text}</${baseTag}>` :
            `<${baseTag} class="${(page === nowPage ? (baseClass ? classActive : `${baseClass} ${classActive}`) : baseClass)}">${text}</${baseTag}>`;

    let markup = showStart ? genElement(1, contentStart) : '';

    const startShow = nowPage - countItemShow;
    const endShow = nowPage + countItemShow;
    if(totalPage >= 51){
        totalPage = 50;
    }
    for (let i = 1; i <= totalPage; i++) {
       
      if (i > endShow) i = totalPage;

      if (startShow === i && i > 1)
          markup += `<${dotTag}>...</${dotTag}>`;

      if (i === 1 || i === totalPage || (i >= nowPage - 2 && i <= nowPage + 2))
          markup += genElement(i);

      if (endShow === i)
          markup += `<${dotTag}>...</${dotTag}>`;

      if (i < startShow) i = startShow - 1;
    }
//   console.log(markup)
     markup += showEnd ? genElement(totalPage, contentEnd) : '';
    refs.pagination.innerHTML = markup;
    return
        

   
    }


    

