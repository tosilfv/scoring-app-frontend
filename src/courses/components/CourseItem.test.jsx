import React from 'react'
import { render, screen } from '@testing-library/react'
import CourseItem from './CourseItem'

test('renders content', () => {
  const course = {
    title: 'CourseFront1',
    description: 'descfront1',
    labs: [{ name: 'labfront1', password: '123' }],
  }

  const { container } = render(
    <CourseItem
      title={course.title}
      description={course.description}
      labs={course.labs}
    />
  )
  const element = screen.getByText('CourseFront1')

  screen.debug(element)

  const div = container.querySelector('.course-item__content')
  expect(div).toHaveTextContent('CourseFront1')
})
