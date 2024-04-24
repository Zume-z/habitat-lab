import Link from 'next/link'
import { useRouter } from 'next/router'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'

export default function Nav({ title }: { title: string }) {
  const router = useRouter()

  const navigation = [
    { label: 'About', href: '/about', active: router.pathname === '/about' },
    { label: 'Projects', href: '/', active: router.pathname === '/' },
    { label: 'Contact', href: '/contact', active: router.pathname === '/contact' },
    { label: 'Gallery', href: '/gallery', active: router.pathname === '/gallery' },
  ]

  return (
    <div className="fixed z-50">
      <Disclosure as="nav" className="fixed z-10 w-full bg-black backdrop-blur-lg md:hidden">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  <Disclosure.Button className=" relative inline-flex items-center justify-center rounded-md p-2 text-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-stretch justify-center">
                  <div className="flex flex-shrink-0 items-center">
                    <div className="text-2xl text-white">{title}</div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className=" absolute  w-full border-t  border-gray-700 bg-black  backdrop-blur-md md:hidden">
              <div className="space-y-3 px-2 pb-3 pt-2 ">
                {navigation.map((el) => (
                  <Disclosure.Button
                    key={el.label}
                    as="a"
                    href={el.href}
                    className={`${el.active ? 'border-l border-gray-500 text-gray-500' : 'text-white  hover:text-white'} block  px-3 py-2 text-lg font-medium`}
                    aria-current={el.href ? 'page' : undefined}
                  >
                    {el.label}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className={`hidden flex-col space-y-2 pl-8 text-4xl md:block`}>
        {navigation.map((el) => (
          <div key={el.label} className="relative w-min">
            <Link href={el.href} className={`text-[40px] ${el.active ? ' text-gray-500 opacity-50' : 'menu-item'}`}>
              {el.label}
            </Link>
            <div className={`-mt-1.5 h-[2.5px] w-full ${el.active ? 'bg-gray-500 opacity-50' : 'bg-black'}`} />
          </div>
        ))}
        <div className="pt-1">
          <div className=" h-4 w-4 border border-black bg-black" />
        </div>
      </div>
    </div>
  )
}
