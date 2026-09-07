// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ProjectFilter from '~/components/portfolio/ProjectFilter.vue'

describe('ProjectFilter, aturan render', () => {
  it('0 kategori → komponen tidak merender apa pun', async () => {
    const wrapper = await mountSuspended(ProjectFilter, {
      props: { categories: [], modelValue: 'all' },
    })
    expect(wrapper.find('[role="group"]').exists()).toBe(false)
    expect(wrapper.findAll('button')).toHaveLength(0)
  })

  it('1 kategori → komponen tidak merender apa pun', async () => {
    const wrapper = await mountSuspended(ProjectFilter, {
      props: { categories: ['WEB'], modelValue: 'all' },
    })
    expect(wrapper.find('[role="group"]').exists()).toBe(false)
    expect(wrapper.findAll('button')).toHaveLength(0)
  })

  it('≥2 kategori → chip "Semua" + satu chip per kategori', async () => {
    const wrapper = await mountSuspended(ProjectFilter, {
      props: { categories: ['WEB', 'MOBILE'], modelValue: 'all' },
    })
    expect(wrapper.find('[role="group"]').exists()).toBe(true)
    // 1 tombol "all" + 2 kategori
    expect(wrapper.findAll('button')).toHaveLength(3)
  })

  it('memilih kategori meng-emit update:modelValue', async () => {
    const wrapper = await mountSuspended(ProjectFilter, {
      props: { categories: ['WEB', 'MOBILE', 'DATA'], modelValue: 'all' },
    })
    expect(wrapper.findAll('button')).toHaveLength(4)
    await wrapper.findAll('button')[1]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['WEB'])
  })
})
