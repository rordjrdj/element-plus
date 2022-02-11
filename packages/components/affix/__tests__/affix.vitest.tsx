import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, spyOn } from 'vitest'
import { makeScroll } from '@element-plus/test-utils'
import Affix from '../src/affix.vue'
import type { VNode } from 'vue'

const AXIOM = 'Rem is the best girl'

const _mount = (renderFn: () => VNode) =>
  mount({ setup: () => renderFn }, { attachTo: document.body })

describe('Affix.vue', () => {
  it('render test', async () => {
    const wrapper = _mount(() => <Affix>{AXIOM}</Affix>)
    await nextTick()
    expect(wrapper.text()).toEqual(AXIOM)
    const mockAffixRect = spyOn(
      wrapper.find('.el-affix').element,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 40,
      width: 1000,
      top: -100,
      bottom: -80,
    } as DOMRect)

    const mockDocumentRect = spyOn(
      document.documentElement,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 200,
      width: 1000,
      top: 0,
      bottom: 200,
    } as DOMRect)

    expect(wrapper.find('.el-affix--fixed').exists()).toBe(false)

    await makeScroll(document.documentElement, 'scrollTop', 200)
    expect(wrapper.find('.el-affix--fixed').exists()).toBe(true)
    mockAffixRect.mockRestore()
    mockDocumentRect.mockRestore()
  })

  it('should render offset props', async () => {
    const wrapper = _mount(() => <Affix offset={30}>{AXIOM}</Affix>)
    await nextTick()
    const mockAffixRect = spyOn(
      wrapper.find('.el-affix').element,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 40,
      width: 1000,
      top: -100,
      bottom: -80,
    } as DOMRect)
    const mockDocumentRect = spyOn(
      document.documentElement,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 200,
      width: 1000,
      top: 0,
      bottom: 200,
    } as DOMRect)
    await makeScroll(document.documentElement, 'scrollTop', 200)
    expect(wrapper.find('.el-affix--fixed').exists()).toBe(true)
    expect(wrapper.find('.el-affix--fixed').attributes('style')).toContain(
      'top: 30px;'
    )
    mockAffixRect.mockRestore()
    mockDocumentRect.mockRestore()
  })

  it('should render position props', async () => {
    const wrapper = _mount(() => (
      <Affix position="bottom" offset={20}>
        {AXIOM}
      </Affix>
    ))
    await nextTick()
    const mockAffixRect = spyOn(
      wrapper.find('.el-affix').element,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 40,
      width: 1000,
      top: 2000,
      bottom: 2040,
    } as DOMRect)
    const mockDocumentRect = spyOn(
      document.documentElement,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 200,
      width: 1000,
      top: 0,
      bottom: 200,
    } as DOMRect)
    await makeScroll(document.documentElement, 'scrollTop', 0)
    expect(wrapper.find('.el-affix--fixed').exists()).toBe(true)
    expect(wrapper.find('.el-affix--fixed').attributes('style')).toContain(
      'bottom: 20px;'
    )
    mockAffixRect.mockRestore()
    mockDocumentRect.mockRestore()
  })

  it('should render target props', async () => {
    const wrapper = _mount(() => (
      <>
        <div class="target" style="height: 200px">
          <Affix target=".target">{AXIOM}</Affix>
        </div>
        <div style="height: 1000px"></div>
      </>
    ))
    await nextTick()
    const mockAffixRect = spyOn(
      wrapper.find('.el-affix').element,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 40,
      width: 1000,
      top: -100,
      bottom: -60,
    } as DOMRect)
    const mockTargetRect = spyOn(
      wrapper.find('.target').element,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 200,
      width: 1000,
      top: -100,
      bottom: 100,
    } as DOMRect)
    await makeScroll(document.documentElement, 'scrollTop', 100)
    expect(wrapper.find('.el-affix--fixed').exists()).toBe(true)
    mockAffixRect.mockReturnValue({
      height: 40,
      width: 1000,
      top: -300,
      bottom: -260,
    } as DOMRect)
    mockTargetRect.mockReturnValue({
      height: 40,
      width: 1000,
      top: -300,
      bottom: -260,
    } as DOMRect)
    await makeScroll(document.documentElement, 'scrollTop', 300)
    expect(wrapper.find('.el-affix--fixed').exists()).toBe(false)
    mockAffixRect.mockRestore()
    mockTargetRect.mockRestore()
  })

  it('should render z-index props', async () => {
    const wrapper = _mount(() => <Affix zIndex={1000}>{AXIOM}</Affix>)
    await nextTick()
    const mockAffixRect = spyOn(
      wrapper.find('.el-affix').element,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 40,
      width: 1000,
      top: -100,
      bottom: -80,
    } as DOMRect)
    const mockDocumentRect = spyOn(
      document.documentElement,
      'getBoundingClientRect'
    ).mockReturnValue({
      height: 200,
      width: 1000,
      top: 0,
      bottom: 200,
    } as DOMRect)
    await makeScroll(document.documentElement, 'scrollTop', 200)
    expect(wrapper.find('.el-affix--fixed').exists()).toBe(true)
    expect(wrapper.find('.el-affix--fixed').attributes('style')).toContain(
      'z-index: 1000;'
    )
    mockAffixRect.mockRestore()
    mockDocumentRect.mockRestore()
  })
})