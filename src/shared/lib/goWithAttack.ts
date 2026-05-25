import type { SidebarItem } from '@shared/types/sidebar'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export function useAttackNavigation() {
    const route = useRoute()
    const router = useRouter()

    const attackId = computed(() => {
        return route.params.attackId ? String(route.params.attackId) : null
    })

    function navigate(item: SidebarItem) {
        if(item.isSecondPage) {
            if(attackId.value) {
                router.push({
                    name: item.url,
                    params: {
                        attackId: attackId.value
                    }
                })
            }else{
                router.push({
                    name: 'attack-not-selected',
                    params: {
                        name: item.url
                    }
                })
            }

        }else{
            router.push(item.url)
        }
    }

    return {
        attackId,
        navigate
    }
}
