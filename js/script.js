
window.addEventListener('DOMContentLoaded', () =>{
    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabsItems = document.querySelectorAll('.tabheader__item'),
          parent = document.querySelector('.tabheader__items');

    function hideContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show','fade')
        })

        tabsItems.forEach(item => {
            item.classList.remove('tabheader__item_active')            
        })
    }

    function showContent(i = 0){
        tabsContent[i].classList.add('show','fade')
        tabsContent[i].classList.remove('hide')
        tabsItems[i].classList.add('tabheader__item_active')
    }

    parent.addEventListener('click', e => {
        let target = e.target
        if(target && target.classList.contains('tabheader__item')){
            tabsItems.forEach((item,index) => {
                if(target === item){
                    hideContent()
                    showContent(index)
                }
            })
        }
    })

    hideContent()
    showContent()

    

    const dataModals = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modal__close = document.querySelector('.modal__close');
          let timerID;

    function ShowModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(timerID);
    }

    timerID = setTimeout(ShowModal,3000);
    
    dataModals.forEach(item => {
        item.addEventListener('click', () => {            
            ShowModal();
        })
    })

    window.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            funcCloseModal();
        }

    });

    function funcCloseModal(){
        modal.classList.remove('show');        
        modal.classList.add('hide');        
        document.body.style.overflow = ''
    }

    modal__close.addEventListener('click', () => {
        funcCloseModal();
    })

    modal.addEventListener('click', e => {
        if(e.target && e.target.classList.contains('modal')){
            funcCloseModal();        }
    })

    function showByScroll(){
        if((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight){
            ShowModal()
            window.removeEventListener('scroll',showByScroll)
        }
    }

    window.addEventListener('scroll',showByScroll)



    // timer
    const dedLine = '2020-08-16';
    function getObjTime(endTime){
        let t = Date.parse(endTime) - Date.parse(new Date());
        let days = Math.floor(t / (1000 * 60 * 60 * 24))
        let hours = Math.floor(t / (1000 * 60 * 60) % 24)
        let minutes = Math.floor(t / (1000 * 60) % 60)
        let seconds = Math.floor( (t / 1000) % 60 )
        return {
            t, days, hours, minutes, seconds
        }
    }

    console.log(getObjTime(dedLine))

    const strFormatTime = str => (str >= 0 && str < 10) ? '0'+str : str;
    
    function setTime(parentT,endTime){
        const daysId = document.querySelector('#days'),
              hoursId = document.querySelector('#hours'),
              minutesId = document.querySelector('#minutes'),
              secindsId = document.querySelector('#seconds'),
              timerStr = document.querySelector(parentT);
              const idTimer = setInterval(startTimer,1000)
              startTimer();
        
        function startTimer(){
            let countTimer = getObjTime(endTime)
            daysId.innerHTML = strFormatTime(countTimer.days);
            hoursId.innerHTML = strFormatTime(countTimer.hours);
            minutesId.innerHTML = strFormatTime(countTimer.minutes);
            secindsId.innerHTML = strFormatTime(countTimer.seconds);

            if(countTimer.t <= 0){
                clearInterval(idTimer)
            }
        }
    }

    setTime('.timer',dedLine);

    const menu__item = document.querySelectorAll('.menu__item'),
          conteiner_munu_item = document.querySelector('container')

    //      conteiner_munu_item.innerHTML = '';
    menu__item.forEach(item => {
        item.remove()
    })

    class Card{
        constructor(src,alt,title,descr,price,parentSelector, ...classes){
            this.src = src,
            this.alt = alt,
            this.title = title,
            this.descr = descr,
            this.price = price,
            this.classes = classes,
            this.transfer = 27,
            this.parentSelector = document.querySelector(parentSelector),
            this.UA();
        }
        UA(){
            this.price = this.price * this.transfer
        }

        render(){
            const div = document.createElement('div')
            if(this.classes.length === 0){
                div.classList.add("menu__item")
            }else{
                this.classes.forEach(item => {
                    div.classList.add(item)
                })
            }
            
            div.innerHTML = `
            
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            
            `;
            this.parentSelector.append(div);
        }
    }

    new Card(
        "img/tabs/vegy.jpg",
        "vegy",        
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item",
        "big").render();

    new Card(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        10,
        ".menu .container",
        "menu__item"
    ).render();

    new Card(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        5,
        ".menu .container",
        "menu__item"      
    ).render();


 })