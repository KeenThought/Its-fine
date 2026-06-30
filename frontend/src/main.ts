import { consultOracle, fetchDailyOracle, fetchPrinciples } from './api';
import type { AppView, ConsultOracleResponse, DailyOracleResponse, OraclePhase } from './types';

const AWAKEN_MS = 2800;
const SPEAK_MS = 1200;

const navTabs = document.querySelectorAll<HTMLButtonElement>('.nav-tab');
const panels = {
  daily: document.getElementById('panel-daily')!,
  consult: document.getElementById('panel-consult')!,
  principles: document.getElementById('panel-principles')!,
};

const oracleStatus = document.getElementById('oracle-status')!;
const oracleStage = document.querySelector('.oracle-stage')!;

const journeyBadge = document.getElementById('journey-badge')!;
const journeyDay = document.getElementById('journey-day')!;
const journeyTotal = document.getElementById('journey-total')!;

const dailyCard = document.getElementById('daily-card')!;
const dailyText = document.getElementById('daily-text')!;
const dailyRef = document.getElementById('daily-ref')!;
const dailyReflection = document.getElementById('daily-reflection')!;
const dailyPrinciple = document.getElementById('daily-principle')!;
const btnRevealDaily = document.getElementById('btn-reveal-daily') as HTMLButtonElement;
const btnShareDaily = document.getElementById('btn-share-daily') as HTMLButtonElement;

const consultForm = document.getElementById('consult-form') as HTMLFormElement;
const questionInput = document.getElementById('question') as HTMLTextAreaElement;
const consultCard = document.getElementById('consult-card')!;
const consultText = document.getElementById('consult-text')!;
const consultRef = document.getElementById('consult-ref')!;
const consultReflection = document.getElementById('consult-reflection')!;
const consultPrinciple = document.getElementById('consult-principle')!;
const consultClosing = document.getElementById('consult-closing')!;
const btnShareConsult = document.getElementById('btn-share-consult') as HTMLButtonElement;

const principlesList = document.getElementById('principles-list')!;

let oraclePhase: OraclePhase = 'idle';
let dailyData: DailyOracleResponse | null = null;
let consultData: ConsultOracleResponse | null = null;
let animationTimer: ReturnType<typeof setTimeout> | null = null;

function setOraclePhase(phase: OraclePhase) {
  oraclePhase = phase;
  oracleStage.className = 'oracle-stage';
  oracleStage.classList.add(`oracle-stage--${phase}`);

  switch (phase) {
    case 'idle':
      oracleStatus.textContent = 'The oracle awaits';
      break;
    case 'awakening':
      oracleStatus.textContent = 'The oracle is awakening…';
      break;
    case 'speaking':
      oracleStatus.textContent = 'The Word is being spoken…';
      break;
    case 'revealed':
      oracleStatus.textContent = 'The oracle has spoken';
      break;
    default: {
      const _exhaustive: never = phase;
      return _exhaustive;
    }
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    animationTimer = setTimeout(resolve, ms);
  });
}

async function runOracleReveal(onReveal: () => void): Promise<void> {
  if (animationTimer) clearTimeout(animationTimer);
  setOraclePhase('awakening');
  await wait(AWAKEN_MS);
  setOraclePhase('speaking');
  await wait(SPEAK_MS);
  setOraclePhase('revealed');
  onReveal();
}

function switchView(view: AppView) {
  navTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.view === view);
  });
  Object.entries(panels).forEach(([key, panel]) => {
    const isActive = key === view;
    panel.hidden = !isActive;
    panel.classList.toggle('panel--active', isActive);
  });
}

function renderPrincipleTag(el: HTMLElement, name: string) {
  el.textContent = name;
}

