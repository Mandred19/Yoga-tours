$(document).ready(function () {
		svg4everybody({});

	/* JQuery plugins */

	const validateFormMain = () => {
		$("#main-form").each(function () {
			$(this).validate({
				rules: {
					phone : {
						required: true,
						minlength: 13,
						maxlength: 13
					}
				},
				messages: {
					phone: {
						required: "Укажите телефон",
						minlength: "Укажите минимально 13 цифр",
						maxlength: "Укажите максимально 13 цифр"
					}
				},
				errorPlacement: function (error, element) {
					element.attr("placeholder", error[0].outerText);
				}
			});
			$(this).on('submit', function() {
				if ($(this).valid()) {
					let wrap = $(this).closest(".hide-on-success");
					if (wrap) {
						$(wrap).siblings(".show-on-success").show();
						$(wrap).hide();
					}
				}
				return false;
			});
		});
	};


	const validateFormCont = () => {
		$("#form").each(function () {
			$(this).validate({
				rules: {
					phone: {
						required: true,
						minlength: 13,
						maxlength: 13
					},
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					phone: {
						required: "Укажите телефон",
						minlength: "Укажите минимально 13 цифр",
						maxlength: "Укажите максимально 13 цифр"
					},
					email: {
						required: "Укажите email",
						email: "Укажите верный формат"
					}
				},
				errorPlacement: function (error, element) {
					element.attr("placeholder", error[0].outerText);
				}
			});
		});
	};


	const showPopup = () => {
		$('.js-popup').magnificPopup({
			showCloseBtn: false,
			focus: 'input',
			fixedContentPos: false,
			callbacks: {
				beforeOpen: function () {
					$('body').addClass('magnific-popup-no-scroll');
				},
				close: function () {
					$('body').removeClass('magnific-popup-no-scroll');
				}
			}
		});
		$(document).on('click', '.popup-close', () => {
			$.magnificPopup.close();
		});
	};


	const setAnchors = () => {
		$(window).on("load",function(){
			$(".js-anchor").mPageScroll2id({
				scrollSpeed: 600,
				offset: 70
			});
		});
	};


	validateFormMain();
	validateFormCont();
	showPopup();
	setAnchors();
});


