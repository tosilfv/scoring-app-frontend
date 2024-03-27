import React from 'react'
import { render, screen } from '@testing-library/react'
import CourseItem from './CourseItem'

test('renders content', () => {
  const course = {
    title: 'CourseFront1',
    address: 'addrfront1',
    description: 'descfront1',
  }

  const { container } = render(
    <CourseItem
      title={course.title}
      address={course.address}
      description={course.description}
    />
  )
  const element = screen.getByText('CourseFront1')

  screen.debug(element)

  const div = container.querySelector('.course-item__content')
  expect(div).toHaveTextContent('CourseFront1')
})
