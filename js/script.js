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
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        // modal.classList.toggle('show')
        document.body.style.overflow = 'hidden'
        // clearInterval(modalTimerId)
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

    modalCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal()
        }
    })

    // let modalTimerId = setTimeout(openModal, 10000)

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


    let div = new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container')
    div.render()

    let div1 = new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        '.menu .container',
        'menu__item')
    div1.render()

    let div2 = new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        9,
        '.menu .container',
        'menu__item')
    div2.render()


    // форми


    let form = document.querySelectorAll('form')

    let  message ={
        loading: "loading",
        success: "thank!",
        failure: "some th wrong"
    }

    form.forEach(item => {
        postData(item)
    })

    function postData(form){
        form.addEventListener('submit', (event) =>{
            event.preventDefault();

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            statusMessage.textContent = message.loading
            form.append(statusMessage)
            
            let request = new XMLHttpRequest();
            request.open('POST','server.php')

            request.setRequestHeader('Content-type', 'multipart/form-data')
            let formData = new FormData(form)

            request.send(formData)

            request.addEventListener('load', () =>{
                if(request.status === 200){
                    statusMessage.textContent= message.success
                    console.log(request.response);
                    
                }else{
                    statusMessage.textContent = message.failure
                }
            })
        })
    }
})


