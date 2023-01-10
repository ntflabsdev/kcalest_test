import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import Home from './Home';
import SearchDisplay from '../../components/Display/SearchDisplay/SearchDisplay';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';

function mockFetch(data: any) {
    return jest.spyOn(window, 'fetch').mockResolvedValue(new Response(JSON.stringify(data)));
  }
  
  beforeEach(() => mockFetch([]));


test('page should have a title of Kcalest', async () => {
  const { findByText } = render(<Home />);
  await findByText('Kcalest');
});

