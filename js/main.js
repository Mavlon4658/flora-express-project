const bodyHidden = () => {
  document.querySelector('body').style.overflow = 'hidden';
}

const bodyVisible = () => {
  document.querySelector('body').style.overflow = 'visible';
}

let locationEl = document.querySelector('.header__location');
let locationClose = document.querySelector('.header__location .close_btn');
let locationBtn = document.querySelector('.header__location_inp');
let locationContent = document.querySelector('.header__location_content');
let cityInp = document.querySelector('.header__location_content .form_inp input');
let locationSearch = document.querySelector('.header__location .location_search');
let locationSearchList = document.querySelector('.header__location .location_search__list');

let navs = document.querySelector('nav.navs');

if (locationBtn) {
  locationBtn.onclick = () => {
    locationEl.classList.toggle('active');
    navs.classList.add('disabled');
  }

  locationClose.onclick = () => {
    locationEl.classList.remove('active');
    setTimeout(() => {
      navs.classList.remove('disabled');
    }, 1000);
  }

  cityInp.oninput = () => {
    if (cityInp.value) {
      locationSearch.classList.add('active');
    } else {
      locationSearch.classList.remove('active');
    }
  }

  locationSearchList.querySelectorAll('li').forEach(el => {
    el.onclick = () => {
      cityInp.value = el.textContent;
      locationSearch.classList.remove('active');
    }
  })
}
const inputs = document.querySelectorAll('.confirm-number .inputs input');

if (inputs.length) {
  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }

      if (input.value) {
        input.classList.add('valid');
      } else {
        input.classList.remove('valid');
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value === '') {
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
    });
  });
}

const emailInputs = document.querySelectorAll('input[type="email"]');
if (emailInputs.length) {
  emailInputs.forEach(inp => {
    inp.oninput = () => {
      const re = /\S+@\S+\.\S+/;
      if (inp.value && re.test(inp.value)) {
        inp.classList.remove('error');
      } else {
        inp.classList.add('error');
      }
    }
  })
}
const selectDateContainer = document.querySelector("#selec-date");
const selectDate = document.querySelector("#selec-date .order-form__title");
const tooltip = document.querySelector("#selec-date .tooltip");
if (selectDate && tooltip) {
  selectDate.addEventListener("click", () => {
    tooltip.classList.toggle("show");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const datePicker = document.querySelectorAll('.date-picker');

  if (datePicker.length) {
    datePicker.forEach((el, elId) => {
      const inp = el.querySelector('.date-input');
      const pickerEl = el.querySelector('.flatpickr');
      flatpickr(pickerEl, {
        locale: 'ru',
        dateFormat: '\\Da\\y picke\\d: Y/m/d',
        onChange: function (selectedDates, dateStr, instance) {

          if (elId === 0) {

            const selectedDate = selectedDates[0];
            const day = selectedDate.getDate();

            const monthName = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(selectedDate);
            let text = `${cityInp.value != '' ? cityInp.value : 'Москва'} (МКАД), Россия—на ${day} ${monthName}`
            locationBtn.querySelector('input').value = text;
            locationEl.classList.remove('active');
            setTimeout(() => {
              navs.classList.remove('disabled');
            }, 1000);
          }
          if (el.classList.contains("select-date__picker")) {
            tooltip.classList.remove("show");
          }
        }
      });

    })
  }
});

const modalClasses = ['.login-modal', '.buy-product-modal', '.confirm-number'];

if (modalClasses.length) {
  modalClasses.forEach(cls => {
    const modal = document.querySelector(cls);
    const modalClose = document.querySelector(`${cls} .modal__close`);
    const modalBg = document.querySelector(`${cls} .modal__bg`);
    const modalOpen = document.querySelectorAll(cls + '__open');

    if (modalOpen.length) {
      modalOpen.forEach(el => {
        el.onclick = e => {
          document.querySelectorAll('.modal').forEach(clos => {
            clos.classList.remove('active');
          })
          e.preventDefault();
          modal.classList.add('active');
          bodyHidden();
        }
      })

      modalClose.onclick = () => {
        modal.classList.remove('active');
        bodyVisible();
      }

      modalBg.onclick = () => {
        modal.classList.remove('active');
        bodyVisible();
      }
    }
  })
}

let lang = document.querySelector('.header .select_lang');
let langItem = document.querySelectorAll('.select_lang__list li');
let langBtn = document.querySelector('.select_lang__btn');

langBtn.onclick = () => {
  lang.classList.toggle('active');
}

langItem.forEach(el => {
  el.onclick = () => {
    lang.classList.remove('active');
    langBtn.querySelector('input').value = el.querySelector('p').textContent;
    langBtn.querySelector('img').setAttribute('src', el.querySelector('img').getAttribute('src'));
  }
})

const currencyEl = document.querySelectorAll('.select_currency');

if (currencyEl.length) {
  currencyEl.forEach(el => {
    let btn = el.querySelector('.select_currency__btn')
    let currencyItem = el.querySelectorAll('.select_currency__list li');
    let currencyInp = el.querySelector('.select_currency__btn input');

    btn.onclick = () => {
      el.classList.toggle('active');
    }

    currencyItem.forEach(item => {
      item.onclick = () => {
        currencyInp.value = item.getAttribute('data-currency');
        const i = document.querySelectorAll(`span[currency-icon="${currencyInp.getAttribute('currency-icon')}"]`);
        i.forEach(iItem => {
          iItem.textContent = item.textContent[0];
        })
        currencyItem.forEach(a => {
          if (a == item) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        })
        el.classList.remove('active');
      }
    })
  })
}


const formSelect = document.querySelectorAll('.form_select');

if (formSelect.length) {
  formSelect.forEach(el => {
    const btn = el.querySelector('.form_select__btn');
    const inp = el.querySelector('.form_select__btn input');
    const list = el.querySelectorAll('.form_select__list li');

    btn.onclick = () => {
      el.classList.toggle('active');
    }

    if (list.length) {
      list.forEach(item => {
        item.onclick = () => {
          inp.value = item.textContent;
          el.classList.remove('active');
          list.forEach(a => {
            if (a == item) {
              a.classList.add('selected');
            } else {
              a.classList.remove('selected');
            }
          })
        }
      })
    }
  })
}

const homeSwp = new Swiper('.home__swp .swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: '.home__swp .swp_btn__next',
    prevEl: '.home__swp .swp_btn__prev',
  },
  pagination: {
    el: '.home__swp .swp_pagination',
    clickable: true,
  }
})

