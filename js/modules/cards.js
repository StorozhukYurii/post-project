import {getResource} from '../services/services'

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

}

export default cards;