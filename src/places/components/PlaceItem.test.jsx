import React from 'react'
import { render, screen } from '@testing-library/react'
import PlaceItem from './PlaceItem'

test('renders content', () => {
  const place = {
    title: 'PlaceFront1',
    address: 'addrfront1',
    description: 'descfront1',
  }

  const { container } = render(
    <PlaceItem
      title={place.title}
      address={place.address}
      description={place.description}
    />
  )
  const element = screen.getByText('PlaceFront1')

  screen.debug(element)

  const div = container.querySelector('.place-item__content')
  expect(div).toHaveTextContent('PlaceFront1')
})
