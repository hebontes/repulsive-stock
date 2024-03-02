import PurchaseTable from '@/components/PurchaseTable'
import Image from 'next/image'
const stocksTicker = 'NVDA'

async function getData() {
  const timespan = 'month'
  const from = '2022-04-20' // YYYY-MM-DD
  const to = '2024-03-01' // YYYY-MM-DD
  const limit = 1000
  const res = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/fixed/1/${timespan}/${from}/${to}?limit=${limit}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer LgHVznvAwUgZKq8RHJQMXnQBVyLCAsB_',
      },
    }
  )
  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Stock Name - {stocksTicker}
          </p>
          <p className="mt-4 fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Everyday Payment = $30
          </p>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <PurchaseTable results={data.results} />
      </div>
    </main>
  )
}
