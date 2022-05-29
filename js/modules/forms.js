import{closeModal, openModal} from './modal';
import{postData} from '../services/services'


function forms(formSelector, modalTimerId) {
    // форми


    let form = document.querySelectorAll(formSelector)

    let message = {
        loading: "img/form/spinner.svg",
        success: "thank!",
        failure: "some th wrong"
    }

    form.forEach(item => {
        bindPostData(item)
    })

  
    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
         display:block;
         margin:0 auto;
         `
            form.insertAdjacentElement('afterend', statusMessage)

            let formData = new FormData(form)


            //старий варіант задання по XMLHttpRequest()
            // let request = new XMLHttpRequest();
            // request.open('POST','server.php')
            // let formData = new FormData(form)
            // request.send(formData)

            //стрий варіант задання по JSON
            // request.setRequestHeader('Content-type', 'application/json')
            // let obj ={}
            // formData.forEach(function(value, key){
            //     obj[key] = value
            // })
            // let json =JSON.stringify(obj)
            // request.send(json)

            //!!!!!зараз використовується фетч з форм дата
            // fetch('server.php', {
            //     method: 'POST',
            //     body: formData
            // }).then(data => data.text())
            // .then(data => {
            //     console.log(data)
            //     showThanksModal(message.success); 
            //     statusMessage.remove()
            // }).catch(() => {
            //     showThanksModal(message.failure)
            // }).finally(() => {
            //     form.reset()
            // })


            //!!!!!зараз використовується фетч з джсон формат

            //один з способів перетворити нашу формдату в джейсон
            // let obj ={}
            // formData.forEach(function(value, key){
            //     obj[key] = value
            // })

            //інший спосіб перетворити нашу формдату в джейсон
            let json = JSON.stringify(Object.fromEntries(formData.entries()))

            //код нижче видаляється через те що є стрічка нижче, оскільки ми вписали все в асінг авайт вище
            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(obj)
            // })
            postData('http://localhost:3000/requests', json)
                // .then(data => data.text()) ця трансформація не потрібна оскільки вона є вже в постдата і схована там всередині
                .then(data => {
                    console.log(data)
                    showThanksModal(message.success);
                    statusMessage.remove()
                }).catch(() => {
                    showThanksModal(message.failure)
                }).finally(() => {
                    form.reset()
                })

            // request.addEventListener('load', () =>{
            //     if(request.status === 200){
            //         showThanksModal(message.success) 
            //         console.log(request.response);
            //         form.reset()
            //         statusMessage.remove()
            //     }else{
            //        showThanksModal(message.failure)
            //     }
            // })
        })
    }


    // вікно з подякою, стилізація

    function showThanksModal(message) {
        let prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide')
        openModal('.modal', modalTimerId)

        let thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
     <div class="modal__content">
         <div data-close class="modal__close">×</div>
         <div class="modal__title">${message}</div>
         </div>
     `
        document.querySelector('.modal').append(thanksModal)

        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            closeModal('.modal')
        }, 4000)

    }
    //приклад  як працює фетч
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method:"POST",
    //     body: JSON.stringify({name:'Alex'}),
    //     headers:{
    //         'Content-type':'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json))


    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));



}

export default forms;