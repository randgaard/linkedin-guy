function saveOptions() {
  const apiKey = document.getElementById('apiKey').value;
  const tone = document.getElementById('tone').value || 'friendly';
  chrome.storage.sync.set({ apiKey, tone }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => status.textContent = '', 1000);
  });
}

document.getElementById('save').addEventListener('click', saveOptions);

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiKey', 'tone'], (res) => {
    if (res.apiKey) document.getElementById('apiKey').value = res.apiKey;
    if (res.tone) document.getElementById('tone').value = res.tone;
  });
});
