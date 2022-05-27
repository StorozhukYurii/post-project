// const { json } = require("body-parser");

document.addEventListener("DOMContentLoaded", () => {
    // таби
    let tab = document.querySelectorAll('.tabheader__item '),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabParent = document.querySelector('.tabheader__items');

    function tabHide() {
        tabContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')

        })
        tab.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function tabShow(i = 0) {
        tabContent[i].classList.add('show', 'fade')
        tabContent[i].classList.remove('hide')
        tab[i].classList.add('tabheader__item_active')
    }

    tabHide()
    tabShow()

    tabParent.addEventListener('click', (e) => {
        let target = e.target
        if (target && target.classList.contains('tabheader__item')) {
            tab.forEach((item, i) => {
                if (target == item) {
                    tabHide()
                    tabShow(i)
                }
            })
        }
    })


    // таймер
    let deadline = '2022-08-01'

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;

        let t = Date.parse(endtime) - Date.parse(new Date())

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / (1000 * 60)) % 60),
                seconds = Math.floor((t / 1000) % 60)
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(selector, endtime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            studyEnd = document.querySelector('.promotion__timer .title')

        timeInterval = setInterval(updateClock, 1000)
        studyEnd.innerHTML = 'До кінця навчання залишилось:'

        updateClock()
        function updateClock() {
            let t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadline)


    //модальне вікно


    let modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal')


    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        // modal.classList.toggle('show')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
    })


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        //    modal.classList.toggle('show')
        document.body.style.overflow = ''
    }


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal()
        }
    })

    let modalTimerId = setTimeout(openModal, 50000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)


    //класи для карточок



    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.transfer = 32;
            this.parent = document.querySelector(parentSelector)
            this.changeToUAH()
            this.classes = classes
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            let elem = document.createElement('div')
            if (this.classes.length === 0) {
                elem.classList.add('menu__item')
            } else { this.classes.forEach(className => elem.classList.add(className)) }

            elem.innerHTML = `

                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
                `;
            this.parent.append(elem)
        }
    }
    let getResource = async (url) =>{
        let res = await fetch(url)
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getResource('http://localhost:3000/menu')
    .then(data =>{
        data.forEach(({img, altimg, title, descr, price}) =>{
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
        })
    })


    // інший варіант написання функції тої що зверху. але без застосування класів
    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data))
    // function createCard(data){
    //     data.forEach(({img, altimg, title, descr, price}) =>{
    //         let elem = document.createElement('div')
    //         price*=32
    //         elem.classList.add('menu__item')
    //         elem.innerHTML=`
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //     </div>
    //         `
    //         document.querySelector('.menu .container').append(elem)
    //     })
    // }

    // форми


    let form = document.querySelectorAll('form')

    let message = {
        loading: "img/form/spinner.svg",
        success: "thank!",
        failure: "some th wrong"
    }

    form.forEach(item => {
        bindPostData(item)
    })

    let postData = async (url,data) =>{
        let res = await fetch(url,{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:data
        })
        return await res.json()
    }
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
            let json =JSON.stringify(Object.fromEntries(formData.entries()))
            
            //код нижче видаляється через те що є стрічка нижче, оскільки ми вписали все в асінг авайт вище
            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(obj)
            // })
            postData('http://localhost:3000/requests',json)
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
        openModal()

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
            closeModal()
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


    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

})


