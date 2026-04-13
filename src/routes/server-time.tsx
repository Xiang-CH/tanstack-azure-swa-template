import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useEffect, useRef, useState } from 'react'

const getGreetingWithTime = createServerFn({ method: 'POST' }).handler(
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
  const [errorToast, setErrorToast] = useState<string | null>(null)
  const dismissTimerRef = useRef<number | null>(null)

  function showErrorToast(message: string) {
    setErrorToast(message)
    if (dismissTimerRef.current !== null) {
      window.clearTimeout(dismissTimerRef.current)
    }
    dismissTimerRef.current = window.setTimeout(() => {
      setErrorToast(null)
      dismissTimerRef.current = null
    }, 3500)
  }

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current !== null) {
        window.clearTimeout(dismissTimerRef.current)
      }
    }
  }, [])

  async function handleRefetch() {
    setIsRefetching(true)
    try {
      const nextGreeting = await getGreetingWithTime()
      setGreeting(nextGreeting)
    } catch {
      showErrorToast('Failed to refresh greeting. Please try again.')
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

      {errorToast ? (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed right-4 top-20 z-50 max-w-sm rounded-xl border border-[rgba(168,67,50,0.35)] bg-[rgba(120,35,28,0.94)] px-4 py-3 text-sm text-white shadow-[0_14px_30px_rgba(44,10,8,0.32)]"
        >
          <div className="flex items-start gap-3">
            <p className="m-0 flex-1 leading-6">{errorToast}</p>
            <button
              type="button"
              onClick={() => setErrorToast(null)}
              className="rounded-md px-2 py-0.5 text-white/90 transition hover:bg-white/12"
              aria-label="Dismiss error toast"
            >
              x
            </button>
          </div>
        </div>
      ) : null}
    </main>
  )
}