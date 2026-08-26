<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'

const open = ref(false)
const assessments = ref([])
const generatedAt = ref('')
const panel = ref(null)
const now = ref(Date.now())
let clock

const sortedAssessments = computed(() => assessments.value)
const hasAssessments = computed(() => sortedAssessments.value.length > 0)
const fullCreditAssessments = computed(() => sortByTitle(sortedAssessments.value.filter((assessment) => maxCredit(assessment) >= 100)))
const lateAssessments = computed(() => sortByTitle(sortedAssessments.value.filter((assessment) => maxCredit(assessment) < 100)))
const openCount = computed(() => fullCreditAssessments.value.length)
const countLabel = computed(() => openCount.value > 9 ? '9+' : String(openCount.value))

function formatDate(value) {
  if (!value) return 'Sem prazo definido'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function maxCredit(assessment) {
  return Math.max(...assessment.deadlines.map((deadline) => Number(deadline.credit) || 0))
}

function sortByTitle(items) {
  return [...items].sort((a, b) =>
    a.title.localeCompare(b.title, 'pt-BR', { numeric: true, sensitivity: 'base' })
      || a.label.localeCompare(b.label, 'pt-BR', { numeric: true, sensitivity: 'base' })
  )
}

function bestDeadline(assessment) {
  return [...assessment.deadlines].sort((a, b) => (Number(b.credit) || 0) - (Number(a.credit) || 0))[0]
}

function isDeadlineSoon(assessment) {
  const end = new Date(bestDeadline(assessment)?.end).getTime()
  const remaining = end - now.value
  return Number.isFinite(end) && remaining > 0 && remaining < 48 * 60 * 60 * 1000
}

function creditLabel(assessment) {
  const credit = maxCredit(assessment)
  return credit ? `${credit}% credito` : 'Credito reduzido'
}

function closeOnOutside(event) {
  if (panel.value && !panel.value.contains(event.target)) open.value = false
}

onMounted(async () => {
  document.addEventListener('click', closeOnOutside)
  clock = window.setInterval(() => {
    now.value = Date.now()
  }, 60_000)
  try {
    const response = await fetch(withBase('/pl-assessments.json'))
    if (!response.ok) return
    const data = await response.json()
    assessments.value = data.assessments || []
    generatedAt.value = data.generatedAt || ''
  } catch {
    assessments.value = []
  }
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnOutside)
  window.clearInterval(clock)
})
</script>

