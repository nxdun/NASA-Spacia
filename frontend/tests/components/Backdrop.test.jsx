import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import AuthChecker from 'src/services/authChecker'

describe('Backdrop', () => {
  it('render backdrop when proceed to userspace', () => {
      //fake token
      localStorage.setItem('token', 'token')
        render(<AuthChecker><userSpace /></AuthChecker>)
        //check if backdrop is rendered
        expect(screen.getByTestId('backdrop')).toBeTruthy()
      })

  
    
})