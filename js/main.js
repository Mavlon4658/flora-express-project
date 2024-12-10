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

if (locationBtn) {
    locationBtn.onclick = () => {
        locationEl.classList.toggle('active');
    }
    
    locationClose.onclick = () => {
        locationEl.classList.remove('active');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const datePicker = document.querySelectorAll('.date-picker');

    if ( datePicker.length ) {
        datePicker.forEach(el => {
            const inp = el.querySelector('.date-input');
            const pickerEl = el.querySelector('.flatpickr');
            flatpickr(pickerEl, {
                locale: 'ru',
                dateFormat: '\\Da\\y picke\\d: Y/m/d',
                onChange: function(selectedDates, dateStr, instance) {
                    const selectedDate = selectedDates[0];
                    const day = selectedDate.getDate();
                    const monthName = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(selectedDate);
                    let text = `${cityInp.value != '' ? cityInp.value : 'Москва'} (МКАД), Россия—на ${day} ${monthName}`
                    locationBtn.querySelector('input').value = text;
                    locationEl.classList.remove('active');
                }
            });

        })
    }
});

const modalClasses = ['.login-modal', '.buy-product-modal'];

if (modalClasses.length) {
    modalClasses.forEach(cls => {
        const modal = document.querySelector(cls);
        const modalClose = document.querySelector(`${cls} .modal__close`);
        const modalBg = document.querySelector(`${cls} .modal__bg`);
        const modalOpen = document.querySelectorAll(cls + '__open');

        if (modalOpen.length) {
            modalOpen.forEach(el => {
                el.onclick = e => {
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

let langItem = document.querySelectorAll('.select_lang__list li');
let langBtn = document.querySelector('.select_lang__btn');

langItem.forEach(el => {
    el.onclick = () => {
        langBtn.querySelector('input').value = el.querySelector('p').textContent;
        langBtn.querySelector('img').setAttribute('src', el.querySelector('img').getAttribute('src'));
    }
})

const currencyEl = document.querySelectorAll('.select_currency');

if (currencyEl.length) {
    currencyEl.forEach(el => {
        let currencyItem = el.querySelectorAll('.select_currency__list li');
        let currencyInp = el.querySelector('.select_currency__btn input');
        
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

const filterModal = document.querySelector('section.filter');
const filterModalOpen = document.querySelectorAll('.filter-modal__open');
const filterModalClose = document.querySelector('.filter__close');

if (filterModalOpen.length) {
    filterModalOpen.forEach(el => {
        el.onclick = e => {
            e.preventDefault();
            filterModal.classList.add('active');
            bodyHidden();
        }
    })
    filterModalClose.onclick = () => {
        filterModal.classList.remove('active');
        bodyVisible();
    }
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
const cFilterOpen = document.querySelector('.categories__head .filter_btn');
const cFilterClose = document.querySelector('.categories__filter_close');
const cFilterBg = document.querySelector('.categories__filter__bg');

if (cFilter) {
    cFilterOpen.onclick = () => {
        cFilter.classList.add('active');
        bodyHidden();
    }

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
    navigation: {
        nextEl: '.product .child_swp .swp_btn__next'
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
            mask: '+{7}(000)000-00-00',
        })
    });
}

const calculation = document.querySelectorAll('.calculation');

if (calculation.length) {
    calculation.forEach(el => {
        const minus = el.querySelector('.minus');
        const plus = el.querySelector('.plus');
        const text = el.querySelector('p');

        minus.onclick = () => {
            if (+text.textContent != 1) {
                text.textContent = +text.textContent - 1;
            }
        }

        plus.onclick = () => {
            text.textContent = +text.textContent + 1;
        }
    })
}

document.addEventListener('click', event => {
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

    if (locationEl && !locationEl.contains(event.target)) {
        locationEl.classList.remove('active');
    }

    if (navsContent.length) {
        navsContent.forEach(el => {
            if (!el.contains(event.target)) {
                el.classList.remove('active');
            }
        })
    }
})