import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SortingTypeMenu } from './sorting-type-menu.tsx';
import { withStore } from '../../utils/component-mocks.tsx';
import { makeStore } from '../../utils/mocks.ts';
import { SortingType } from '../../enums/sorting-type.ts';
import { switchSortingType } from '../../store/offers/offers-slice.ts';

describe('Component: SortingTypeMenu', () => {
  it('should open menu and display all sorting options when caption is clicked', async () => {
    const { withStoreComponent } = withStore(
      <SortingTypeMenu />,
      makeStore()
    );

    render(withStoreComponent);
    const caption = screen.getByTestId('sorting-caption');
    await userEvent.click(caption);

    Object.values(SortingType).forEach((type) => {
      const elements = screen.getAllByText(type);
      const isPresentInList = elements.some((el) => el.tagName === 'LI');
      expect(isPresentInList).toBe(true);
    });
  });

  it('should dispatch switchSortingType action when sorting option is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <SortingTypeMenu />,
      makeStore()
    );

    render(withStoreComponent);
    const caption = screen.getByTestId('sorting-caption');
    const option = screen.getByText(SortingType.PriceLowToHigh);
    await userEvent.click(caption);
    await userEvent.click(option);

    const actions = mockStore.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe(switchSortingType.type);
    expect(actions[0].payload).toBe(SortingType.PriceLowToHigh);
  });
});
