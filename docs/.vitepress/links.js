/**
 * Arquivo central de links e variáveis reutilizáveis.
 *
 * Use a sintaxe {{nome_da_variavel}} em qualquer arquivo .md para substituir
 * tanto no conteúdo quanto nos campos de frontmatter (como `url:`).
 *
 * Exemplo de uso em Markdown:
 *   [Classroom]({{lab_gpio_classroom}})
 *
 * Exemplo de uso em frontmatter:
 *   links:
 *     - text: "Classroom"
 *       url: "{{lab_gpio_classroom}}"
 */
export const links = {
  // ─── PrairieLearn ────────────────────────────────────────────────────────────
  prairielearn: "https://us.prairielearn.com/pl/course_instance/210559",

  // ─── Lab 1 - GPIO ────────────────────────────────────────────────────────────
  lab_pre_gpio_classroom: "https://classroom.github.com/a/DSolRxRH",

  // ─── Lab 2 - IRQ ─────────────────────────────────────────────────────────────
  // lab_irq_classroom: "https://classroom.github.com/a/...",

  // ─── Lab 3 - Timer ───────────────────────────────────────────────────────────
  // lab_timer_classroom: "https://classroom.github.com/a/...",

  // ─── Lab 5 - RTOS ────────────────────────────────────────────────────────────
  // lab_rtos_classroom: "https://classroom.github.com/a/...",

  // ─── Outros ──────────────────────────────────────────────────────────────────
  // lab_adc_pwm_classroom: "https://classroom.github.com/a/...",
  // lab_i2c_classroom: "https://classroom.github.com/a/...",
}
