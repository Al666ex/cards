
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
        modal = document.querySelector('.modal'),
        modalBtnClose = document.querySelector('[data-close]');

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

  modalBtnClose.addEventListener('click',modalHide);

  function modalHidePodlojka(e){
    const target = e.target;    
    if(target === modal){  
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

  const forms = document.querySelectorAll('form');
  forms.forEach(item => sendForm(item));

  const messages = {
    load : 'loading waiting...',
    success : 'success!!!',
    error : 'somthing wrong'
  };

  function sendForm(form){

    
    form.addEventListener('submit',function(e){
      e.preventDefault();

      const div = document.createElement('div');
      div.classList.add('status');
      div.innerHTML = messages.load;
      form.append(div);

      const xml = new XMLHttpRequest();
      xml.open('POST','server.php');

      const obj = {};
      const formData = new FormData(form);
      formData.forEach(function(value,key){
        obj[key] = value;
      });

      const json = JSON.stringify(obj);
  
      xml.send(json);      
  
      xml.addEventListener('load',function(e){
        if(xml.status === 200){
          console.log(xml.response);
          div.innerHTML = messages.success;
          setTimeout(function(){
            div.remove();
          },3000);
          form.reset();
        }else{
          div.innerHTML = messages.error;
        }
  
      });


  
    });


  }



  
});//end window.addEventListener('DOMContentLoaded', () => {

