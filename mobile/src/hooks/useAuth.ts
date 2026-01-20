import { useEffect, useState } from "react"
import { getToken } from "../cache/authStorage"

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuth] = useState(false)

  useEffect(() => {
    getToken().then((token) => {
      setAuth(!!token)
      setLoading(false)
    })
  }, [])

  return { loading, authenticated }
}