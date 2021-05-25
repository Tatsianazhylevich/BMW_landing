import {enableScroll, disableScroll} from './blockScrolled.js';



export function modal() {
    const openModal = () => {
        modalElem.classList.remove('hidden');
        disableScroll();
    };
    
    const closeModal = () => {
        modalElem.classList.add('hidden');
        enableScroll();
    };
    const moreElems = document.querySelectorAll('.more');
    const modalElem = document.querySelector('.modal');

    moreElems.forEach(elem => {
        elem.addEventListener('click', openModal);
    })

    modalElem.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('overlay') || 
            target.classList.contains('modal__close')) {
                closeModal();
            }
    })
}