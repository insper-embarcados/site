import { defineConfig, type DefaultTheme } from 'vitepress'
import {defineConfig} from '@lando/vitepress-theme-default-plus/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Computação Embarcada",
  description: "Sistemas embarcados movem o mundo",
  base: "/site/",
  markdown: {
      math: true
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: "/favicon.svg",
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Consulta', link: '/consulta/' },
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
                { text: '1. GPIO', link: '/labs/gpio' },
          ]
        }

      ],
      '/consulta/': [
        {
          text: 'Pico',
          items: [
            { text: 'Sobre', link: '/consulta/' },
            { text: 'Pinout ', link: 'https://www.raspberrypi.com/documentation/microcontrollers/images/pico-pinout.svg' },
            { text: 'Pico 2', link: 'https://www.raspberrypi.com/products/raspberry-pi-pico-2/' },
            { text: 'RP2350', link: 'https://datasheets.raspberrypi.com/rp2350/rp2350-datasheet.pdf'},
            { text: 'SDK', link: 'https://www.raspberrypi.com/documentation/pico-sdk/index_doxygen.html' },
            { text: 'Programando  📀', link: '/consulta/pico-debugging' },
            { text: 'Códigos Exemplos', link: '/consulta/pico-examples' }
          ]
        },
        {
          text: 'Periféricos',
          items: [
            { text: 'Delay', link: '/consulta/delay' },
            { text: 'GPIO', link: '/consulta/gpio' },
            { text: 'GPIO IRQ', link: '/consulta/gpio-irq' },
            { text: 'Timer', link: '/consulta/timer' },
            { text: 'RTC', link: '/consulta/rtc' },
            { text: 'Memória Flash', link: 'https://kevinboone.me/picoflash.html'},
            { text: 'ADC', link: '/consulta/adc' },
            { text: 'PWM', link: '/consulta/pwm' },
            { text: 'I2C', link: '/consulta/i2c' },
            { text: 'DMA', link: '/consulta/dma' },
            { text: 'UART', link: '/consulta/uart' },
            { text: 'WIFI', link: '/consulta/pico-wifi' },
          ]
        },
        {
          text: 'Qualidade de código',
          items: [
            { text: 'Sobre', link: '/qualidade/' },
            { text: 'Regras', link: '/qualidade/rules' },
            { text: 'Cppcheck', link: '/qualidade/cppcheck' },
            { text: 'Variáveis', link: '/qualidade/variables' },
            { text: 'ISR', link: '/qualidade/isr-handler' }
          ]
        },
        {
          text: 'labs/gpio',
          items: [
            { text: 'Entrega', link: '/labs/gpio' },
            {
              text: 'Leitura',
              items: [
                { text: 'Rules', link: '/qualidade/rules' },
                { text: 'Cppcheck', link: '/qualidade/cppcheck' },
                { text: 'Variáveis', link: '/qualidade/variables' },
                { text: 'ISR', link: '/qualidade/isr-handler' }
              ]
            }
          ]
        }

      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/insper-embarcados' }
    ]
  }
})
