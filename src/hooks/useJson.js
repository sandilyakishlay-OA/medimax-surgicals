import { useEffect, useState } from 'react'
import { asset } from '../utils/paths.js'

export function useJson(path) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(asset(path))
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`)
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [path])

  return { data, loading, error }
}