function renderDailyCard(data: DailyOracleResponse) {
  dailyText.textContent = `"${data.oracle.text}"`;
  dailyRef.textContent = data.oracle.reference;
  dailyReflection.textContent = data.oracle.reflection;
  renderPrincipleTag(dailyPrinciple, data.principle.name);
  journeyDay.textContent = String(data.journeyDay);
  journeyTotal.textContent = String(data.journeyTotal);
  journeyBadge.hidden = false;
  dailyCard.hidden = false;
  btnShareDaily.hidden = false;
}

function renderConsultCard(data: ConsultOracleResponse) {
  consultText.textContent = `"${data.oracle.text}"`;
  consultRef.textContent = data.oracle.reference;
  consultReflection.textContent = data.oracle.reflection;
  renderPrincipleTag(consultPrinciple, data.principle.name);
  consultClosing.textContent = data.closing;
  consultCard.hidden = false;
  btnShareConsult.hidden = false;
}

async function loadPrinciples() {
  try {
    const principles = await fetchPrinciples();
    principlesList.innerHTML = principles
      .map(
        (p) => `
        <li class="principle-item">
          <span class="principle-num">${p.order}</span>
          <div>
            <h3>${p.name}</h3>
            <p>${p.description}</p>
          </div>
        </li>`
      )
      .join('');
  } catch {
    principlesList.innerHTML =
      '<li class="principle-item"><p>Could not load principles. Is the backend running?</p></li>';
  }
}

async function preloadDaily() {
  try {
    dailyData = await fetchDailyOracle();
  } catch {
    dailyData = null;
  }
}

async function handleRevealDaily() {
  btnRevealDaily.disabled = true;
  dailyCard.hidden = true;
  btnShareDaily.hidden = true;
  journeyBadge.hidden = true;

  try {
    if (!dailyData) dailyData = await fetchDailyOracle();
    const data = dailyData;
    await runOracleReveal(() => renderDailyCard(data));
  } catch {
    oracleStatus.textContent = 'Could not reach the oracle. Start the backend on port 8080.';
    setOraclePhase('idle');
  } finally {
    btnRevealDaily.disabled = false;
  }
}

async function handleConsultSubmit(e: Event) {
  e.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;

  consultCard.hidden = true;
  btnShareConsult.hidden = true;
  const submitBtn = consultForm.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  submitBtn.disabled = true;

  try {
    await runOracleReveal(async () => {
      consultData = await consultOracle(question);
      renderConsultCard(consultData);
    });
  } catch {
    oracleStatus.textContent = 'The oracle could not be reached. Check the backend.';
    setOraclePhase('idle');
  } finally {
    submitBtn.disabled = false;
  }
}

function buildShareText(reference: string, text: string, principle: string): string {
  const excerpt = text.length > 120 ? `${text.slice(0, 117)}…` : text;
  return `Oracle of God — ${reference}\n\n"${excerpt}"\n\nFirst Principle: ${principle}\n\noracleofgod.app`;
}

async function shareWord(reference: string, text: string, principle: string) {
  const shareText = buildShareText(reference, text, principle);
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Oracle of God', text: shareText });
      return;
    } catch {
      // fall through to clipboard
    }
  }
  await navigator.clipboard.writeText(shareText);
  oracleStatus.textContent = 'Word copied to clipboard';
  setTimeout(() => {
    if (oraclePhase === 'revealed') oracleStatus.textContent = 'The oracle has spoken';
  }, 2000);
}

navTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const view = tab.dataset.view as AppView;
    switchView(view);
  });
});

btnRevealDaily.addEventListener('click', handleRevealDaily);
consultForm.addEventListener('submit', handleConsultSubmit);

btnShareDaily.addEventListener('click', () => {
  if (!dailyData) return;
  shareWord(dailyData.oracle.reference, dailyData.oracle.text, dailyData.principle.name);
});

btnShareConsult.addEventListener('click', () => {
  if (!consultData) return;
  shareWord(consultData.oracle.reference, consultData.oracle.text, consultData.principle.name);
});

setOraclePhase('idle');
loadPrinciples();
preloadDaily();
