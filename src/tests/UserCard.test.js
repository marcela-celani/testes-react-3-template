import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserCard from '../components/UserCard';

jest.mock('axios'); // módulo inteiro mockado

//tem que descobrir o que o axios retorna, la no componente onde tem o data, colocar console.log
const axiosResponseMock = {
    data: {
      firstName: "Fulano",
      lastName: "Da Silva",
      bank: {
        cardNumber: "3589640949470047",
        cardExpire: "01/25"
      }
    }
  }
  
  describe("UserCard unit test", () => {
  
    beforeEach(() => {
      axios.mockReset()
    })
  
    test("Should render with loading message", async () => {
      axios.get.mockResolvedValueOnce(axiosResponseMock)
  
      render(<UserCard />)
  
      screen.getByText(/loading\.\.\./i)
      expect(screen.queryByText(/fulano/i)).not.toBeInTheDocument()
  
      await waitFor(() => {})
    })
  
    test("Should render card with data", async () => {
      axios.get.mockResolvedValueOnce(axiosResponseMock)
  
      render(<UserCard />)
  
      await waitFor(() => {
        screen.getByText(/fulano da silva/i)
  
        screen.getByText(/3589 6409 4947 0047/i)
  
        screen.getByText(/01\/25/i)
      })
    })
  })