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
      {
        text: 'Consulta',
        link: '/guides/',
        activeMatch: '/guides',
      },
      { text: 'Entregas', link: '/entregas/' },
    ],
    sidebar: {
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
                { text: 'Preparatório', link: '/labs/timer-pre' }
              ]
            }
          ]
       },
       {
          text: 'APS',
          items: [
            { text: '1. Genius', link: '/entregas/aps-1-genius'}
          ]
        }
      ],
      '/guides/': [
        {
          text: 'Pico',
          items: [
            { text: 'Pinout ', link: 'https://www.raspberrypi.com/documentation/microcontrollers/images/pico-pinout.svg' },
            { text: 'Pico 2', link: 'https://www.raspberrypi.com/products/raspberry-pi-pico-2/' },
            { text: 'RP2350', link: 'https://datasheets.raspberrypi.com/rp2350/rp2350-datasheet.pdf' },
            { text: 'SDK', link: 'https://www.raspberrypi.com/documentation/pico-sdk/index_doxygen.html' },
            { text: 'Programando  📀', link: '/guides/pico-debugging' },
            { text: 'Códigos Exemplos', link: '/guides/pico-examples' }
          ]
        },
        {
          text: 'Dispositivos',
          collapsed: false,
          items: [
            { text: 'Buzzer', link: '/guides/dispositivos-buzzer' }
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
        {
          text: 'Qualidade de código',
          collapsed: false,
          items: [
            { text: 'Sobre', link: '/guides/qualidade-index' },
            { text: 'Regras', link: '/guides/qualidade-rules' },
            { text: 'Cppcheck', link: '/guides/qualidade-cppcheck' },
            { text: 'Variáveis', link: '/guides/qualidade-variables' },
            { text: 'ISR', link: '/guides/qualidade-isr-handler' }
          ]
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/insper-embarcados' }
    ]
  },


})


