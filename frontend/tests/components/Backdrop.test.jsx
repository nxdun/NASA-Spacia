import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Backdrop from '../../src/components/common/backdrop'
import App from '../../src/App'
describe('Backdrop', () => {
  it('render backdrop when application started', () => {
      //run application
        render(<App/>)
        //check if backdrop is rendered
        expect(screen.getByTestId('backdrop')).toBeInTheDocument()
      })
  
})