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
          save: "Save",
          addNewEvent: "Add New Event",
          applyColor: "Apply color to days?",
          dot: "Dot",
          full: "Full Box"
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
          save: "Speichern",
          addNewEvent: "Neues Ereignis hinzufügen",
          applyColor: "Farbe auf Tage anwenden?",
          dot: "Punkt",
          full: "Voll Box"
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
          save: "Kaydet",
          addNewEvent: "Yeni Etkinlik Ekle",
          applyColor: "Renk günlere uygulansın mı?",
          dot: "Nokta",
          full: "Tam Kutu"
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
              <div id="eventList"></div>
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
                <div class="mb-3">
                  <label for="applyColor" class="form-label">${this.languages[this.currentLanguage].applyColor}</label>
                  <select id="applyColor" class="form-control">
                    <option value="dot">${this.languages[this.currentLanguage].dot}</option>
                    <option value="full">${this.languages[this.currentLanguage].full}</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" id="deleteEventBtn">${this.languages[this.currentLanguage].delete}</button>
              <button type="button" class="btn btn-primary" id="saveEventBtn">${this.languages[this.currentLanguage].save}</button>
              <button type="button" class="btn btn-success" id="addNewEventBtn">${this.languages[this.currentLanguage].addNewEvent}</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(this.calendarModal);
    }
  
    showEventModal(date) {
      const eventList = document.getElementById('eventList');
      const eventForm = document.getElementById('eventForm');
      const eventStartDate = document.getElementById('eventStartDate');
      const addNewEventBtn = document.getElementById('addNewEventBtn');
      const deleteEventBtn = document.getElementById('deleteEventBtn');
      const saveEventBtn = document.getElementById('saveEventBtn');
      const eventColor = document.getElementById('eventColor');
      const applyColor = document.getElementById('applyColor');
      
      eventStartDate.value = date;
      eventList.innerHTML = '';
      const eventsOnDate = this.events[date] || [];
  
      if (eventsOnDate.length > 0) {
        eventsOnDate.forEach((event, index) => {
          const eventItem = document.createElement('div');
          eventItem.classList.add('event-item');
          eventItem.textContent = `${event.title} (${event.startDate} - ${event.endDate})`;
          eventItem.onclick = () => {
            this.populateEventForm(event, date, index);
          };
          eventList.appendChild(eventItem);
        });
      }
  
      addNewEventBtn.onclick = () => {
        eventForm.reset();
        deleteEventBtn.style.display = 'none';
      };
  
      saveEventBtn.onclick = () => {
        const newEvent = this.getFormData();
        if (!this.events[date]) {
          this.events[date] = [];
        }
        const existingIndex = parseInt(eventForm.dataset.index);
        if (!isNaN(existingIndex)) {
          this.events[date][existingIndex] = newEvent;
        } else {
          this.events[date].push(newEvent);
        }
        this.applyColorToDate(newEvent, date);
        this.generateCalendar(this.currentYear, this.currentMonth);
        const modalElement = bootstrap.Modal.getInstance(this.calendarModal);
        modalElement.hide();
      };
  
      deleteEventBtn.onclick = () => {
        const existingIndex = parseInt(eventForm.dataset.index);
        if (!isNaN(existingIndex)) {
          this.events[date].splice(existingIndex, 1);
          if (this.events[date].length === 0) {
            delete this.events[date];
          }
        }
        this.generateCalendar(this.currentYear, this.currentMonth);
        const modalElement = bootstrap.Modal.getInstance(this.calendarModal);
        modalElement.hide();
      };
  
      const modal = new bootstrap.Modal(this.calendarModal);
      modal.show();
    }
  
    getFormData() {
      const eventTitle = document.getElementById('eventTitle').value;
      const eventStartDate = document.getElementById('eventStartDate').value;
      const eventEndDate = document.getElementById('eventEndDate').value;
      const eventTime = document.getElementById('eventTime').value;
      const eventIcon = document.getElementById('eventIcon').value;
      const eventColor = document.getElementById('eventColor').value;
      const applyColor = document.getElementById('applyColor').value;
  
      return {
        title: eventTitle,
        startDate: eventStartDate,
        endDate: eventEndDate,
        time: eventTime,
        icon: eventIcon,
        color: eventColor,
        applyColor: applyColor
      };
    }
  
    populateEventForm(event, date, index) {
      document.getElementById('eventTitle').value = event.title;
      document.getElementById('eventStartDate').value = event.startDate;
      document.getElementById('eventEndDate').value = event.endDate;
      document.getElementById('eventTime').value = event.time;
      document.getElementById('eventIcon').value = event.icon;
      document.getElementById('eventColor').value = event.color;
      document.getElementById('applyColor').value = event.applyColor;
  
      const eventForm = document.getElementById('eventForm');
      eventForm.dataset.index = index;
      document.getElementById('deleteEventBtn').style.display = 'inline-block';
    }
  
    applyColorToDate(event, date) {
      const startDate = new Date(event.startDate);
      const endDate = event.endDate ? new Date(event.endDate) : startDate;
  
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        if (event.applyColor === 'full') {
          if (this.events[dateStr]) {
            this.events[dateStr].push({ ...event });
          } else {
            this.events[dateStr] = [{ ...event }];
          }
        } else {
          this.events[dateStr] = this.events[dateStr] || [];
          this.events[dateStr].push({ ...event });
        }
      }
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
        dayCell.addEventListener('click', () => this.showEventModal(dateStr));
  
        if (this.events[dateStr]) {
          const eventInfo = this.events[dateStr][0];
          const eventIndicator = document.createElement('div');
          eventIndicator.classList.add('event-indicator');
          if (eventInfo.applyColor === 'full') {
            dayCell.style.backgroundColor = eventInfo.color;
          } else if (eventInfo.applyColor === 'dot') {
            eventIndicator.classList.add('dot');
            eventIndicator.style.background = eventInfo.color;
            dayCell.appendChild(eventIndicator);
          }
        }
  
        this.calendarGrid.appendChild(dayCell);
      }
    }
  }
  
  // Takvimi oluşturma
  const calendar = new Calendar('tr', 'calendarContainer');
  