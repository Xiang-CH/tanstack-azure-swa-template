import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'

const getGreetingWithTime = createServerFn({ method: 'GET' }).handler(
  async () => {
    const now = new Date().toLocaleTimeString()
    return `Hello from the server! Current time: ${now}`
  },
)

export const Route = createFileRoute('/server-time')({
  loader: async () => getGreetingWithTime(),
  component: ServerTimePage,
})

function ServerTimePage() {
  const initialGreeting = Route.useLoaderData()
  const [greeting, setGreeting] = useState(initialGreeting)
  const [isRefetching, setIsRefetching] = useState(false)

  async function handleRefetch() {
    setIsRefetching(true)
    try {
      const nextGreeting = await getGreetingWithTime()
      setGreeting(nextGreeting)
    } finally {
      setIsRefetching(false)
    }
  }

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Server Function</p>
        <h1 className="display-title mb-3 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl">
          Minimal server greeting
        </h1>
        <p className="m-0 text-base text-[var(--sea-ink-soft)]">{greeting}</p>
        <button
          type="button"
          onClick={handleRefetch}
          disabled={isRefetching}
          className="mt-4 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRefetching ? 'Refetching...' : 'Refetch From Server'}
        </button>
      </section>
    </main>
  )
}