<template>
  <div ref="panel" class="pl-deliveries" @mouseenter="open = true">
    <button
      class="pl-deliveries__button"
      type="button"
      aria-label="Entregas abertas no PrairieLearn"
      :aria-expanded="open"
      @click.stop="open = !open"
    >
      <span class="pl-deliveries__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="img">
          <path d="M7 3.5h10A2.5 2.5 0 0 1 19.5 6v12A2.5 2.5 0 0 1 17 20.5H7A2.5 2.5 0 0 1 4.5 18V6A2.5 2.5 0 0 1 7 3.5Zm0 2A.5.5 0 0 0 6.5 6v12a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5H7Zm2 3h6v1.7H9V8.5Zm0 3.8h4.2V14H9v-1.7Z" />
          <path d="m14.2 16.1 1 1 2.4-2.6 1.1 1-3.5 3.8-2.1-2.1 1.1-1.1Z" />
        </svg>
      </span>
      <span class="pl-deliveries__text">Prazos</span>
      <span v-if="openCount" class="pl-deliveries__badge">{{ countLabel }}</span>
    </button>

    <Transition name="pl-popover">
      <section v-if="open" class="pl-deliveries__panel" @click.stop>
        <div class="pl-deliveries__header">
          <div>
            <p class="pl-deliveries__eyebrow">PrairieLearn</p>
            <h2>Entregas abertas</h2>
          </div>
          <span class="pl-deliveries__pill">{{ sortedAssessments.length }}</span>
        </div>

        <div v-if="hasAssessments" class="pl-deliveries__list">
          <div v-if="fullCreditAssessments.length" class="pl-deliveries__group">
            <h3 class="pl-deliveries__group-title pl-deliveries__group-title--open">No prazo</h3>
            <a
              v-for="assessment in fullCreditAssessments"
              :key="assessment.id"
              :class="['pl-deliveries__item', 'pl-deliveries__item--open', { 'pl-deliveries__item--soon': isDeadlineSoon(assessment) }]"
              :href="assessment.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="pl-deliveries__item-main">
                <strong>{{ assessment.title }}</strong>
                <small>{{ assessment.set || assessment.label }}</small>
              </span>
              <span class="pl-deliveries__date">
                {{ formatDate(bestDeadline(assessment)?.end) }}
                <em>{{ creditLabel(assessment) }}</em>
              </span>
            </a>
          </div>

          <div v-if="lateAssessments.length" class="pl-deliveries__group">
            <h3 class="pl-deliveries__group-title pl-deliveries__group-title--late">Atrasadas</h3>
            <a
              v-for="assessment in lateAssessments"
              :key="assessment.id"
              class="pl-deliveries__item pl-deliveries__item--late"
              :href="assessment.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="pl-deliveries__item-main">
                <strong>{{ assessment.title }}</strong>
                <small>{{ assessment.set || assessment.label }}</small>
              </span>
              <span class="pl-deliveries__date">
                {{ formatDate(bestDeadline(assessment)?.end) }}
                <em>{{ creditLabel(assessment) }}</em>
              </span>
            </a>
          </div>
        </div>

        <div v-else class="pl-deliveries__empty">
          <strong>Nenhuma entrega aberta agora.</strong>
          <span>Quando o PrairieLearn liberar uma atividade, ela aparece aqui.</span>
        </div>

        <p v-if="generatedAt" class="pl-deliveries__updated">
          Atualizado no build: {{ formatDate(generatedAt) }}
        </p>
      </section>
    </Transition>
  </div>
</template>

<style scoped>
.pl-deliveries {
  margin-left: 12px;
  position: relative;
  z-index: 30;
}

