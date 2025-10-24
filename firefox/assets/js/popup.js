/**
 * Persian Date Converter - Chrome Extension
 * Popup functionality
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize date selectors
  initializeDateSelectors();

  // Set up tab switching
  setupTabs();

  // Set up conversion buttons
  document.getElementById('convert-to-gregorian').addEventListener('click', convertToGregorian);
  document.getElementById('convert-to-jalali').addEventListener('click', convertToJalali);

  // Set current date as default
  setCurrentDate();
});

/**
 * Initialize all date selector dropdowns
 */
function initializeDateSelectors() {
  // Jalali year selector (1300-1500)
  const jalaliYearSelect = document.getElementById('jalali-year');
  for (let year = 1300; year <= 1500; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    jalaliYearSelect.appendChild(option);
  }

  // Jalali month selector
  const jalaliMonthSelect = document.getElementById('jalali-month');
  const jalaliMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  jalaliMonths.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = month;
    jalaliMonthSelect.appendChild(option);
  });

  // Jalali day selector (1-31)
  const jalaliDaySelect = document.getElementById('jalali-day');
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    jalaliDaySelect.appendChild(option);
  }

  // Gregorian year selector (1900-2100)
  const gregorianYearSelect = document.getElementById('gregorian-year');
  for (let year = 1900; year <= 2100; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    gregorianYearSelect.appendChild(option);
  }

  // Gregorian month selector
  const gregorianMonthSelect = document.getElementById('gregorian-month');
  const gregorianMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  gregorianMonths.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = month;
    gregorianMonthSelect.appendChild(option);
  });

  // Gregorian day selector (1-31)
  const gregorianDaySelect = document.getElementById('gregorian-day');
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    gregorianDaySelect.appendChild(option);
  }

  // Update days when month changes for Jalali
  jalaliMonthSelect.addEventListener('change', function () {
    updateJalaliDays(
      parseInt(jalaliYearSelect.value),
      parseInt(jalaliMonthSelect.value)
    );
  });

  // Update days when year changes for Jalali
  jalaliYearSelect.addEventListener('change', function () {
    updateJalaliDays(
      parseInt(jalaliYearSelect.value),
      parseInt(jalaliMonthSelect.value)
    );
  });

  // Update days when month changes for Gregorian
  gregorianMonthSelect.addEventListener('change', function () {
    updateGregorianDays(
      parseInt(gregorianYearSelect.value),
      parseInt(gregorianMonthSelect.value)
    );
  });

  // Update days when year changes for Gregorian
  gregorianYearSelect.addEventListener('change', function () {
    updateGregorianDays(
      parseInt(gregorianYearSelect.value),
      parseInt(gregorianMonthSelect.value)
    );
  });
}

/**
 * Check if a given Jalali year is a leap year
 */
function isJalaliLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Update the number of days in Jalali month selector based on month and year
 */
function updateJalaliDays(year, month) {
  const jalaliDaySelect = document.getElementById('jalali-day');
  const currentDay = parseInt(jalaliDaySelect.value);

  // Clear existing options
  jalaliDaySelect.innerHTML = '';

  // Calculate max days for the selected month
  let maxDays = 31;
  if (month > 6 && month < 12) {
    maxDays = 30;
  } else if (month === 12) {
    maxDays = isJalaliLeapYear(year) ? 30 : 29;
  }

  // Add day options
  for (let day = 1; day <= maxDays; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    jalaliDaySelect.appendChild(option);
  }

  // Try to keep the same day selected if possible
  if (currentDay <= maxDays) {
    jalaliDaySelect.value = currentDay;
  }
}

/**
 * Update the number of days in Gregorian month selector based on month and year
 */
function updateGregorianDays(year, month) {
  const gregorianDaySelect = document.getElementById('gregorian-day');
  const currentDay = parseInt(gregorianDaySelect.value);

  // Clear existing options
  gregorianDaySelect.innerHTML = '';

  // Calculate max days for the selected month
  let maxDays = 31;
  if ([4, 6, 9, 11].includes(month)) {
    maxDays = 30;
  } else if (month === 2) {
    // Check for leap year
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    maxDays = isLeapYear ? 29 : 28;
  }

  // Add day options
  for (let day = 1; day <= maxDays; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    gregorianDaySelect.appendChild(option);
  }

  // Try to keep the same day selected if possible
  if (currentDay <= maxDays) {
    gregorianDaySelect.value = currentDay;
  }
}

/**
 * Set up tab switching functionality
 */
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      // Show corresponding content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

/**
 * Set current date as default in both date selectors
 */
function setCurrentDate() {
  const today = new Date();
  const gregorianYear = today.getFullYear();
  const gregorianMonth = today.getMonth() + 1;
  const gregorianDay = today.getDate();

  // Set Gregorian date
  document.getElementById('gregorian-year').value = gregorianYear;
  document.getElementById('gregorian-month').value = gregorianMonth;
  updateGregorianDays(gregorianYear, gregorianMonth);
  document.getElementById('gregorian-day').value = gregorianDay;

  // Set Jalali date
  const [jalaliYear, jalaliMonth, jalaliDay] = farvardin.gregorianToSolar(
    gregorianYear,
    gregorianMonth,
    gregorianDay
  );

  document.getElementById('jalali-year').value = jalaliYear;
  document.getElementById('jalali-month').value = jalaliMonth;
  updateJalaliDays(jalaliYear, jalaliMonth);
  document.getElementById('jalali-day').value = jalaliDay;

  // Show initial conversions
  convertToGregorian();
  convertToJalali();
}

/**
 * Convert Jalali date to Gregorian and display result
 */
function convertToGregorian() {
  const jalaliYear = parseInt(document.getElementById('jalali-year').value);
  const jalaliMonth = parseInt(document.getElementById('jalali-month').value);
  const jalaliDay = parseInt(document.getElementById('jalali-day').value);

  const [gregorianYear, gregorianMonth, gregorianDay] = farvardin.solarToGregorian(
    jalaliYear,
    jalaliMonth,
    jalaliDay
  );

  const gregorianMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const result = `${gregorianDay} ${gregorianMonths[gregorianMonth - 1]} ${gregorianYear}`;
  document.getElementById('gregorian-result').textContent = result;
}

/**
 * Convert Gregorian date to Jalali and display result
 */
function convertToJalali() {
  const gregorianYear = parseInt(document.getElementById('gregorian-year').value);
  const gregorianMonth = parseInt(document.getElementById('gregorian-month').value);
  const gregorianDay = parseInt(document.getElementById('gregorian-day').value);

  const [jalaliYear, jalaliMonth, jalaliDay] = farvardin.gregorianToSolar(
    gregorianYear,
    gregorianMonth,
    gregorianDay
  );

  const jalaliMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  const result = `${jalaliDay} ${jalaliMonths[jalaliMonth - 1]} ${jalaliYear}`;
  document.getElementById('jalali-result').textContent = result;
}