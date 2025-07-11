"use strict";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'generateReply') {
    try {
      const reply = await generateReply(request.text, request.tone, request.apiKey);
      sendResponse(reply);
    } catch (e) {
      console.error('OpenAI error', e);
      sendResponse(null);
    }
    return true; // indicates async response
  }
});

async function generateReply(prompt, tone, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `${prompt}\nRespond with a ${tone} tone.` }]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status}`);
  }

  const data = await response.json();
  const [choice] = data.choices || [];
  return choice ? choice.message.content.trim() : '';
}
