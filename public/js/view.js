export function renderMessages(messages, container) {
  if (!container) return;
  const lignes = messages.map((msg) => {
    const li = document.createElement('li');
    const label = msg.role === 'user' ? 'Vous : ' : 'Cap Web : ';
    li.textContent = label + msg.text;
    if (msg.role) {
      li.dataset.role = msg.role;
    }
    return li;
  });
  container.replaceChildren(...lignes);
}
