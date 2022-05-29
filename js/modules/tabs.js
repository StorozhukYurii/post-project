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

export default tabs;