const cards = document.querySelectorAll('.card');

if (cards.length) {
  cards.forEach(el => {
    const swp = new Swiper(el.querySelector('.swiper'), {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      navigation: {
        nextEl: el.querySelector('.swp_btn__next'),
        prevEl: el.querySelector('.swp_btn__prev'),
      },
      pagination: {
        el: el.querySelector('.swp_pagination'),
        clickable: true,
      }
    })
  })
}

const likeBtn = document.querySelectorAll('.like-btn');
if (likeBtn.length) {
  likeBtn.forEach(el => {
    el.onclick = () => {
      el.classList.toggle('active');
    }
  })
}


var init = false;
var swiper;
function swiperCard() {
  if (window.innerWidth > 992) {
    if (!init) {
      init = true;
      swiper = new Swiper('.reviews .swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
          nextEl: '.reviews .swp_btn__next',
          prevEl: '.reviews .swp_btn__prev',
        },
        pagination: {
          el: '.reviews .swp_pagination',
          clickable: true
        }
      })
    }
  } else if (init) {
    swiper.destroy();
    init = false;
  }
}
swiperCard();
window.addEventListener("resize", swiperCard);

const rangesEl = document.querySelectorAll(".form_range");

if (rangesEl.length) {
  rangesEl.forEach(range => {
    let rangeS = range.querySelectorAll("input[type=range]"),
      numberS = range.querySelectorAll("input.val"),
      line = range.querySelector('.line'),
      min = parseFloat(rangeS[0].min),
      max = parseFloat(rangeS[0].max);

    const handleRange = () => {
      let slide1 = parseFloat(rangeS[0].value),
        slide2 = parseFloat(rangeS[1].value);

      if (slide1 > slide2) [slide1, slide2] = [slide2, slide1];

      numberS[0].value = slide1;
      numberS[1].value = slide2;

      line.style.left = 100 * slide1 / max + '%';
      line.style.width = 100 * (slide2 - slide1) / max + '%';
    };

    const handleNumber = () => {
      let num1 = parseFloat(numberS[0].value),
        num2 = parseFloat(numberS[1].value);

      if (num1 > num2) [num1, num2] = [num2, num1];

      rangeS[0].value = num1;
      rangeS[1].value = num2;

      handleRange();
    };

    handleRange();

    rangeS.forEach(el => {
      el.oninput = handleRange;
    });

    numberS.forEach(el => {
      el.oninput = handleNumber;
    });
  });
}


