class Calendar {
    constructor(language = 'en', containerId = 'calendarContainer') {
      this.languages = {
        en: {
          months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          addEventPrompt: "Enter event:",
          birthdayMessage: "Birthday celebration message",
          viewDetail: "Detail",
          eventDetails: "Event Details",
          close: "Close",
          eventTitle: "Event Title",
          date: "Date",
          startDate: "Start Date",
          endDate: "End Date",
          time: "Time",
          icon: "Icon",
          iconPlaceholder: "Enter emoji or symbol (e.g., 🎉)",
          color: "Color",
          delete: "Delete",
          save: "Save"
        },
        de: {
          months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
          addEventPrompt: "Ereignis eingeben:",
          birthdayMessage: "Geburtstagsfeier Nachricht",
          viewDetail: "Detail",
          eventDetails: "Ereignisdetails",
          close: "Schließen",
          eventTitle: "Ereignistitel",
          date: "Datum",
          startDate: "Anfangsdatum",
          endDate: "Enddatum",
          time: "Uhrzeit",
          icon: "Symbol",
          iconPlaceholder: "Emoji oder Symbol eingeben (z.B., 🎉)",
          color: "Farbe",
          delete: "Löschen",
          save: "Speichern"
        },
        tr: {
          months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
          addEventPrompt: "Event girin:",
          birthdayMessage: "Doğum günü kutlama mesajı",
          viewDetail: "Detay",
          eventDetails: "Etkinlik Detayları",
          close: "Kapat",
          eventTitle: "Etkinlik Başlığı",
          date: "Tarih",
          startDate: "Başlangıç Tarihi",
          endDate: "Bitiş Tarihi",
          time: "Saat",
          icon: "İkon",
          iconPlaceholder: "Emoji veya simge girin (örn: 🎉)",
          color: "Renk",
          delete: "Sil",
          save: "Kaydet"
        }
      };
      this.currentLanguage = language;
      this.container = document.getElementById(containerId);
      this.events = {};
      this.currentYear = new Date().getFullYear();
      this.currentMonth = new Date().getMonth();
      this.init();
    }
  
    init() {
      this.renderCalendar();
      this.initModal();
      this.generateCalendar(this.currentYear, this.currentMonth);
    }
  
    renderCalendar() {
      this.container.innerHTML = `
        <div class="calendar-header">
          <div id="calendarTitle"></div>
          <div class="calendar-controls">
            <button id="prevBtn">«</button>
            <button id="nextBtn">»</button>
          </div>
        </div>
        <div id="calendarGrid" class="calendar-grid"></div>
      `;
      this.calendarTitle = this.container.querySelector('#calendarTitle');
      this.calendarGrid = this.container.querySelector('#calendarGrid');
      this.prevBtn = this.container.querySelector('#prevBtn');
      this.nextBtn = this.container.querySelector('#nextBtn');
  
      this.prevBtn.addEventListener('click', () => {
        this.currentMonth--;
        if (this.currentMonth < 0) {
          this.currentMonth = 11;
          this.currentYear--;
        }
        this.generateCalendar(this.currentYear, this.currentMonth);
      });
  
      this.nextBtn.addEventListener('click', () => {
        this.currentMonth++;
        if (this.currentMonth > 11) {
          this.currentMonth = 0;
          this.currentYear++;
        }
        this.generateCalendar(this.currentYear, this.currentMonth);
      });
    }
  
