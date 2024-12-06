# Calendar JavaScript Class

The `Calendar` class is a versatile JavaScript module that provides a full-featured calendar interface with support for creating, modifying, and deleting events. It includes multilingual support for English (`en`), German (`de`), and Turkish (`tr`). The events can have customizable colors, icons, and time ranges, with the ability to apply those colors as full backgrounds or dots on the calendar dates.

## Features

- **Multilingual Support**: Currently supports English (`en`), German (`de`), and Turkish (`tr`).
- **Event Creation and Management**: Allows users to create, view, update, and delete events.
- **Modal for Events**: Includes two modals for event management:
  - **List Modal**: Lists all events for a selected day with an option to add new events.
  - **Detail Modal**: Displays details of an existing event and allows editing or deleting.
- **Customizable Event Appearance**: Events can have custom colors, icons, and time details.
- **UI Controls**: Provides navigation buttons to switch between months.

## Installation

To use the `Calendar` class in your project, you need to include the JavaScript file (`complete_calendar.js`) in your HTML file, along with Bootstrap for modals and styling. The calendar is initialized in a container element that you specify by ID.

### Required Dependencies
- [Bootstrap 5](https://getbootstrap.com/): For modal and UI components.
- The `complete_calendar.js` JavaScript file.

### Example HTML Structure
Create a container in your HTML where the calendar will be rendered.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar Example</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="calendar.css">
</head>
<body>
    <div id="calendarContainer" class="calendar-container"></div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="complete_calendar.js"></script>
    <script>
        // Initialize the calendar in Turkish (tr)
        const calendar = new Calendar('tr', 'calendarContainer');
    </script>
</body>
</html>
```

## Usage

### Creating a New Calendar
To create a new calendar instance, use the following JavaScript code:

```javascript
const calendar = new Calendar('en', 'calendarContainer');
```

- The first parameter is the language code (`'en'`, `'de'`, `'tr'`).
- The second parameter is the ID of the container where the calendar will be rendered.

### Event Management
The calendar allows you to manage events through modals.

1. **Click on a Day**: Clicking on a day in the calendar opens the **List Modal**, showing all events for that day.
2. **Add a New Event**: In the **List Modal**, click on "Add New Event" to open the **Detail Modal** where you can enter event details, including:
   - **Title**: The title of the event.
   - **Start and End Dates**: The range of dates for the event.
   - **Time**: The time of the event.
   - **Icon**: Any emoji or symbol to visually represent the event.
   - **Color**: Choose a color to represent the event in the calendar.
   - **Apply Color**: Select whether the color should appear as a "dot" or as a "full box" on the calendar date.
3. **Edit an Event**: Click on an existing event in the **List Modal** to open the **Detail Modal** with event details, where you can edit or delete the event.
4. **Delete an Event**: Use the delete button in the **Detail Modal** to remove an event.

### Customization
The calendar supports the following customizations:

- **Language Selection**: Pass a language code to the constructor to set the calendar's language.
- **Event Colors and Icons**: Customize each event with a color and icon of your choice.
- **Full Date or Dot Color Indication**: You can apply a color to an entire date box or add a colored dot to indicate an event.

### Example Walkthrough
Suppose you want to create a birthday event for a friend:

1. Click on the desired date in the calendar.
2. Click on "Add New Event" in the **List Modal**.
3. Fill in the details:
   - Title: "John's Birthday"
   - Start Date: Select the friend's birthday.
   - Time: Set the time for the celebration.
   - Icon: 🎂 (cake emoji)
   - Color: Choose a color that will highlight this event in the calendar.
   - Apply Color: Choose "full box" to make the day stand out.
4. Click **Save** to add the event.

When John's birthday arrives, the day will be highlighted with the chosen color and display the cake emoji, giving a visual reminder.

## Methods

- **Constructor**: `new Calendar(language, containerId)`
  - `language` (string): The language of the calendar (`en`, `de`, `tr`).
  - `containerId` (string): The ID of the container where the calendar should be rendered.
- **Event Modals**: The **List Modal** and **Detail Modal** help manage events visually.

## Styling
To change the calendar's appearance, modify the `calendar.css` file, which is included in the example HTML. You can adjust the look and feel of the calendar to better suit your application's theme.

## License
This project is open-source and available under the MIT License.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request with any improvements or additional features.

## Conclusion
The `Calendar` JavaScript class is a flexible and feature-rich way to add a calendar to your website or application, complete with event management, multilingual support, and customizable appearance. Whether you need a simple calendar or an interactive scheduler, this class can be easily integrated and adapted to suit your needs.