const navsContent = document.querySelectorAll('.navs-mb__content_item');

if (navsContent.length) {
  navsContent.forEach(el => {
    let btn = el.querySelector('.navs-mb__content_btn'),
      content = el.querySelector('.navs-mb__list');

    if (content) {
      btn.onclick = () => {
        navsContent.forEach(a => {
          if (a === el) {
            a.classList.toggle('active');
          } else {
            a.classList.remove('active');
          }
        })
      }
    }
  })
}

const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOpen = document.querySelector('.mobile-menu__open');
const mobileMenuClose = document.querySelector('.mobile-menu__close');
const mobileMenuBg = document.querySelector('.mobile-menu__bg');

mobileMenuOpen.onclick = e => {
  e.preventDefault();
  mobileMenu.classList.add('active');
  bodyHidden();
}

mobileMenuClose.onclick = () => {
  mobileMenu.classList.remove('active');
  bodyVisible();
}

mobileMenuBg.onclick = () => {
  mobileMenu.classList.remove('active');
  bodyVisible();
}

const menuNavsBtn = document.querySelectorAll('.moible-menu__navs_btn');
const menuNavsContent = document.querySelectorAll('.mobile-menu__navs_content');

if (menuNavsBtn.length) {
  menuNavsBtn.forEach(el => {
    const dataNavsItem = el.getAttribute('data-navs');
    el.onclick = () => {
      menuNavsContent.forEach(content => {
        if (dataNavsItem == content.getAttribute('data-navs-item')) {
          content.classList.add('active');
        }
      })
    }
  })

  menuNavsContent.forEach(el => {
    const btn = el.querySelector('.back-btn');
    if (btn) {
      btn.onclick = () => {
        el.classList.remove('active');
      }
    }
  })
}

const accordions = document.querySelectorAll('.accordion');

if (accordions.length) {
  accordions.forEach((item) => {
    const header = item.querySelector('.accordion__btn');
    const content = item.querySelector('.accordion__body');

    if (item.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    header.addEventListener('click', () => {
      item.classList.toggle('active')
      content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    });
  });
}

const cFilter = document.querySelector('.categories__filter');
const cFilterOpen = document.querySelectorAll('.cfilter__open');
const cFilterClose = document.querySelector('.categories__filter_close');
const cFilterBg = document.querySelector('.categories__filter__bg');

if (cFilter) {
  cFilterOpen.forEach(el => {
    el.onclick = e => {
      e.preventDefault();
      cFilter.classList.add('active');
      bodyHidden();
    }
  })

  cFilterClose.onclick = () => {
    cFilter.classList.remove('active');
    cFilter.classList.add('end-active');
    bodyVisible();
    setTimeout(() => {
      cFilter.classList.remove('end-active');
    }, 400);
  }

  cFilterBg.onclick = () => {
    cFilter.classList.remove('active');
    cFilter.classList.add('end-active');
    bodyVisible();
    setTimeout(() => {
      cFilter.classList.remove('end-active');
    }, 400);
  }
}

const pChildSwp = new Swiper('.product .child_swp .swiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true,
  centeredSlides: true,
  navigation: {
    nextEl: '.product .child_swp .swp_btn__next',
    prevEl: '.product .child_swp .swp_btn__prev',
  }
})

const pParentSwp = new Swiper('.product .parent_swp .swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: 'fade',
  allowTouchMove: true,
  loop: true,
  breakpoints: {
    992: {
      allowTouchMove: false,
    }
  },
  thumbs: {
    swiper: pChildSwp,
  },
  pagination: {
    el: '.product__left .swp_pagination',
    clickable: true,
  }
})

const filterItems = document.querySelectorAll('.categories__filter .form_checkbox');
const filterResult = document.querySelector('.categories__content_right .content_result');
const sortFilter = () => {
  if (filterResult) {
    filterResult.innerHTML = ''
    filterItems.forEach((el, elID) => {
      const inp = el.querySelector('input');
      if (inp.checked) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = el.querySelector('label').textContent;
        li.appendChild(span);

        const image = document.createElement('img');
        image.setAttribute('src', './images/times-sm.svg');
        li.appendChild(image);

        filterResult.appendChild(li);

        li.onclick = () => {
          inp.click();
        }
      }
    })
  }
}

