# Picture-in-Picture Extension

A lightweight Chrome extension that enables Picture-in-Picture (PiP) mode for videos on any webpage with a `<video>` element, such as YouTube, Vimeo, and more. The extension supports both **English** and **Turkish** languages, automatically adapting to the user's browser language settings.

![Picture-in-Picture Extension Screenshot](https://github.com/ibrahimemiraydin/picture-in-picture-extension/blob/main/picture-in-picture.png?raw=true)

## Features

- **Toggle PiP Mode**: Easily switch any video to Picture-in-Picture mode with a single click.
- **Multi-Language Support**: Supports English and Turkish, automatically detected based on browser language settings.
- **Broad Compatibility**: Works on any webpage with an HTML5 `<video>` element (e.g., YouTube, Vimeo, Twitch).
- **User-Friendly Interface**: Clean and intuitive popup with Material Design icons.
- **Error Handling**: Provides clear feedback for unsupported pages or when no video is found.

## Installation

To use the Picture-in-Picture Extension, follow these steps to load it as an unpacked extension in Chrome:

1. **Clone or Download the Repository**:
   - Clone this repository: `git clone https://github.com/ibrahimemiraydin/picture-in-picture-extension.git`
   - Or download the ZIP file and extract it.

2. **Open Chrome Extensions Page**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (toggle in the top-right corner).

3. **Load the Extension**:
   - Click **Load unpacked** and select the `pip-extension` folder from the cloned or extracted repository.

4. **Verify Installation**:
   - The extension icon should appear in the Chrome toolbar.
   - Ensure the folder structure matches the following:
     ```
     pip-extension/
     ├── _locales/
     │   ├── en/
     │   │   └── messages.json
     │   ├── tr/
     │   │   └── messages.json
     ├── material-icons/
     │   └── fonts/
     │       └── MaterialSymbolsRounded.ttf
     ├── content.js
     ├── icon128.png
     ├── icon48.png
     ├── manifest.json
     ├── popup.css
     ├── popup.html
     ├── popup.js
     ```

## Usage

1. **Open a Video Page**:
   - Navigate to a webpage with a video, such as YouTube (`https://www.youtube.com/watch?v=...`) or Vimeo.

2. **Click the Extension Icon**:
   - Click the Picture-in-Picture Extension icon in the Chrome toolbar to open the popup.

3. **Toggle PiP Mode**:
   - Click **Start PiP Mode** (or **PIP Modunu Başlat** in Turkish) to enter PiP mode.
   - If a video is already in PiP mode, click **Exit PiP Mode** (or **PIP Modunu Kapat**) to exit.

4. **Feedback**:
   - The extension will display messages like "Video switched to Picture-in-Picture mode!" or "Error: No video found" based on the action.

## Supported Languages

- **English** (`en`): Default language.
- **Turkish** (`tr`): Automatically used if the browser language is set to Turkish.

To switch languages, change your browser language settings in Chrome (`Settings > Languages`) and restart the browser.

## Compatibility

The extension works on any webpage with an HTML5 `<video>` element. Tested on:
- YouTube
- Vimeo
- Twitch
- Other websites with standard `<video>` elements

**Note**: Some websites (e.g., Netflix, Amazon Prime) use DRM protection, which may prevent PiP mode. Additional configuration may be required for such sites.

## File Structure

- `_locales/en/messages.json`, `_locales/tr/messages.json`: Language files for English and Turkish translations.
- `content.js`: Handles video detection and PiP mode toggling.
- `popup.html`, `popup.css`, `popup.js`: Popup interface for user interaction.
- `manifest.json`: Extension configuration.
- `material-icons/fonts/MaterialSymbolsRounded.ttf`: Custom font for Material Icons.
- `icon48.png`, `icon128.png`: Extension icons.

## Development

To contribute or modify the extension:

1. **Edit Files**:
   - Modify `popup.html`, `popup.css`, or `popup.js` for UI changes.
   - Update `content.js` for video handling logic.
   - Add new languages by creating additional `_locales/xx/messages.json` files.

2. **Test Changes**:
   - Reload the extension in `chrome://extensions/` after making changes.
   - Test on various video websites to ensure compatibility.

3. **Debugging**:
   - Open Chrome DevTools (`Ctrl+Shift+I`) and check the console for logs (e.g., `content.js yüklendi`, `Mesaj alındı`).
   - Verify language switching by changing Chrome’s language settings.

## Known Issues

- **DRM-Protected Sites**: Some streaming platforms (e.g., Netflix) may not support PiP due to DRM restrictions.
- **Dynamic Video Elements**: Videos loaded dynamically may require additional DOM handling in `content.js`.

If you encounter issues, please open an issue on this repository with:
- The URL of the webpage.
- Console logs from Chrome DevTools.
- A screenshot of the popup.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Built with [Chrome Extensions API](https://developer.chrome.com/docs/extensions/).
- Uses [Material Icons](https://fonts.google.com/icons) for the UI.
- Inspired by the need for a simple, multi-language PiP solution.