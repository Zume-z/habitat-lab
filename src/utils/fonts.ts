import localFont from 'next/font/local'

export const proxima = localFont({
  src: [
    {
      path: '../assets/ProximaNovaRegular.otf',
    },
  ],
  variable: '--font-proxima-nova',
})

export const proximaSB = localFont({
  src: [
    {
      path: '../assets/ProximaNovaSemiBold.otf',
    },
  ],
  variable: '--font-proxima-nova',
})
