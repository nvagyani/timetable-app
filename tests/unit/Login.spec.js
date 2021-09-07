import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
  let $router
  beforeEach(() => {
    $router = { push: jest.fn() }
  })
  it('Redirects to Timetable view', async () => {
    const email = 'test@email.com'
    const password = '111111'
    const wrapper = shallowMount(Login)
    await wrapper.setData({ email: email, password: password, valid: true })
    await wrapper.find('.login-btn').trigger('click')
    expect($router.push).toHaveBeenCalledWith({
        name: 'timetable'
    })
  })
  it('Disable Submit button when invalid data entered', async () => {
    const email = 'test@'
    const password = '111111'
    const wrapper = shallowMount(Login)
    await wrapper.setData({ email: email, password: password, valid: false })
    expect(wrapper.find('.login-btn').attributes('disabled')).toBeTruthy()
  })
})
