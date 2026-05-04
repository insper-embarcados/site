import footnote from 'markdown-it-footnote'
import { defineConfig, type DefaultTheme } from 'vitepress'
import { defineConfig } from '@lando/vitepress-theme-default-plus/config'
import { links } from './links.js'

/**
 * Substitui todas as ocorrências de {{chave}} pelo valor definido em links.js.
 * Funciona recursivamente em objetos e arrays (para cobrir o frontmatter).
 */
function resolveVars(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.replace(/\{\{(\w+)\}\}/g, (_, key) =>
      (links as Record<string, string>)[key] ?? `{{${key}}}`
    )
  }
  if (Array.isArray(value)) return value.map(resolveVars)
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, resolveVars(v)])
    )
  }
  return value
}

/**
 * Sidebar dos módulos — compartilhado entre /entregas/, /labs/, /labs-expert/ e /provas/
 * para que a barra lateral seja sempre exibida independente da URL atual.
 */
const sidebarModulos = [
  {
    text: 'Módulos',
    items: [
      { text: 'Sobre', link: '/entregas/' },
      { text: 'Preparatório', link: '/labs/preparatorio' },
      { text: 'Prático', link: '/labs/pratico' },
    ]
  },
  {
    text: 'Módulo 1 - Baremetal',
    collapsed: true,
    items: [
      {
        text: 'Lab 1. GPIO',
        collapsed: true,
        items: [
          { text: 'Preparatório', link: '/labs/gpio-pre' },
          { text: 'Prático', link: '/labs/gpio-pra' }
        ]
      },
      {
        text: 'Lab 2. ISR',
        collapsed: true,
        items: [
          { text: 'Preparatório', link: '/labs/irq-pre' },
          { text: 'Prático', link: '/labs/irq-pra' }
        ]
      },
      {
        text: 'Lab 3. Timer',
        collapsed: true,
        items: [
          { text: 'Preparatório', link: '/labs/timer-pre' },
          { text: 'Prático', link: '/labs/timer-pra' }
        ]
      },
      {
        text: 'Lab 4. Expert 1',
        collapsed: true,
        items: [
          { text: 'Sobre', link: '/labs-expert/modulo-1-expert' },
          { text: 'Expert - LCD', link: '/labs-expert/labs-expert-sensors-ili9341-resistive' },
          { text: 'Expert - Multicore', link: '/labs-expert/labs-expert-firmware-multicore' },
          { text: 'Expert - Áudio', link: '/labs-expert/labs-expert-dsp-audio-out' },
        ]
      },
      { text: 'APS 1. Genius', link: '/entregas/aps-1-genius' },
      { text: '🎓 Avaliação prática', link: '/provas/sobre-modulo-1' },
    ]
  },
  {
    text: 'Módulo 2 - RTOS',
    collapsed: false,
    items: [
      {
        text: 'Lab 5. RTOS',
        collapsed: true,
        items: [
          { text: 'Preparatório', link: '/labs/rtos-pre' },
          { text: 'Prático', link: '/labs/rtos-pra' }
        ]
      },
      {
        text: 'Lab 6. ADC e PWM',
        collapsed: false,
        items: [
          { text: 'Preparatório', link: '/labs/adc-pwm-pre' },
          { text: 'Prático', link: '/labs/adc-pwm-pra' }
        ]
      },
      {
        text: 'Lab 7. I2C',
        collapsed: false,
        items: [
          { text: 'Preparatório', link: '/labs/i2c-pre' },
          { text: 'Prático', link: '/labs/i2c-pra' }
        ]
      },
      {
        text: 'Lab 8. Diagramas',
        collapsed: true,
        items: [
          { text: 'Preparatório', link: '/labs/diagrama-pre' },
          { text: 'Prático', link: '/labs/diagrama-pra' }
        ]
      },
      { text: '⏳ Lab 9. Expert 2', link: '/labs-expert/modulo-1-expert' },
      { text: '⏳ APS 2. Controle', link: '/entregas/aps-2-controle' },
      { text: '🎓 Avaliação prática', link: '/provas/sobre-modulo-1' },
    ]
  },
  {
    text: '⏳  Módulo 3 - Expert',
    collapsed: true,
    items: [
      { text: 'Lab 10. Expert 3', link: '/labs-expert/modulo-1-expert' },
      { text: 'Lab 11. Expert 4', link: '/labs-expert/modulo-1-expert' },
    ]
  },
  {
    text: '⏳ Labs expert',
    collapsed: true,
    items: [
      { text: 'Sobre', link: '/labs-expert/index' },
      { text: 'COM - Wifi', link: '/labs-expert/labs-expert-com-wifi-mqtt' },
      { text: 'COM - BLT', link: '/labs-expert/labs-expert-com-bt-v2' },
      { text: 'DSP - Áudio IN/OUT', link: '/labs-expert/labs-expert-dsp-audio' },
      { text: 'DSP - Áudio out', link: '/labs-expert/labs-expert-dsp-audio-out' },
      { text: 'DSP - AI', link: '/labs-expert/labs-expert-dsp-ia-v2' },
      { text: 'SEN - PanTilt', link: '/labs-expert/labs-expert-sensors-servomotor' },
      { text: 'SEN - LCD', link: '/labs-expert/labs-expert-sensors-ili9341-resistive' },
      { text: 'FW  - Driver', link: '/labs-expert/labs-expert-firmware-driver' },
      { text: 'FW  - DMA', link: '/labs-expert/labs-expert-firmware-dma-v3' }
    ]
  }
]

