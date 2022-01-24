import { refs } from '.';

export function good(){
    refs.badRequest.style.display="none";
    refs.goodRequest.style.display="block";
}
export function bad(){
    refs.badRequest.style.display="block";
    refs.goodRequest.style.display="none";
}