window.addEventListener('DOMContentLoaded', () => {

	/* Sandwich */
	const SandwichBtn = () => {
		let btn = document.querySelector('.sandwich-btn'),
				nav = document.querySelector('.nav'),
				menu = document.querySelector('.menu'),
				body = document.querySelector('body');
		btn.addEventListener('click', function() {
			this.classList.toggle('open');
			nav.classList.toggle('nav-open');
			body.classList.toggle('magnific-popup-no-scroll');
		});
		menu.addEventListener('click', (e) => {
			if (document.documentElement.clientWidth < 480.02) {
				let item = e.target.closest('menu__item');
				if (!item) {
					btn.classList.toggle('open');
					nav.classList.toggle('nav-open');
					body.classList.toggle('magnific-popup-no-scroll');
				}
			}
		});
	};
	SandwichBtn();


	/* Tabs */
	const ShowTabs = () => {
		let childTab = document.querySelectorAll('.info-header__tab'),
				parentTab = document.querySelector('.info-header'),
				contentTab = document.querySelectorAll('.info-tabcontent');

		const hideTabContent = (a) => {
			for (let i = a; i < contentTab.length; i++) {
				contentTab[i].classList.remove('show');
				contentTab[i].classList.add('hide');
			}
		};
		hideTabContent(1);

		const showTabContent = (b) => {
			if (contentTab[b].classList.contains('hide')) {
					contentTab[b].classList.remove('hide');
					contentTab[b].classList.add('show');
			}
		};

		parentTab.addEventListener('click', (event) => {
			let target = event.target && event.target.closest('.info-header__tab');
			if (target) {
				for (let i = 0; i < childTab.length; i++) {
					if (target == childTab[i]) {
						hideTabContent(0);
						showTabContent(i);
						break;
					}
				}
			}
		});
	};
	ShowTabs();


	/* Timer */
	const setTimer = (day, hour, minute) => {
		let deadline = new Date(Date.parse(new Date()) + day * hour * minute * 60 * 1000);

		const getTimeRemaining = (endtime) => {
			let t = Date.parse(endtime) - Date.parse(new Date()),
					seconds = Math.floor((t / 1000) % 60),
					minutes = Math.floor((t / 1000 / 60) % 60),
					hours = Math.floor((t / 1000 / 60 / 60) % 24),
					days = Math.floor((t / (1000 * 60 * 60 * 24)));
			return {
				"total" : t,
				"days" : days,
				"hours" : hours,
				"minutes" : minutes,
				"seconds" : seconds
			};
		};

		const setClock = (id, endtime) => {
			let timer = document.getElementById(id),
					days = timer.querySelector('.days'),
					hours = timer.querySelector('.hours'),
					minutes = timer.querySelector('.minutes'),
					seconds = timer.querySelector('.seconds');

			const updateClock = () => {
				let t = getTimeRemaining(endtime);
				days.textContent = ('0' + t.days).slice(-2);
				hours.textContent = ('0' + t.hours).slice(-2);
				minutes.textContent = ('0' + t.minutes).slice(-2);
				seconds.textContent = ('0' + t.seconds).slice(-2);
				if (t.total <= 0) {
					clearInterval(timeInterval);
				}
			};

			let timeInterval = setInterval(updateClock, 1000);
		};
		setClock('timer', deadline);
	};
	setTimer(5, 24, 60);


	/* Slider */
	const Slider = () => {
		let sliderIndex = 1,
				slides = document.querySelectorAll('.slider-item'),
				prev = document.querySelector('.prev'),
				next = document.querySelector('.next'),
				dotsWrap = document.querySelector('.slider-dots'),
				dots = document.querySelectorAll('.dot');

		const showSlides = (n) => {
			if (n > slides.length) {
				sliderIndex = 1;
			}
			if (n < 1) {
				sliderIndex = slides.length;
			}

			slides.forEach((item) => item.style.display = 'none');
			dots.forEach((item) => item.classList.remove('dot-active'));
			slides[sliderIndex - 1].style.display = 'block';
			dots[sliderIndex - 1].classList.add('dot-active');
		};
		showSlides(sliderIndex);

		const plusSlides = (n) => {
			showSlides(sliderIndex += n);
		};

		const currentSlide = (n) => {
			showSlides(sliderIndex = n);
		};

		prev.addEventListener('click', () => {
			plusSlides(-1);
		});

		next.addEventListener('click', () => {
			plusSlides(1);
		});

		dotsWrap.addEventListener('click', (event) => {
			for (let i = 0; i < dots.length + 1; i++) {
				if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
					currentSlide(i);
				}
			}
		});
	};
	Slider();


	/* Calculator */
	const Cacl = () => {
		let persons = document.querySelectorAll('.counter-block__input')[0],
				restDays = document.querySelectorAll('.counter-block__input')[1],
				plase = document.getElementById('select'),
				totalValue = document.getElementById('total'),
				personsSum = 0,
				daysSum = 0,
				plaseMod = 1,
				total = 0;

		totalValue.innerHTML = 0;

		const getChar = (event) => {
			if (event.which == null) {
        if (event.keyCode < 32) {
					return null;
				}
        return String.fromCharCode(event.keyCode);
      }
      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) {
					return null;
				}
        return String.fromCharCode(event.which);
      }
      return null;
		};

		persons.onkeypress = (e) => {
			e = e || event;
			if (e.ctrlKey || e.altKey || e.metaKey) { return; }
			let chr = getChar(e);
			if (chr == null) { return; }
			if (chr < '0' || chr > '9') {
				return false;
			}
		};

		restDays.onkeypress = (e) => {
			e = e || event;
			if (e.ctrlKey || e.altKey || e.metaKey) { return; }
			let chr = getChar(e);
			if (chr == null) { return; }
			if (chr < '0' || chr > '9') {
				return false;
			}
		};

		persons.addEventListener('input', function() {
			personsSum = +this.value;
			total = (personsSum * 4000) * daysSum;
			if (restDays.value == '') {
				totalValue.innerHTML = 0;
			}
			else {
				totalValue.innerHTML = total * plaseMod;
			}
		});

		restDays.addEventListener('input', function() {
			daysSum = +this.value;
			total = (personsSum * 4000) * daysSum;
			if (persons.value == '') {
				totalValue.innerHTML = 0;
			}
			else {
				totalValue.innerHTML = total * plaseMod;
			}
		});

		plase.addEventListener('change', function() {
			plaseMod = this.options[this.selectedIndex].value;
			if (restDays.value == '' || persons.value == '') {
				totalValue.innerHTML = 0;
			}
			else {
				let a = total;
				totalValue.innerHTML = a * plaseMod	;
			}
		});
	};
	Cacl();


	/* Send forms */
	const sendForms = (formType) => {
		const message = {
			"loading": "Загрузка...",
			"failure": "Что-то пошло не так..."
		};

		let input = formType.getElementsByTagName('input'),
				statusMessage = document.createElement('div'),
				// winThank = document.querySelector('.js-thank'),
				// winPopup = document.querySelector('.js-popup'),
				request = new XMLHttpRequest();

		statusMessage.classList.add('status');

		const handlerFunc = (event) => {
			event.preventDefault();
			formType.appendChild(statusMessage);

			const formData = new FormData(formType);

			// const obj = {};
			// formData.forEach((value, key) => {
			// 	obj[key] = value;
			// });
			// let json = JSON.stringify(obj);

			const postData = (data) => {
				return new Promise((resolve, reject) => {
					request.open('POST', 'server.php');
					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					// request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

					request.addEventListener('readystatechange', () => {
						if (request.readyState < 4) {
							resolve()
						}
						else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 3) {
								resolve()
							}
						}
						else {
							reject()
						}
					});
					request.send(data);
					// request.send(json);
				})
			}

			const clearInput = () => {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			};
			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => {
					// winThank.style.display = 'block';
					// winPopup.style.display = 'none';
					statusMessage.innerHTML = '';
				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput);
		};
		formType.addEventListener('submit', handlerFunc);
	};
	sendForms(document.querySelector('.main-form'));
	sendForms(document.querySelector('.cont-form'));
});