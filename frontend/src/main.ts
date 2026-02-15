interface AnswerResponse {
  answer: string;
}

const form = document.getElementById('ask-form') as HTMLFormElement;
const questionInput = document.getElementById('question') as HTMLInputElement;
const resultEl = document.getElementById('result') as HTMLDivElement;

form.addEventListener('submit', async (e: Event) => {
  e.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;

  resultEl.hidden = true;
  resultEl.textContent = '';
  resultEl.classList.remove('error');

  try {
    const url = `/api/answer?q=${encodeURIComponent(question)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as AnswerResponse;
    resultEl.textContent = data.answer ?? "it's fine";
    resultEl.hidden = false;
  } catch (err) {
    resultEl.textContent = "Couldn't reach the server. Is the backend running on port 8080?";
    resultEl.classList.add('error');
    resultEl.hidden = false;
  }
});
