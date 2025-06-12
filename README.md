# LinkedIn Auto-Responder Extension

This project provides a minimal Chrome extension that can help you generate replies to LinkedIn posts and comments using OpenAI's API. The extension injects an **AI Reply** button next to comment boxes on LinkedIn. When clicked, it sends the related text to OpenAI and inserts the generated response back into the comment box.

## Features
- Injects a button to generate replies on LinkedIn pages.
- Communicates with OpenAI's chat completion API to craft responses.
- Allows each user to specify an OpenAI API key and preferred tone of voice via the options page.

## Usage
1. Open Chrome and navigate to `chrome://extensions`.
2. Enable Developer Mode and choose **Load unpacked**.
3. Select the `extension` folder of this repository.
4. Click the extension icon and open the options page to set your OpenAI API key and desired reply tone.
5. Visit LinkedIn and use the **AI Reply** button next to any comment box.

The generated reply will populate the comment field so you can review or edit it before posting.
