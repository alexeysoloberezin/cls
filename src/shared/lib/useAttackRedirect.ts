import { useRouter, useRoute } from 'vue-router'

export function useAttackRedirect() {
  const router = useRouter()
  const route = useRoute()

  function redirectWithAttackId(
    attackId: string,
    attackName: string,
    hasAttack?: boolean
  ) {
    localStorage.setItem('attack', attackId)
    localStorage.setItem('attackName', attackName)

    const params = { ...route.params }

    // 🔥 если URL уже содержит attackId — заменяем
    if (hasAttack && params.attackId) {
      params.attackId = attackId
    } else {
      // 🔥 если attackId нет — добавляем
      params.attackId = attackId
    }

    router.push({
      name: route.name as string,
      params,
      query: route.query,
      hash: route.hash,
    })
  }

  return { redirectWithAttackId }
}