.pl-deliveries__button {
  align-items: center;
  background: color-mix(in srgb, var(--vp-c-brand-soft) 54%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-divider));
  border-radius: 999px;
  box-shadow: none;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  display: flex;
  font-size: 13px;
  font-weight: 800;
  gap: 7px;
  height: 36px;
  padding: 6px 10px 6px 8px;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.pl-deliveries__button:hover {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.pl-deliveries__icon,
.pl-deliveries__badge,
.pl-deliveries__pill {
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.pl-deliveries__icon {
  background: color-mix(in srgb, currentColor 12%, transparent);
  border-radius: 50%;
  height: 24px;
  width: 24px;
}

.pl-deliveries__icon svg {
  fill: currentColor;
  height: 18px;
  width: 18px;
}

.pl-deliveries__badge {
  background: #16a34a;
  border-radius: 999px;
  color: #fff;
  font-size: 11px;
  height: 20px;
  min-width: 20px;
  padding: 0 6px;
}

.pl-deliveries__panel {
  background: color-mix(in srgb, var(--vp-c-bg) 92%, transparent);
  backdrop-filter: blur(18px);
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
  color: var(--vp-c-text-1);
  margin-top: 10px;
  max-height: min(620px, calc(100vh - 82px));
  overflow: hidden;
  padding: 18px;
  position: absolute;
  right: -8px;
  top: 100%;
  width: min(430px, calc(100vw - 28px));
}

.pl-deliveries__header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.pl-deliveries__eyebrow,
.pl-deliveries__updated {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin: 0;
}

.pl-deliveries__eyebrow {
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.pl-deliveries__header h2 {
  font-size: 20px;
  line-height: 1.2;
  margin: 2px 0 0;
}

.pl-deliveries__pill {
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  border-radius: 999px;
  color: var(--vp-c-brand-1);
  font-weight: 800;
  min-width: 36px;
  padding: 6px 10px;
}

.pl-deliveries__list {
  display: grid;
  gap: 16px;
  max-height: min(460px, calc(100vh - 230px));
  overflow: auto;
  padding-right: 2px;
}

.pl-deliveries__group {
  display: grid;
  gap: 10px;
}

.pl-deliveries__group-title {
  align-items: center;
  display: flex;
  font-size: 12px;
  font-weight: 900;
  gap: 8px;
  letter-spacing: 0.1em;
  margin: 0;
  text-transform: uppercase;
}

.pl-deliveries__group-title::before {
  border-radius: 999px;
  content: '';
  height: 8px;
  width: 8px;
}

.pl-deliveries__group-title--open {
  color: #15803d;
}

.pl-deliveries__group-title--open::before {
  background: #22c55e;
}

.pl-deliveries__group-title--late {
  color: #b91c1c;
}

.pl-deliveries__group-title--late::before {
  background: #ef4444;
}

.pl-deliveries__item {
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  color: inherit;
  display: flex;
  gap: 14px;
  justify-content: space-between;
  padding: 13px;
  text-decoration: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.pl-deliveries__item--open {
  background: linear-gradient(135deg, rgba(220, 252, 231, 0.9), rgba(187, 247, 208, 0.45));
  border-color: rgba(34, 197, 94, 0.34);
}

.pl-deliveries__item--soon {
  background: linear-gradient(135deg, rgba(254, 249, 195, 0.94), rgba(253, 230, 138, 0.48));
  border-color: rgba(202, 138, 4, 0.42);
}

.pl-deliveries__item--late {
  background: linear-gradient(135deg, rgba(254, 226, 226, 0.92), rgba(254, 202, 202, 0.44));
  border-color: rgba(239, 68, 68, 0.34);
}

.dark .pl-deliveries__item--open {
  background: linear-gradient(135deg, rgba(20, 83, 45, 0.65), rgba(22, 101, 52, 0.28));
}

.dark .pl-deliveries__item--soon {
  background: linear-gradient(135deg, rgba(113, 63, 18, 0.72), rgba(133, 77, 14, 0.34));
}

.dark .pl-deliveries__item--late {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.64), rgba(153, 27, 27, 0.28));
}

.pl-deliveries__item:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: inset 0 0 0 1px var(--vp-c-brand-1);
}

.pl-deliveries__item-main,
.pl-deliveries__date,
.pl-deliveries__empty {
  display: grid;
}

.pl-deliveries__item-main strong {
  font-size: 14px;
  line-height: 1.25;
}

.pl-deliveries__item-main small {
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.pl-deliveries__date {
  color: var(--vp-c-text-1);
  flex: 0 0 auto;
  font-size: 13px;
  font-weight: 800;
  justify-items: end;
  min-width: 108px;
}

.pl-deliveries__date em {
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  margin-top: 4px;
  text-transform: uppercase;
}

.pl-deliveries__empty {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 18px;
  color: var(--vp-c-text-2);
  gap: 4px;
  padding: 18px;
}

.pl-deliveries__empty strong {
  color: var(--vp-c-text-1);
}

.pl-deliveries__updated {
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 14px;
  padding-top: 12px;
}

.pl-popover-enter-active,
.pl-popover-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.pl-popover-enter-from,
.pl-popover-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

@media (max-width: 767px) {
  .pl-deliveries {
    margin-left: 6px;
  }

  .pl-deliveries__text {
    display: none;
  }

  .pl-deliveries__button {
    padding-right: 8px;
  }

  .pl-deliveries__panel {
    padding: 14px;
  }

  .pl-deliveries__item {
    align-items: flex-start;
    flex-direction: column;
  }

  .pl-deliveries__date {
    justify-items: start;
  }
}
</style>
