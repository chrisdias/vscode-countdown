# VS Code Countdown Timer

A simple Visual Studio Code extension that shows a countdown timer in the status bar. The timer displays the number of weeks and days until a target date.

## Features

- Shows countdown in weeks and days in the status bar
- Simple date input format (MM/DD/YY)
- Persistent storage of the target date between VS Code sessions
- Easy to set and clear the target date

## Usage

1. Click on "Set Date" in the status bar (left side)
2. Enter a target date in MM/DD/YY format (e.g., "12/31/25")
3. The status bar will show the countdown in weeks and days (e.g., "5W/35D")

If you've already set a date and want to change or clear it:
1. Click on the countdown in the status bar
2. Choose either "Set Date" to enter a new date or "Clear Date" to remove the countdown

## Development

### Prerequisites
- Node.js
- VS Code

### Setup
1. Clone the repository
2. Run `npm install`
3. Open in VS Code
4. Press F5 to start debugging

### Building
- Run `npm run watch` to start the TypeScript compiler in watch mode
- Run `npm run compile` to compile the extension

## Extension Settings

This extension does not add any VS Code settings.

## Known Issues

None currently.

## Release Notes

### 0.0.1

Initial release:
- Basic countdown functionality
- Status bar integration
- Date persistence
- Set/Clear date options
