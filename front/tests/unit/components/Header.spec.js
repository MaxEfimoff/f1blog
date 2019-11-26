import Header from '@/components/Header.vue';
import store from '@/store';
import router from '@/router';
import { shallowMount } from '@vue/test-utils';

describe('components/Header.vue', () => {
  it('should render', () => {
    const wrapper = shallowMount(Header, {
      router,
      store
    })
    expect(wrapper.exists()).toBe(true);
  })
})