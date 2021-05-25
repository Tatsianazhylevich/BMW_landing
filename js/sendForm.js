const server = `https://jsonplaceholder.typicode.com/posts`;

const sendData = (data, callBack, falseCallBack) => {
    const request = new XMLHttpRequest();
    request.open('POST', server);
    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4) return;
        if(request.status === 200 || request.status === 201){
            const response = JSON.parse(request.responseText)
            callBack(response.id);
        } else {
            falseCallBack(request.responseText);
            throw new Error(request.status);
        }
    })

    request.send(data)
};

const formHandler = (form) => {
    const smallText = document.createElement('small');
    form.append(smallText);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {};
        let flag = true;
        const buttonSubmit = form.querySelector('.button[type="submit"]');

        for(const elem of form.elements) {
            const {name, value} = elem;
            if (name) {
                if(value.trim()){
                    elem.style.border = '';
                    data[name] = value.trim();
                } else {
                    elem.style.border = '1px solid red'
                    flag = false;
                    elem.value = '';
    
                }   
            }
        }

        if (!flag) {
            return smallText.textContent = `Заполните все поля`;
        }

        sendData(JSON.stringify(data),
        (id) => {
            smallText.textContent = 'Ваша заявка №' + id +
            '! В ближайшее время с вами свяжемся!';
            smallText.style.color = 'green';
            buttonSubmit.disabled = true;

            setTimeout(() => {
                smallText.textContent = '';
                buttonSubmit.disabled = false;
            }, 5000)
        },
        (err) => {
            smallText.textContent ='Упс! Что-то пошло не так! ' + err;
            smallText.style.color = 'red';
        });
        form.reset();
     })
};


export function sendForm() {


    const formElems = document.querySelectorAll('.form');

    formElems.forEach(formHandler);

}