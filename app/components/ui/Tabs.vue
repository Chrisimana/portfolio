<script lang="ts">
export interface TabItem {
  id: string
  label: string
}
</script>

<script setup lang="ts">
// Komponen ini hanya merender apa yang diberikan — aturan "satu kategori = tanpa tab" ditangani pemanggil.
const { tabs } = defineProps<{ tabs: TabItem[] }>()
const active = defineModel<string>({ required: true })

const uid = useId()
const tabRefs = ref<HTMLButtonElement[]>([])

function onKeydown(event: KeyboardEvent, index: number): void {
  const last = tabs.length - 1
  let next = index

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      next = index === last ? 0 : index + 1
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      next = index === 0 ? last : index - 1
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = last
      break
    default:
      return
  }

  event.preventDefault()
  const target = tabs[next]
  if (target) {
    active.value = target.id
    tabRefs.value[next]?.focus()
  }
}
</script>

<template>
  <div>
    <div
      role="tablist"
      class="flex gap-1 overflow-x-auto border-b border-border"
    >
      <button
        v-for="(tab, i) in tabs"
        :id="`${uid}-tab-${tab.id}`"
        :key="tab.id"
        ref="tabRefs"
        role="tab"
        type="button"
        :aria-selected="active === tab.id"
        :aria-controls="`${uid}-panel-${tab.id}`"
        :tabindex="active === tab.id ? 0 : -1"
        class="relative -mb-px shrink-0 px-3 py-2 text-sm font-medium transition-colors duration-150"
        :class="active === tab.id ? 'text-fg' : 'text-fg-subtle hover:text-fg-muted'"
        @click="active = tab.id"
        @keydown="onKeydown($event, i)"
      >
        {{ tab.label }}
        <span
          class="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent transition-opacity duration-150"
          :class="active === tab.id ? 'opacity-100' : 'opacity-0'"
        />
      </button>
    </div>

    <div
      v-for="tab in tabs"
      v-show="active === tab.id"
      :id="`${uid}-panel-${tab.id}`"
      :key="tab.id"
      role="tabpanel"
      :aria-labelledby="`${uid}-tab-${tab.id}`"
      tabindex="0"
      class="pt-6"
    >
      <slot
        :name="tab.id"
        :active="active === tab.id"
      />
    </div>
  </div>
</template>
