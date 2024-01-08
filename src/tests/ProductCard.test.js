import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

jest.mock('axios'); // módulo inteiro mockado

const axiosResponseMock = {
    data: {
      id: 1,
      title: "Mouse gamer",
      description: "Melhor mouse gamer do mercado",
      price: 50,
      thumbnail: "https://picsum.photos/200"
    }
  }
  
  describe("ProductCard unit test", () => {
  
    beforeEach(() => {
      axios.mockReset()
    })
  
    test("Should render with loading message", async () => {
      axios.get.mockResolvedValueOnce(axiosResponseMock)
  
      render(<ProductCard />)
  
      screen.getByText(/loading\.\.\./i)
      expect(screen.queryByText(/mouse gamer/i)).not.toBeInTheDocument()
  
      await waitFor(() => {})
    })
  
    test("Should render card with data", async () => {
      axios.get.mockResolvedValueOnce(axiosResponseMock)
  
      render(<ProductCard />)
  
      await waitFor(() => {
        screen.getByRole('heading', {
          name: /mouse gamer/i
        })
  
        screen.getByRole('img', {
          name: /thumbnail for mouse gamer/i
        })
  
        screen.getByText(/melhor mouse gamer do mercado/i)
  
        screen.getByText(/\$50/i)
      })
    })
  })