import { defineConfig, type DefaultTheme } from 'vitepress'
import { defineConfig } from '@lando/vitepress-theme-default-plus/config'

export default defineConfig({
  title: "Computação Embarcada",
  description: "Sistemas embarcados movem o mundo",
  base: "/site/",
  markdown: {
    math: true,
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: "/favicon.svg",
    search: {
      provider: 'local'
    },
    sponsors: {
      text: 'Rafael Corsi - Professor',
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
      { text: 'Consulta', link: '/guides/', activeMatch: '/guides'},
      { text: 'Entregas', link: '/entregas/' }
    ],
    sidebar: {
      '/curso/': [
      {
      text: 'Sobre o curso',
           items: [
              {text: 'Sobre', link: '/curso/'},
              {text: 'Avaliacão', link: '/curso/avaliacao'},
           ]
      }
      ],
      '/entregas/': [
        {
          text: 'Entregas',
          items: [
            { text: 'Sobre', link: '/entregas/' },
            { text: 'Preparatório', link: '/labs/preparatorio' },
            { text: 'Prático', link: '/labs/pratico' },
          ]
        },
        {
          text: 'Laboratórios',
          items: [
            {
              text: '1. GPIO',
              collapsed: true,
              items: [
                { text: 'Preparatório', link: '/labs/gpio-pre' },
                { text: 'Prático', link: '/labs/gpio-pra' }
              ]
            },
            {
              text: '2. IRQ',
              collapsed: true,
              items: [
                { text: 'Preparatório', link: '/labs/irq-pre' },
                { text: 'Prático', link: '/labs/irq-pra' }
              ]
            },
            {
              text: '3. Timer',
              collapsed: true,
              items: [
                { text: 'Preparatório', link: '/labs/timer-pre' },
                { text: 'Prático', link: '/labs/timer-pra' }
              ]
            },
            {
              text: '4. RTOS',
              collapsed: true,
              items: [
                { text: 'Preparatório', link: '/labs/rtos-pre' },
                { text: 'Prático', link: '/labs/rtos-pra' }
              ]
            },
            {
              text: '5. ADC e PWM',
              collapsed: true,
              items: [
                { text: 'Preparatório', link: '/labs/adc-pwm-pre' },
                { text: 'Prático', link: '/labs/adc-pwm-pra' }
              ]
            },
            {
              text: '6. i2c',
              collapsed: true,
              items: [
                { text: 'Preparatório', link: '/labs/i2c-pre' },
                { text: 'Prático', link: '/labs/i2c-pra' }
              ]
            },
            {
              text: '7. Diagramas',
              collapsed: false,
              items: [
                { text: 'Preparatório', link: '/labs/diagrama-pre' },
                { text: 'Prático', link: 'https://us.prairielearn.com/pl/course_instance/188020/assessment/2601077' }
              ]
            }

          ]
       },
       {
          text: 'APS',
          items: [
            { text: '1. Genius', link: '/entregas/aps-1-genius'},
            { text: '2. Controle', link: '/entregas/aps-2-controle'}
          ]
        },
       {
          text: 'Labs expert',
          items: [
            { text: 'Sobre', link: '/labs-expert/index'},
            { text: '1. COM - Wifi', link: '/labs-expert/labs-expert-com-wifi-mqtt'},
            { text: '2. COM - BLT', link: '/labs-expert/labs-expert-com-bt-v2'},
            { text: '1. DSP - Áudio', link: '/labs-expert/labs-expert-dsp-audio'},
            { text: '2. DSP - AI', link: '/labs-expert/labs-expert-dsp-ia-v2'},
            { text: '1. SEN - PanTilt', link: '/labs-expert/labs-expert-sensors-servomotor'},
            { text: '2. SEN - LCD', link: '/labs-expert/labs-expert-sensors-ili9341-resistive'},
            { text: '1. FW  - Driver', link: '/labs-expert/labs-expert-firmware-driver'},
            { text: '2. FW  - DMA', link: '/labs-expert/labs-expert-firmware-dma-v3'}
          ]
        }
      ],
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
            { text: 'PicoDock', link: '/guides/picodock-index' },
            { text: 'Buzzer', link: '/guides/dispositivos-buzzer' }
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
          ]
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/insper-embarcados' }
    ]
  },


})


