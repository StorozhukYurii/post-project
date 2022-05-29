/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    //калькулятор

    let result = document.querySelector('.calculating__result span')
    let sex, height, weight, age, ratio

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    function initLocalSetting(selector, activeClass) {
        let elements = document.querySelectorAll
            (selector)

        elements.forEach(elem => {
            elem.classList.remove(activeClass)
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass)
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
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
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id'))
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

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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
    

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




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
            ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId)

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
            ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal')
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    let modal = document.querySelector(modalSelector)

    modal.classList.add('hide');
    modal.classList.remove('show');
    //    modal.classList.toggle('show')
    document.body.style.overflow = ''
}

function openModal(modalSelector, modalTimerId) {
    let modal = document.querySelector(modalSelector)

    modal.classList.add('show')
    modal.classList.remove('hide')
    // modal.classList.toggle('show')
    document.body.style.overflow = 'hidden';
    console.log(modalTimerId);
    
    if(modalTimerId){
        clearInterval(modalTimerId)
    }
    
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //модальне вікно

    let modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector)

    modalTrigger.forEach(btn => {
        btn.addEventListener('click',() => openModal(modalSelector, modalTimerId))
    })


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector)
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal(modalSelector)
        }
    })


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId)
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)




}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
   

    //слайдер 2

    let slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        tot = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(container)
    let slideIndex = 1;
    let offset = 0

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`
        tot.textContent = `0${slides.length}`
    } else {
        current.textContent = slideIndex
        tot.textContent = slides.length

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


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);
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


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
    // таби
    let tab = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabsContentSelector),
        tabParent = document.querySelector(tabParentSelector);

    function tabHide() {
        tabContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')

        })
        tab.forEach(item => {
            item.classList.remove(activeClass)
        })
    }

    function tabShow(i = 0) {
        tabContent[i].classList.add('show', 'fade')
        tabContent[i].classList.remove('hide')
        tab[i].classList.add(activeClass)
    }

    tabHide()
    tabShow()

    tabParent.addEventListener('click', (e) => {
        let target = e.target
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tab.forEach((item, i) => {
                if (target == item) {
                    tabHide()
                    tabShow(i)
                }
            })
        }
    })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // таймер
   

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

        let timeInterval = setInterval(updateClock, 1000)
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

    setClock(id , deadline)

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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


let getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
// const { json } = require("body-parser");









window.addEventListener("DOMContentLoaded", () => {

        const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 5000)
        ;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item ', '.tabcontent', '.tabheader__items','tabheader__item_active');
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal' , modalTimerId);
        (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-08-01');
        (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
        (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
        (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
        (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
                container:'.offer__slider',
                slide:'.offer__slide',
                nextArrow:'.offer__slider-next',
                prevArrow:'.offer__slider-prev',
                totalCounter:'#total',
                currentCounter:'#current',
                wrapper:'.offer__slider-wrapper',
                field:'.offer__slider-inner'
        });
})



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map