// import {key} from "../config.json"

// export default function paginationMarkup (totalPage, nowPage,
//     {
//         countItemShow = 4,

//         showStart = true,
//         contentStart = '&lArr;',

//         showEnd = true,
//         contentEnd = '&rArr;',

//         dotTag = 'span',
//         baseTag = 'a',
//         link = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=84oDYCywC5wCFv79gMGAXxLVAXljD9uH&page=`,
//         baseClass = '',
//         classActive = 'active',

//         query = ''
//     } = {}) {
//       //   console.log(page)

//     const genElement = (page = 1, text = page) =>
//         (link && baseTag === 'a') ?
//             `<${baseTag} class="${(page === nowPage ? (baseClass ? classActive : `${baseClass} ${classActive}`) : baseClass)}" href="${link + page}${query ? '&' + query : ''}">${text}</${baseTag}>` :
//             `<${baseTag} class="${(page === nowPage ? (baseClass ? classActive : `${baseClass} ${classActive}`) : baseClass)}">${text}</${baseTag}>`;

//     let markup = showStart ? genElement(1, contentStart) : '';

//     const startShow = nowPage - countItemShow;
//     const endShow = nowPage + countItemShow;

//     for (let i = 1; i <= totalPage; i++) {
//       if (i > endShow) i = totalPage;

//       if (startShow === i && i > 1)
//           markup += `<${dotTag}>...</${dotTag}>`;

//       if (i === 1 || i === totalPage || (i >= nowPage - 2 && i <= nowPage + 2))
//           markup += genElement(i);

//       if (endShow === i)
//           markup += `<${dotTag}>...</${dotTag}>`;

//       if (i < startShow) i = startShow - 1;
//     }
//     return markup += showEnd ? genElement(totalPage, contentEnd) : '';
//     }


    

