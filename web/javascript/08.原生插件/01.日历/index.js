var calendar = {
  el: document.getElementsByClassName('calendar')[0],
  weeks: ['日', '一', '二', '三', '四', '五', '六'],
  date: null,
  getDate: null,
  showDate: null,
  showDays: null,
  selectedDate: '',
  init(cb) {
    this.initData(cb);
    this.render();
    this.handle();
  },
  initData(cb = function () {}) {
    this.date = new Date(2020, 6, 31);
    this.showDate = this.getYearMonthDay(this.date);
    this.showDays = this.getShowDays();
    this.selectedDate = this.getSelectedDay(this.showDate);

    this.getDate = cb;
  },
  getSelectedDay(date) {
    if (date instanceof Date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    return date.year + '-' + (date.month + 1) + '-' + date.day;
  },
  getYearMonthDay(date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  },
  getShowDays() {
    var arr = [];
    var oneDay = 24 * 60 * 60 * 1000;
    var firstDay = new Date(this.showDate.year, this.showDate.month, 1);
    var fisrtDayWeek = firstDay.getDay();
    var startDay = +firstDay - fisrtDayWeek * oneDay;

    for (var i = 0; i < 42; i++) {
      arr[i] = new Date(+startDay + i * oneDay);
    }

    return arr;
  },
  render() {
    this.el.innerHTML = this.renderHeader() + this.renderContent();
  },
  renderHeader() {
    return `
    <div class="header">
      <span class="picker-btn picker-prev-year"></span>
      <span class="picker-btn picker-prev-month"></span>
      <span class="picker-date">${this.showDate.year}年${this.showDate.month + 1}月</span>
      <span class="picker-btn picker-next-month"></span>
      <span class="picker-btn picker-next-year"></span>
    </div>`;
  },
  renderContent() {
    return `
    <div class="content">
      <div class="picker-weeks">${this.renderWeeks()}</div>
      <div class="picker-days">${this.renderDays()}</div>
    </div>`;
  },
  renderWeeks() {
    var template = '';
    for (var i = 0; i < this.weeks.length; i++) {
      template += `<div class="picker-week">${this.weeks[i]}</div>`;
    }
    return template;
  },
  renderDays() {
    var template = '';
    for (var i = 0; i < this.showDays.length; i++) {
      var date = this.showDays[i];
      var isCur = this.isCur(date);
      var className = (
        'picker-day ' +
        (isCur.month ? '' : 'other-month ') +
        (isCur.day ? 'is-today ' : '') +
        (isCur.select ? 'is-select ' : '')
      ).trim();
      template += `<div data-index="${i}" class="${className}">${date.getDate()}</div>`;
    }
    return template;
  },
  isCur(date) {
    var { year, month, day } = this.getYearMonthDay(date);
    var { year: curYear, month: curMonth, day: curDay } = this.getYearMonthDay(this.date);
    var { year: showYear, month: showMonth, day: showDay } = this.showDate;
    var { year: selectedYear, month: selectedMonth, day: selectedDay } = this.getYearMonthDay(
      new Date(this.selectedDate)
    );

    var isCurMonth = year === showYear && month === showMonth;
    var isCurDay = year === curYear && month === curMonth && day === curDay;
    var isSelect = isCurMonth && year === selectedYear && month === selectedMonth && day === selectedDay;
    return {
      month: isCurMonth,
      day: isCurDay,
      select: isSelect,
    };
  },
  handle() {
    var self = this;
    self.el.onclick = function (e) {
      var dom = e.target;
      var isBtn = dom.classList.contains('picker-btn');
      var isYearBtn = isBtn && dom.className.includes('year');
      var isMonthBtn = isBtn && dom.className.includes('month');
      var isDay = dom.parentNode.classList.contains('picker-days') && !dom.classList.contains('other-month');
      var isDayOtherMonth = dom.parentNode.classList.contains('picker-days') && dom.classList.contains('other-month');

      if (isYearBtn) {
        self.handleYear(dom);
      } else if (isMonthBtn) {
        self.handleMonth(dom);
      } else if (isDay) {
        self.handleDay(dom);
      } else if (isDayOtherMonth) {
        self.handleDayOtherMonth(dom);
      }
    };
  },
  handleYear(dom) {
    var isPrev = dom.className.includes('prev');
    var moveYear = isPrev ? -1 : 1;
    this.showDate.year += moveYear;
    this.showDate.day = 1;
    this.showDays = this.getShowDays();

    this.render();
  },
  handleMonth(dom) {
    var isPrev = dom.className.includes('prev');
    this.changeMonth(isPrev);
  },
  handleDay(dom) {
    var index = dom.dataset.index;
    var date = this.showDays[index];

    this.selectedDate = this.getSelectedDay(date);
    this.render();
    this.getDate(this.selectedDate);
  },
  handleDayOtherMonth(dom) {
    var index = dom.dataset.index;
    var date = this.showDays[index];

    if (index < 6) {
      this.selectedDate = this.getSelectedDay(date);
      this.changeMonth(true, new Date(date).getDate());
      this.getDate(this.selectedDate);
    } else if (index > 27) {
      this.selectedDate = this.getSelectedDay(date);
      this.changeMonth(false, new Date(date).getDate());
      this.getDate(this.selectedDate);
    }
  },
  changeMonth(isPrev, day = 1) {
    var moveMonth = isPrev ? -1 : 1;
    var newMonth = this.showDate.month + moveMonth;
    this.showDate.year =
      newMonth < 0 ? this.showDate.year - 1 : newMonth > 11 ? this.showDate.year + 1 : this.showDate.year;
    this.showDate.month = newMonth < 0 ? 11 : newMonth > 11 ? 0 : newMonth;
    this.showDate.day = day;
    this.showDays = this.getShowDays();

    this.render();
  },
};
