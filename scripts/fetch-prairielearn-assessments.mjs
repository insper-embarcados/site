import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(rootDir, 'docs/public/pl-assessments.json')
const linksPath = path.join(rootDir, 'docs/.vitepress/links.js')

function readEnvFile(content) {
  return Object.fromEntries(
    content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const [key, ...rest] = line.replace(/^export\s+/, '').split('=')
        return [key.trim(), rest.join('=').trim().replace(/^['"]|['"]$/g, '')]
      })
  )
}

async function getToken() {
  if (process.env.PRAIRIELEARN_TOKEN) return process.env.PRAIRIELEARN_TOKEN
  if (process.env.PL) return process.env.PL

  try {
    const env = readEnvFile(await readFile(path.join(rootDir, '.env'), 'utf8'))
    return env.PRAIRIELEARN_TOKEN || env.PL || ''
  } catch {
    return ''
  }
}

function parseCourseInstance(url) {
  const match = url.match(/^(https?:\/\/[^/]+)\/pl\/course_instance\/(\d+)/)
  if (!match) return null
  return { origin: match[1], courseInstanceId: match[2] }
}

async function getPrairieLearnUrl() {
  const content = await readFile(linksPath, 'utf8')
  const match = content.match(/prairielearn:\s*['"]([^'"]+)['"]/) 
  return match?.[1] || ''
}

function toDate(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function isRuleOpen(rule, now) {
  const start = toDate(rule.start_date)
  const end = toDate(rule.end_date)
  return Boolean(end) && (!start || start <= now) && end >= now
}

async function apiGet(url, token) {
  const response = await fetch(url, { headers: { 'Private-Token': token } })
  if (!response.ok) {
    throw new Error(`PrairieLearn API ${response.status} em ${url}`)
  }
  return response.json()
}

async function writeAssessments(data) {
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`)
}

async function main() {
  const token = await getToken()
  const courseUrl = await getPrairieLearnUrl()
  const course = parseCourseInstance(courseUrl)
  const generatedAt = new Date().toISOString()

  if (!course) {
    await writeAssessments({ generatedAt, courseUrl, assessments: [] })
    console.warn('PrairieLearn: link prairielearn invalido em docs/.vitepress/links.js')
    return
  }

  if (!token) {
    await writeAssessments({ generatedAt, courseUrl, assessments: [] })
    console.warn('PrairieLearn: defina PRAIRIELEARN_TOKEN ou PL para buscar entregas abertas')
    return
  }

  const apiBase = `${course.origin}/pl/api/v1/course_instances/${course.courseInstanceId}`
  const assessments = await apiGet(`${apiBase}/assessments`, token)
  const now = new Date()

  const enriched = await Promise.all(
    assessments.map(async (assessment) => {
      const rules = await apiGet(`${apiBase}/assessments/${assessment.assessment_id}/assessment_access_rules`, token)
      const openRules = rules.filter((rule) => isRuleOpen(rule, now))
      if (!openRules.length) return null

      const deadlines = openRules
        .map((rule) => ({
          start: rule.start_date || null,
          end: rule.end_date || null,
          credit: rule.credit ?? null,
        }))
        .sort((a, b) => {
          if (!a.end && !b.end) return 0
          if (!a.end) return 1
          if (!b.end) return -1
          return new Date(a.end) - new Date(b.end)
        })

      return {
        id: String(assessment.assessment_id),
        title: assessment.title || assessment.assessment_label || assessment.assessment_name,
        label: assessment.assessment_label || '',
        set: assessment.assessment_set_heading || assessment.assessment_set_name || '',
        url: `${courseUrl}/assessment/${assessment.assessment_id}`,
        deadlines,
      }
    })
  )

  const openAssessments = enriched
    .filter(Boolean)
    .sort((a, b) => {
      const endA = a.deadlines.find((deadline) => deadline.end)?.end
      const endB = b.deadlines.find((deadline) => deadline.end)?.end
      if (!endA && !endB) return a.title.localeCompare(b.title, 'pt-BR')
      if (!endA) return 1
      if (!endB) return -1
      return new Date(endA) - new Date(endB)
    })

  await writeAssessments({ generatedAt, courseUrl, assessments: openAssessments })
  console.log(`PrairieLearn: ${openAssessments.length} entregas abertas encontradas`)
}

main().catch(async (error) => {
  await writeAssessments({ generatedAt: new Date().toISOString(), assessments: [] })
  console.warn(`PrairieLearn: nao foi possivel buscar entregas (${error.message})`)
})