export default defineConfig({
  title: "Computação Embarcada",
  description: "Sistemas embarcados movem o mundo",
  base: "/site/",
  markdown: {
    math: true,
    config: (md) => {
      md.use(footnote)
      // Substitui {{variavel}} no texto Markdown antes de renderizar
      md.core.ruler.push('resolve_vars', (state) => {
        for (const token of state.tokens) {
          if (token.type === 'inline' && token.children) {
            for (const child of token.children) {
              if (child.type === 'text' || child.type === 'html_inline') {
                child.content = child.content.replace(/\{\{(\w+)\}\}/g, (_, key) =>
                  (links as Record<string, string>)[key] ?? `{{${key}}}`
                )
              }
            }
          }
        }
      })
    }
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: "/favicon.svg",
    search: {
      provider: 'local'
    },
    multiVersionBuild: {
      build: 'stable',
      match: /^v\d+(\.\d+)*$/,
      base: '/v/',
      satisfies: '*',
    },
    sponsors: {
      text: 'Rafael Corsi',
      link: 'https://github.com/rafaelcorsi',
      data: [
        {
          name: 'Insper',
          id: 'Insper',
          url: 'https://www.insper.edu.br/pt/home',
          logo: '/logo_2.svg',
          type: 'full'
        },
      ],
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Consulta', link: '/guides/', activeMatch: '/guides' },
      { text: 'Módulos', link: '/entregas/' }
    ],
    sidebar: {
      '/curso/': [
        {
          text: 'Sobre o curso',
          items: [
            { text: 'Sobre', link: '/curso/' },
            { text: 'Avaliacão', link: '/curso/avaliacao' },
          ]
        }
      ],
      // Todas as rotas abaixo compartilham o mesmo sidebar de módulos
      '/entregas/':   sidebarModulos,
      '/labs/':       sidebarModulos,
      '/labs-expert/': sidebarModulos,
      '/provas/':     sidebarModulos,
      '/guides/': [
        {
          text: 'Sistemas Embarcados',
          collapsed: false,
          items: [
            { text: 'Prototipando', link: '/guides/prototipando-index' },
            { text: 'Diagramas', link: '/diagram/' }
          ]
        },
        {
          text: 'Dispositivos',
          collapsed: false,
          items: [
	    { text: 'Buzzer', link: '/guides/dispositivos-buzzer' },
	    { text: 'Encoder', link: '/guides/dispositivos-encoder' },
	    { text: 'LCD', link: '/guides/lcd-ili-gfx' },
            { text: 'PicoDock', link: '/guides/picodock-index' }
            
            
          ]
        },
        {
          text: 'Qualidade de código',
          collapsed: false,
          items: [
            { text: 'Sobre', link: '/guides/qualidade-index' },
            { text: 'Regras', link: '/guides/qualidade-rules' },
            { text: 'Cppcheck', link: '/guides/qualidade-cppcheck' },
            { text: 'Variáveis', link: '/guides/qualidade-variables' },
            { text: 'ISR', link: '/guides/qualidade-isr-handler' },
            { text: 'RTOS', link: '/guides/qualidade-rtos' }
          ]
        },
        {
          text: 'RTOS',
          collapsed: false,
          items: [
            { text: 'Sobre', link: '/guides/freertos-basic' },
            { text: 'Tasks', link: '/guides/freertos-tasks' },
            { text: 'Delay', link: '/guides/freertos-vtaskDelay' },
            { text: 'Semaphore', link: '/guides/freertos-semaphore' },
            { text: 'Queue', link: '/guides/freertos-queue' },
            { text: 'Queue Structure', link: '/guides/freertos-queue-advanced' },
            { text: 'Timer', link: '/guides/freertos-software-time' },
            { text: 'Consultas', link: '/guides/freertos-snippets' }
          ]
        },
        {
          text: 'Pico',
          items: [
            { text: 'Pinout ', link: 'https://www.raspberrypi.com/documentation/microcontrollers/images/pico-pinout.svg' },
            { text: 'Pico 2', link: 'https://www.raspberrypi.com/products/raspberry-pi-pico-2/' },
            { text: 'RP2350', link: 'https://datasheets.raspberrypi.com/rp2350/rp2350-datasheet.pdf' },
            { text: 'SDK', link: 'https://www.raspberrypi.com/documentation/pico-sdk/index_doxygen.html' },
            { text: 'Programando  📀', link: '/guides/pico-debugging' },
            { text: 'Códigos Exemplos', link: '/guides/pico-examples' },
          ]
        },
        {
          text: 'Periféricos',
          collapsed: false,
          items: [
            { text: 'Delay', link: '/guides/pico-delay' },
            { text: 'GPIO', link: '/guides/pico-gpio' },
            { text: 'GPIO IRQ', link: '/guides/pico-gpio-irq' },
            { text: 'Timer', link: '/guides/pico-timer' },
            { text: 'RTC', link: '/guides/pico-rtc' },
            { text: 'Memória Flash', link: 'https://kevinboone.me/picoflash.html' },
            { text: 'ADC', link: '/guides/pico-adc' },
            { text: 'PWM', link: '/guides/pico-pwm' },
            { text: 'I2C', link: '/guides/pico-i2c' },
            { text: 'DMA', link: '/guides/pico-dma' },
            { text: 'UART', link: '/guides/pico-uart' },
            { text: 'WIFI', link: '/guides/pico-wifi' },
            { text: 'CORE', link: '/guides/pico-core' }
          ]
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/insper-embarcados' }
    ]
  },

  // Substitui {{variavel}} em todo o frontmatter de cada página
  transformPageData(pageData) {
    pageData.frontmatter = resolveVars(pageData.frontmatter) as typeof pageData.frontmatter
  },

})
