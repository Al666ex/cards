window.addEventListener('DOMContentLoaded', () => {
  //////////////////////////tabs
  const tabContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabItems = document.querySelector('.tabheader__items');

  const hideContent = (item) => {
    item.classList.add('hide');
    item.classList.remove('show','fade');
  };

  const hideTabActive = (item) => {
    if(item && item.classList.contains('tabheader__item_active')){
      item.classList.remove('tabheader__item_active');
    }
  };

  function hide(){
    tabContent.forEach(hideContent);
    tabs.forEach(hideTabActive);  
  }

  function show(tabIndex = 0){
    tabContent[tabIndex].classList.add('show','fade');
    tabContent[tabIndex].classList.remove('hide');

    tabs[tabIndex].classList.add('tabheader__item_active');
  }

  tabItems.addEventListener('click', (e) => {
    const target = e.target;
    if(target && target.classList.contains('tabheader__item')){
      tabs.forEach((item,index) => {
        if(target == item){
          hide();
          show(index);        
        }
      });
    }
  });

  hide();
  show();
 ///////////////////////////////////////Timer
  const lenthTwo = (str) => (str < 10) ? ('0'+str) : str ;
  const dedLine = Date.parse('2020-09-29');

  function getChangeTime(){
    let now = new Date();
    const t = dedLine - now;  
    
    const days = lenthTwo(Math.floor(t / (1000 * 60 * 60 * 24)));
    const hours = lenthTwo(Math.floor(t / (1000 * 60 * 60 ) % 24));
    const minutes = lenthTwo(Math.floor(t / (1000 * 60) % 60));
    const seconds = lenthTwo(Math.floor(t / (1000) % 60));

    return{
      t,
      days,
      hours,
      minutes,
      seconds
    };  
  }

  function change(){
    const days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds');

    let interval = setInterval(setTimer,1000);
    setTimer();
          
    function setTimer(){
      const result = getChangeTime();
      if(result.t > 0){     
        days.innerHTML = result.days;
        hours.innerHTML = result.hours;
        minutes.innerHTML = result.minutes;
        seconds.innerHTML = result.seconds;
    
      }else {
        clearInterval(interval);
      }

    }

  }

  change();

  /////////////////////////////////modal

  const modelBtns = document.querySelectorAll('[data-model]'),
        modal = document.querySelector('.modal');

  const modalShow = (item) => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    window.removeEventListener('scroll', modalShowScroll);    
    //clearTimeout(timer);
  };

  modelBtns.forEach(item => {
    item.addEventListener('click', modalShow);  
  });

  const modalHide = () => {
    modal.classList.remove('show'); 
    modal.classList.add('hide'); 
    document.body.style.overflow = '' ;
    
  };

  

  function modalHidePodlojka(e){
    const target = e.target;    
    if(target === modal || target.getAttribute('data-close') == ''){  
      modalHide();
    }
  }

  modal.addEventListener('click',modalHidePodlojka);
  
  document.addEventListener('keydown', e => {
    if(e.code === 'Escape'){
      modalHide();
    }
  });

  const modalShowScroll = () => {    
      if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        modalShow();
        window.removeEventListener('scroll', modalShowScroll);
      }    
  };

  window.addEventListener('scroll', modalShowScroll);

  //const timer = setTimeout(modalShow, 5000);

