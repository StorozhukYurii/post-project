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
    let getResource = async (url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
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

    let postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
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



    //слайдер1

    // let slides = document.querySelectorAll('.offer__slide'),
    //     prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     tot = document.querySelector('#total'),
    //     current = document.querySelector('#current')
    // let slideIndex = 1;

    // showSlides(slideIndex)

    // if(slides.length < 10){
    //     tot.textContent = `0${slides.length}`
    // }else{
    //     tot.textContent = slides.length
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none')

    //     slides[slideIndex - 1].style.display = 'block'

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`
    //     }else{
    //         current.textContent = slideIndex

    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n)
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1)
    // })

    // next.addEventListener('click', () => {
    //     plusSlides(1)
    // })


    //слайдер 2

    let slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        tot = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector('.offer__slider')
    let slideIndex = 1;
    let offset = 0

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`
        total.textContent = `0${slides.length}`
    } else {
        current.textContent = slideIndex
        total.textContent = slides.length

    }

    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'
    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    let indicators = document.createElement('ol'),
        dots = []
    indicators.classList.add('carousel-indicators')
    indicators.style.cssText = `
        position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
        `
    slider.append(indicators)

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
        
        box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `
        if (i == 0) {
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot)
    }

    function deleteNoDigits(item) {
        return +item.replace(/\D/g, '')
    }

    next.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += deleteNoDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    })
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDigits(width) * (slides.length - 1)

        } else {
            offset -= deleteNoDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`
        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }



        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    })


    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            let slideTo = e.target.getAttribute('data-slide-to')

            slideIndex = slideTo
            offset = deleteNoDigits(width) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px)`

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`
            } else {
                current.textContent = slideIndex
            }

            dots.forEach(dot => dot.style.opacity = '.5')
            dots[slideIndex - 1].style.opacity = 1
        })
    })



    //калькулятор

    let result = document.querySelector('.calculating__result span')
    let sex, height, weight, age, ratio
    
    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex')
    }else{
        sex ='female'
        localStorage.setItem('sex', 'female')
    }
    
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio')
    }else{
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }
    
    function initLocalSetting(selector, activeClass){
        let elements = document.querySelectorAll
        (selector)

        elements.forEach(elem =>{
            elem.classList.remove(activeClass)
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass)
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass)
            }
        })
    }
    initLocalSetting('#gender div', 'calculating__choose-item_active')
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active')
    result.classList.add('hide')


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            return 
            
        }

        if (sex === 'famale') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
            result.classList.remove('hide')
            result.classList.add('show')

        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
            result.classList.remove('hide')
            result.classList.add('show')

        }
    }

    function getStaticInformation(selector, activeClass) {
        let elements = document.querySelectorAll(selector)

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio') )
                } else {
                    sex =e.target.getAttribute('id')
                    localStorage.setItem('sex',e.target.getAttribute('id'))
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass)
                })

                e.target.classList.add(activeClass)

                calcTotal()
            })

        })

    }
    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector)
        
        

        input.addEventListener('input', () => {
            
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else{
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal()
        })


    }
    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')
})


