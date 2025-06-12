(function() {
  // Observe DOM changes to find comment boxes
  const observer = new MutationObserver(() => {
    const commentBoxes = document.querySelectorAll('textarea.comments-comment-box__comment-texteditor, textarea.comment-box__text-editor');
    commentBoxes.forEach(box => {
      if (!box.dataset.aiReplyAttached) {
        addButton(box);
        box.dataset.aiReplyAttached = 'true';
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function addButton(textArea) {
    const btn = document.createElement('button');
    btn.textContent = 'AI Reply';
    btn.style.marginLeft = '5px';
    btn.addEventListener('click', async () => {
      const text = getPostText(textArea);
      const [tone, apiKey] = await Promise.all([
        chrome.storage.sync.get('tone').then(r => r.tone || 'friendly'),
        chrome.storage.sync.get('apiKey').then(r => r.apiKey || '')
      ]);
      if (!apiKey) {
        alert('OpenAI API key not set. Please set it in the extension options.');
        return;
      }
      const reply = await chrome.runtime.sendMessage({ action: 'generateReply', text, tone, apiKey });
      if (reply) {
        textArea.value = reply;
        textArea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    textArea.parentNode.appendChild(btn);
  }

  function getPostText(textArea) {
    const container = textArea.closest('.comment, .comments-comment-item');
    if (container) {
      const post = container.querySelector('.feed-shared-update-v2__description, .comments-comment-item__main-content');
      if (post) return post.innerText.trim();
    }
    return textArea.value;
  }
})();
