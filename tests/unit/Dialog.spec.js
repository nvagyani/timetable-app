import { shallowMount } from '@vue/test-utils'
import Dialog from '@/components/Dialog.vue'

describe('Dialog.vue', () => {
  let $router
  beforeEach(() => {
    $router = { push: jest.fn() }
  })
  it('Display dialog', async () => {
    const wrapper = shallowMount(Dialog, {
        computed: {
            show: true
        }
    })
    expect(wrapper.find('#DialogComponent')).toBeTruthy()
  })
  it('Display dialog title', async () => {
    const wrapper = shallowMount(Dialog, {
        computed: {
            show: true
        },
        propsData: {
          title: 'Dialog title'
        }
    })
    expect(wrapper.find('.title').text()).toBe('Dialog title')
  })
})