    initModal() {
      this.calendarModal = document.createElement('div');
      this.calendarModal.classList.add('modal', 'fade');
      this.calendarModal.id = 'calendarModal';
      this.calendarModal.tabIndex = -1;
      this.calendarModal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">${this.languages[this.currentLanguage].eventDetails}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${this.languages[this.currentLanguage].close}"></button>
            </div>
            <div class="modal-body">
              <form id="eventForm">
                <div class="mb-3">
                  <label for="eventTitle" class="form-label">${this.languages[this.currentLanguage].eventTitle}</label>
                  <input type="text" class="form-control" id="eventTitle" required>
                </div>
                <div class="mb-3">
                  <label for="eventStartDate" class="form-label">${this.languages[this.currentLanguage].startDate}</label>
                  <input type="date" class="form-control" id="eventStartDate" required>
                </div>
                <div class="mb-3">
                  <label for="eventEndDate" class="form-label">${this.languages[this.currentLanguage].endDate}</label>
                  <input type="date" class="form-control" id="eventEndDate">
                </div>
                <div class="mb-3">
                  <label for="eventTime" class="form-label">${this.languages[this.currentLanguage].time}</label>
                  <input type="time" class="form-control" id="eventTime">
                </div>
                <div class="mb-3">
                  <label for="eventIcon" class="form-label">${this.languages[this.currentLanguage].icon}</label>
                  <input type="text" class="form-control" id="eventIcon" placeholder="${this.languages[this.currentLanguage].iconPlaceholder}">
                </div>
                <div class="mb-3">
                  <label for="eventColor" class="form-label">${this.languages[this.currentLanguage].color}</label>
                  <input type="color" class="form-control" id="eventColor">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" id="deleteEventBtn">${this.languages[this.currentLanguage].delete}</button>
              <button type="button" class="btn btn-primary" id="saveEventBtn">${this.languages[this.currentLanguage].save}</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(this.calendarModal);
    }
  
    showEventModal(date, existingEvent = null) {
      const eventTitle = document.getElementById('eventTitle');
      const eventStartDate = document.getElementById('eventStartDate');
      const eventEndDate = document.getElementById('eventEndDate');
      const eventTime = document.getElementById('eventTime');
      const eventIcon = document.getElementById('eventIcon');
      const eventColor = document.getElementById('eventColor');
      const deleteEventBtn = document.getElementById('deleteEventBtn');
      const saveEventBtn = document.getElementById('saveEventBtn');
  
      eventStartDate.value = date;
      eventEndDate.value = existingEvent ? existingEvent.endDate : '';
      eventTitle.value = existingEvent ? existingEvent.title : '';
      eventTime.value = existingEvent ? existingEvent.time : '';
      eventIcon.value = existingEvent ? existingEvent.icon : '';
      eventColor.value = existingEvent ? existingEvent.color : '#ff0000';
  
      deleteEventBtn.style.display = existingEvent ? 'inline-block' : 'none';
  
      deleteEventBtn.onclick = () => {
        delete this.events[date];
        this.generateCalendar(this.currentYear, this.currentMonth);
        const modalElement = bootstrap.Modal.getInstance(this.calendarModal);
        modalElement.hide();
      };
  
      saveEventBtn.onclick = () => {
        this.events[date] = {
          title: eventTitle.value,
          startDate: eventStartDate.value,
          endDate: eventEndDate.value,
          time: eventTime.value,
          icon: eventIcon.value,
          color: eventColor.value,
          type: eventIcon.value ? 'emoji' : 'dot'
        };
        this.generateCalendar(this.currentYear, this.currentMonth);
        const modalElement = bootstrap.Modal.getInstance(this.calendarModal);
        modalElement.hide();
      };
  
      const modal = new bootstrap.Modal(this.calendarModal);
      modal.show();
    }
  
    addOrEditEvent(date) {
      const existingEvent = this.events[date] || null;
      this.showEventModal(date, existingEvent);
    }
  
    generateCalendar(year, month) {
      this.calendarGrid.innerHTML = '';
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDayOfWeek = firstDay.getDay();
      const monthNames = this.languages[this.currentLanguage].months;
      this.calendarTitle.textContent = `${year} ${monthNames[month]}`;
  
      for (let i = 0; i < startDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day');
        this.calendarGrid.appendChild(emptyCell);
      }
  
      for (let d = 1; d <= lastDay.getDate(); d++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = d;
        dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  
        const dateStr = dayCell.dataset.date;
        dayCell.addEventListener('click', () => this.addOrEditEvent(dateStr));
  
        if (this.events[dateStr]) {
          const eventInfo = this.events[dateStr];
          const eventIndicator = document.createElement('div');
          eventIndicator.classList.add('event-indicator');
          if (eventInfo.type === 'emoji') {
            eventIndicator.textContent = eventInfo.icon;
          } else if (eventInfo.type === 'dot') {
            eventIndicator.classList.add('dot');
            eventIndicator.style.background = eventInfo.color;
          }
          dayCell.appendChild(eventIndicator);
        }
  
        this.calendarGrid.appendChild(dayCell);
      }
    }
  }
  
  // Takvimi oluşturma
  const calendar = new Calendar('tr', 'calendarContainer');
  