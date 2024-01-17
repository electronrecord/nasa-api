import { mount } from '@vue/test-utils';
import BasePagination from '../../src/components/BasePagination.vue';

describe('BasePagination', () => {
  it('renders correctly', () => {
    const wrapper = mount(BasePagination, {
      props: {
        page: 1,
        total: 10,
      },
    });

    // Add your assertions based on the component's behavior

    // Example: Check if the buttons are rendered
    expect(wrapper.find('[cy="prev-page"]').exists()).toBe(true);
    expect(wrapper.find('[cy="next-page"]').exists()).toBe(true);
  });

  it('emits change event when clicking next page', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        page: 1,
        total: 10,
      },
    });

    // Click the next page button
    await wrapper.find('[cy="next-page"]').trigger('click');

    // Check if the 'change' event was emitted with the expected payload
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0][0]).toEqual({ action: 'next' });
  });

  it('emits change event when clicking previous page', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        page: 2,
        total: 10,
      },
    });

    // Click the previous page button
    await wrapper.find('[cy="prev-page"]').trigger('click');

    // Check if the 'change' event was emitted with the expected payload
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0][0]).toEqual({ action: 'back' });
  });
});
