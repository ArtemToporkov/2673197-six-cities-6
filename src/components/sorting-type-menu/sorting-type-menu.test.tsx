import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SortingTypeMenu } from './sorting-type-menu.tsx';
import { withStore } from '../../utils/component-mocks.tsx';
import { makeStore } from '../../utils/mocks.ts';
import { SortingType } from '../../enums/sorting-type.ts';
import { switchSortingType } from '../../store/offers/offers-slice.ts';

describe('Component: SortingTypeMenu', () => {
  it('should open menu on click and dispatch switchSortingType on option click', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <SortingTypeMenu />,
      makeStore()
    );

    render(withStoreComponent);

    const caption = screen.getByText(SortingType.Popular);
    await userEvent.click(caption);

    const lowToHighOption = screen.getByText(SortingType.PriceLowToHigh);
    await userEvent.click(lowToHighOption);

    const actions = mockStore.getActions();

    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe(switchSortingType.type);
    expect(actions[0].payload).toBe(SortingType.PriceLowToHigh);
  });
});