if (filterItems.length) {
  sortFilter();
  filterItems.forEach(el => {
    el.querySelector('input').oninput = () => {
      setTimeout(sortFilter(), 100);
    }
  })
}

const sortBtn = document.querySelector('.categories .sort_btn');
const sortContent = document.querySelector('.categories__content_right .content_head');

if (sortBtn) {
  sortBtn.onclick = () => {
    sortContent.classList.toggle('active');
  }
}

const phoneInp = document.querySelectorAll('.form_inp input[type="tel"]');

if (phoneInp.length) {
  phoneInp.forEach(el => {
    IMask(el, {
      mask: '+{7}(000) 000-00-00',
    })
  });
}

const calculation = document.querySelectorAll('.calculation');

if (calculation.length) {
  calculation.forEach(el => {
    const minus = el.querySelector('.minus');
    const plus = el.querySelector('.plus');
    const text = el.querySelector('p');
    const inp = el.querySelector('input');

    minus.onclick = () => {
      if (inp) {
        if (+inp.value > 1) {
          inp.value = +inp.value - 1;
        }
        if (+inp.value < 2) {
          minus.classList.add('disabled');
        }
      } else {
        if (+text.textContent != 1) {
          text.textContent = +text.textContent - 1;
        }
      }
    }

    plus.onclick = () => {
      if (inp) {
        inp.value = +inp.value + 1
        minus.classList.remove('disabled');
      } else {
        text.textContent = +text.textContent + 1;
      }
    }

    if (inp) {
      inp.oninput = () => {
        if (+inp.value < 2) {
          minus.classList.add('disabled');
        } else {
          minus.classList.remove('disabled')
        }
      }
    }
  })
}

let headerPhone = document.querySelector('.header__phone');
let headerPhoneBtn = document.querySelector('.header__phone_btn');

headerPhoneBtn.onclick = () => {
  headerPhone.classList.toggle('active');
}

let headerUserNameBtn = document.querySelector('.header .user-name');
let headerUserNameContent = document.querySelector('.header .user-name__wrap');
let headerUserNameClose = document.querySelector('.header .user-name__close');

if (headerUserNameBtn) {
  headerUserNameBtn.onclick = e => {
    e.preventDefault();
    headerUserNameContent.classList.toggle('active');
  }

  headerUserNameClose.onclick = () => {
    headerUserNameContent.classList.remove('active');
  }
}

let cityModalOpen = document.querySelector('.city-modal__open');

if (cityModalOpen) {
  cityModalOpen.onclick = e => {
    e.preventDefault();
    locationBtn.click();
    window.scrollTo(0, 0);
  }
}

let headerInformation = document.querySelector('.information');
let headerInformationBtn = document.querySelector('.information__btn');

headerInformationBtn.onclick = () => {
  headerInformation.classList.toggle('active');
}
const paymentSelect = document.querySelector(".payment-select");
const selectedBox = document.querySelector(".payment-select .selected-box");
const optionsContainer = document.querySelector(".payment-select .payment-select__options");
const options = document.querySelectorAll(".payment-select .payment-select__option");
const arrow = document.querySelector(".selected-box .arrow");

selectedBox.addEventListener("click", () => {
  optionsContainer.classList.toggle("show");
  arrow.classList.toggle("active");
});

options.forEach(option => {
  option.addEventListener("click", () => {
    const selectedImage = option.querySelector("img").src;
    const selectedText = option.querySelector("span").textContent;

    const leftBox = selectedBox.querySelector(".left-box");
    leftBox.querySelector("img").src = selectedImage;
    leftBox.querySelector("span").textContent = selectedText;

    optionsContainer.classList.remove("show");
    arrow.classList.remove("active");
  });
});

