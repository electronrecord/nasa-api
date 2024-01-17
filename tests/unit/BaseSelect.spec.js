import { mount } from '@vue/test-utils';
import BaseSelector from '../../src/components/BaseSelect.vue';

describe('BaseSelector', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseSelector, {
      props: {
        cy: 'my-selector',
        id: 'selector-id',
        name: 'selector-name',
        label: 'My Selector',
        value: 'default-value',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    });

    const label = wrapper.find('.base-selector');
    const labelText = wrapper.find('.base-selector span');
    const select = wrapper.find('.base-selector select');

    expect(label.exists()).toBe(true);
    expect(labelText.text()).toBe('My Selector:');

    expect(select.exists()).toBe(true);
  });

  it('emits change event when selecting an option', async () => {
    const wrapper = mount(BaseSelector, {
      props: {
        cy: 'my-selector',
        id: 'selector-id',
        name: 'selector-name',
        label: 'My Selector',
        value: 'default-value',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    });

    await wrapper.find('.base-selector select').setValue('Option 2');

    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0][0]).toEqual({ name: 'selector-name', value: 'Option 2' });
  });
});
