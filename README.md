# Calendar Application

This project is a multilingual calendar application built using JavaScript, HTML, CSS, and Bootstrap 5. It supports English, German, and Turkish languages, and is designed to be easily extendable to include additional languages. The calendar allows users to add events, edit existing events, highlight date ranges, and provides various calendar views (monthly, yearly, etc.).

## Features

- **Multilingual Support**: Currently supports English, German, and Turkish. Additional languages can be easily added by updating the `languages` object in the JavaScript code.
- **Dynamic Calendar Generation**: The calendar is generated dynamically based on the selected year and month, showing day cells with events and highlighted date ranges.
- **Event Management**: Users can add, edit, and delete events. Clicking on a day opens a modal that displays existing events and allows users to create new events or modify existing ones.
  - **Event Details**: Users can add icons, select custom colors, set times, and modify existing events.
  - **Date Change**: Events can be moved to a different day, and the old entry will be updated accordingly.
- **Date Range Highlighting**: Specific date ranges can be highlighted with custom colors, making it easy to visually distinguish important periods.
- **Interactive Views**: The calendar supports different views, including month, year, and day details.
- **Toast Notifications**: When adding a birthday event, a toast notification is displayed to celebrate the event.

## Installation

To use this project, simply clone the repository and open the `index.html` file in your browser.

```sh
# Clone the repository
git clone https://github.com/akfgln/Calendar-Js.git

# Navigate to the project directory
cd calendar-project

# Open the index.html in your preferred browser
```

Ensure that you have a stable internet connection to load Bootstrap from the CDN.

## How to Use

1. **Navigation**: Use the `«` and `»` buttons to navigate between months.
2. **Add Events**: Click on a day cell to add or edit an event. A modal will open, displaying the existing events for that day. You can add new events or edit existing ones, including changing the date, time, icon, and color.
3. **Language Switching**: To change the language, modify the `currentLanguage` variable in the JavaScript code (`calendar.js`). Supported values are `en`, `de`, and `tr`.
4. **Date Range Highlighting**: Date ranges can be highlighted by updating the `dateRanges` array in the JavaScript code. Each date range is specified as `[start, end, color]` where `start` and `end` are dates in `YYYY-MM-DD` format.
5. **Toast Notifications**: Special toast notifications will be displayed for specific events, such as birthdays.

## Code Overview

- **HTML**: The `index.html` file defines the basic structure of the calendar, with Bootstrap classes for styling.
- **CSS**: The `calendar.css` file contains custom styles for the calendar. The Bootstrap framework is also used for styling.
- **JavaScript**: The `calendar.js` file contains the core logic of the calendar, including event handling, date range highlighting, multilingual support, and modal management for event details.

## Customization

- **Adding a New Language**:
  - To add a new language, update the `languages` object in `calendar.js`.
  - Add the translations for month names, prompts, and messages.
  - Update the `currentLanguage` variable to use the new language.

- **Backend Integration**:
  - The current implementation uses a modal to gather event details. To integrate with a backend API, modify the event functions to make API calls to save, update, or delete event data.

- **Event Customization**:
  - The current event indicators are either emojis or colored dots. You can customize these indicators by changing the `events` object or by updating the event modal to allow users to select different types of indicators.

## Dependencies

- **Bootstrap 5**: The application uses Bootstrap 5 for styling and responsiveness.
- **JavaScript**: Vanilla JavaScript is used for all dynamic behavior.

## Future Improvements

- **Full Backend Integration**: Connect the application to a backend API to persist events and date ranges.
- **User Authentication**: Add authentication to allow different users to have their own calendars.
- **Drag and Drop Events**: Implement drag-and-drop functionality for moving events between dates.
- **Additional Views**: Include weekly views and a more detailed daily agenda view.
- **Event Recurrence**: Add support for recurring events, such as weekly meetings or yearly anniversaries.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you see fit.

## Contributions

Contributions are welcome! If you'd like to improve the project or add new features, feel free to open a pull request or submit an issue.

## Contact

If you have any questions or suggestions, please contact us at [akfgln@gmail.com].