document.addEventListener('click', event => {

  if (!headerInformation.contains(event.target)) {
    headerInformation.classList.remove('active');
  }

  if (headerUserNameContent && !headerUserNameContent.contains(event.target)) {
    headerUserNameContent.classList.remove('active');
  }

  if (!locationSearch.contains(event.target)) {
    locationSearch.classList.remove('active');
  }

  if (!headerPhone.contains(event.target)) {
    headerPhone.classList.remove('active');
  }

  if (currencyEl.length) {
    currencyEl.forEach(el => {
      if (!el.contains(event.target)) {
        el.classList.remove('active');
      }
    })
  }

  if (!lang.contains(event.target)) {
    lang.classList.remove('active')
  }

  if (sortBtn) {
    if (!sortBtn.contains(event.target) && !sortContent.contains(event.target)) {
      sortContent.classList.remove('active');
    }
  }

  if (formSelect.length) {
    formSelect.forEach(el => {
      if (!el.contains(event.target)) {
        el.classList.remove('active');
      }
    })
  }
  if (cityModalOpen) {
    if (locationEl && !locationEl.contains(event.target) && !cityModalOpen.contains(event.target)) {
      locationEl.classList.remove('active');
      setTimeout(() => {
        navs.classList.remove('disabled');
      }, 1000);
    }
  } else {
    if (locationEl && !locationEl.contains(event.target)) {
      locationEl.classList.remove('active');
      setTimeout(() => {
        navs.classList.remove('disabled');
      }, 1000);
    }
  }

  if (navsContent.length) {
    navsContent.forEach(el => {
      if (!el.contains(event.target)) {
        el.classList.remove('active');
      }
    })
  }
  if (!selectDateContainer.contains(event.target)) {
    tooltip.classList.remove("show");
  }
})


const paymentCard = document.querySelector("#select-cart-1");

if (paymentCard) {
  const selectPayment = document.querySelector(".payment-select");
  paymentCard.addEventListener("change", () => {
    if (paymentCard.checked) {
      selectPayment.classList.add('show');
    } else {
      selectPayment.classList.remove('show');
    }
  })
}

const tabItems = document.querySelectorAll(".tab-item");
const tabContents = document.querySelectorAll(".tab-content");

tabItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    tabItems.forEach(item => item.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("show"));

    item.classList.add("active");
    tabContents[idx].classList.add("show");
  });
});

const addPromoCode = document.querySelector(".add-promocode");
const promocodeInput = document.querySelector("#promocode-input");


addPromoCode.addEventListener("click", (e) => {
  promocodeInput.classList.toggle("show");
  if (e.target.textContent === "+ Добавить") {
    e.target.textContent = "Применить"
  } else {
    e.target.textContent = "+ Добавить"
  }
});


const selecDateSwiper = new Swiper('.selec-date__swiper', {
  slidesPerView: 5,
  spaceBetween: 7,
  navigation: {
    nextEl: '.next-btn',
    prevEl: '.prev-btn',
  },
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    500: {
      slidesPerView: 5,
    }
  }
})

const selecDateSlider = document.querySelector(".selec-date__swiper");
if (selecDateSlider) {
  const slide = selecDateSlider.querySelectorAll(".swiper-slide .date");
  slide.forEach(item => {
    item.addEventListener("click", () => {
      slide.forEach(el => {
        el.classList.remove("active");
      })
      item.classList.add("active");
      tooltip.classList.remove("show");
    })
  })

}

const selectDelivery = document.querySelector(".select-delivery");
if (selectDelivery) {
  const deliveryBox = selectDelivery.querySelectorAll(".delivery-box");
  deliveryBox.forEach(item => {
    item.addEventListener("click", () => {
      deliveryBox.forEach(el => {
        el.classList.remove("active");
      })
      item.classList.add("active");
    })
  })
}



const fotoInput = document.querySelector("#foto");

if (fotoInput) {
  const buketRadios = document.querySelectorAll("#buket");
  const recipientBouquetRadios = document.querySelectorAll("#recipient-bouquet");

  fotoInput.addEventListener("change", () => {
    if (!fotoInput.checked) {
      buketRadios.forEach(radio => (radio.checked = false));
      recipientBouquetRadios.forEach(radio => (radio.checked = false));
    }
  });
}


const sliderEl = document.querySelector("#range");
if (sliderEl) {
  const timeEl = document.querySelector(".time");

  const times = [
    "07:00 - 10:00",
    "10:00 - 13:00",
    "13:00 - 16:00",
    "16:00 - 19:00",
    "19:00 - 22:00",
    "22:00 - 01:00"
  ];

  sliderEl.addEventListener("input", (event) => {
    const sliderValue = parseInt(event.target.value, 10);

    const timeIndex = Math.floor((sliderValue / sliderEl.max) * times.length);
    const selectedTime = times[Math.min(timeIndex, times.length - 1)];

    timeEl.textContent = selectedTime;

    const progress = (sliderValue / sliderEl.max) * 100;
    sliderEl.style.background = `linear-gradient(to right, #8abf6d ${progress}%, #ccc ${progress}%)`;
  });
}