///////////////////cards

  class newCard {
    constructor(src,alt,subtitle,descr,price,parent){
      this.src = src,
      this.alt = alt,
      this.subtitle = subtitle,
      this.descr = descr,
      this.price = price,
      this.parent = document.querySelector(parent),
      this.tarif = 27,
      this.converter();            
    }

    converter(){
      this.price = this.price * this.tarif;
    }

    render(){
      const div = document.createElement('div');
      div.innerHTML = 
      `
      <div class="menu__item">
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.subtitle}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
      </div>      
      `;

    this.parent.append(div);
    }
  }


    //

  new newCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    19,
    '.menu .container'
  ).render();

  new newCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    '.menu .container'
  ).render();  

  new newCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    '.menu .container'
  ).render();  

  ///////////////////send form

  const postToServer = async (url,data) => {
    const post = await fetch(url,{
      method : "POST",
      headers : {
        'Content-type' : 'application/json'
      },
      body : data
    });

    return await post.json();

  };

  const forms = document.querySelectorAll('form');
  forms.forEach(item => sendForm(item));

  const messages = {
    load : 'img/form/spinner.svg',
    success : 'success!!!',
    error : 'somthing wrong'
  };

  function sendForm(form){
    
    form.addEventListener('submit',function(e){
      e.preventDefault();

      const div = document.createElement('img');
      div.src = messages.load;
      div.style.cssText = `
         display : block;
         margin : 0 auto;
      `;

      form.insertAdjacentElement('afterend',div);
      const formData = new FormData(form);
      const obj = {};   

      formData.forEach(function(value,key){
        obj[key] = value;
      });

      postToServer('http://localhost:3000/requests',JSON.stringify(obj))      
      .then((data) => {
        console.log(data);
        ShowThanksModal(messages.success);          
        div.remove(); 
      })
      .catch(() => {
        ShowThanksModal(messages.error);        
      })
      .finally(() => {
        form.reset();
      });

    });

  }//function sendForm(form){
      
    function ShowThanksModal(message){
        const modalDialog = document.querySelector('.modal__dialog');

        modalDialog.classList.add('hide');

        modalShow();

        const thanksModalodal = document.createElement('div');
        thanksModalodal.classList.add('modal__dialog');

        thanksModalodal.innerHTML = `
        <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
        </div>          
        `;

        document.querySelector('.modal').append(thanksModalodal);

        setTimeout(function(){
            thanksModalodal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            modalHide();
        }, 4000);
    }
    
    const slides = document.querySelectorAll('.offer__slide'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          sliderPrev = document.querySelector('.offer__slider-prev'),
          sliderNext = document.querySelector('.offer__slider-next'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          sliderInner = document.querySelector('.offer_slider-inner'),
          width = window.getComputedStyle(sliderWrapper).width;

    let sliderIndex = 1,
        offset = 0;

    total.textContent = lenthTwo(slides.length);
    current.textContent = lenthTwo(sliderIndex);

        
    console.log(width);
    sliderWrapper.style.overflow = 'hidden';
    slides.forEach(slide => slide.style.width = width);
    sliderInner.style.width = 100 * slides.length +'%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    sliderNext.addEventListener('click', () => {
      let step = +width.slice(0, width.length - 2)
      if(offset ==  step * (slides.length - 1)){
        offset = 0;
      }else{
        offset += step;
      }
      current.textContent = lenthTwo((offset+step) / step);
      sliderInner.style.transform = `translateX(-${offset}px)`;

    });

    sliderPrev.addEventListener('click', () => {
      let step = +width.slice(0, width.length - 2)
      if(offset == 0){        
        offset = step * (slides.length - 1)
      }else{
        offset -=step;
      }
      current.textContent = lenthTwo((offset+step) / step);
      sliderInner.style.transform = `translateX(-${offset}px)`;

    });





        





        
  

    //sliderInner.style.width = (100 * slides.length) +'%';

    // function moveToIndex(n){
    //   if(n > slides.length){
    //     sliderIndex = 1;
    //   }

    //   if(n < 1){
    //     sliderIndex = slides.length;
    //   }

    //   slides.forEach(slide => slide.style.display = 'none');
    //   slides[sliderIndex - 1].style.display = '';

    //   total.textContent = slides.length;
    //   current.textContent = sliderIndex;
    // }

    // moveToIndex(sliderIndex);

    // function moveToSlide(n){
    //   moveToIndex(sliderIndex += n);
    // }

    // sliderNext.addEventListener('click', () => {
    //   moveToSlide(+1);
    // });

    // sliderPrev.addEventListener('click', () => {
    //   moveToSlide(-1);
    // });










});//end window.addEventListener('DOMContentLoaded', () => {