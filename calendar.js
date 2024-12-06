// Takvim verileri
let currentYear = 2024;
let currentMonth = 11; // 0: Ocak, 11: Aralık
let currentView = 'month'; // 'year', 'month', 'day' gibi görünümler.

// Örnek event ve tarih aralığı verileri
// key: "YYYY-MM-DD" formatında tarih.
// value: event bilgisi (basitçe bir string veya obje)
const events = {
  "2024-12-05": {type: 'emoji', icon: '🎉'},
  "2024-12-10": {type: 'dot', color: 'red'},
  "2024-12-25": {type: 'emoji', icon: '🎄'}
};

// Tarih aralıklarını belirtmek için dizi (her biri [başlangıç, bitiş, renk] formatında)
const dateRanges = [
  ["2024-12-01", "2024-12-07", "#ffdddd"],
  ["2024-12-15", "2024-12-20", "#ddffdd"]
];

const calendarTitle = document.getElementById('calendarTitle');
const calendarGrid = document.getElementById('calendarGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function generateCalendar(year, month) {
  calendarGrid.innerHTML = '';
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month+1, 0); 
  const startDayOfWeek = firstDay.getDay(); // 0: Pazar, 1: Pazartesi ...
  
  // Başlığa yıl-ay göster
  const monthNames = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  calendarTitle.textContent = `${year} ${monthNames[month]}`;
  
  // İlk haftadaki boş alanları doldur
  for (let i=0; i<startDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('calendar-day');
    calendarGrid.appendChild(emptyCell);
  }
  
  // Günleri oluştur
  for (let d=1; d<=lastDay.getDate(); d++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('calendar-day');
    dayCell.textContent = d;
    
    // Tarih stringi oluştur
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    
    // Eğer event varsa göstermek
    if (events[dateStr]) {
      const eventInfo = events[dateStr];
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
    
    // Tarih aralıklarını renklendirme
    dateRanges.forEach(([start, end, color]) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const currentDate = new Date(dateStr);
      
      if (currentDate >= startDate && currentDate <= endDate) {
        dayCell.style.backgroundColor = color;
      }
    });
    
    // Örnek: Haftasonlarını renklendirme (Cumartesi:6, Pazar:0)
    const dayOfWeek = new Date(year, month, d).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      dayCell.style.color = '#999';
    }
    
    calendarGrid.appendChild(dayCell);
  }
}

// Görünüm değiştirme fonksiyonu (Basit Örnek)
function toggleView() {
  if (currentView === 'month') {
    currentView = 'year';
    document.body.classList.add('view-year');
    calendarTitle.textContent = currentYear.toString();
  } else if (currentView === 'year') {
    currentView = 'day';
    document.body.classList.remove('view-year');
    calendarTitle.textContent = `${currentYear}-12-05 Detay`;
  } else {
    currentView = 'month';
    generateCalendar(currentYear, currentMonth);
    document.body.classList.remove('view-year');
  }
}

calendarTitle.addEventListener('click', toggleView);

// Önceki, sonraki butonlar
prevBtn.addEventListener('click', () => {
  if (currentView === 'month') {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentView === 'month') {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  }
});

// Başlangıçta takvimi yükle
generateCalendar(currentYear, currentMonth);
