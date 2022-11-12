import { goToLoginPage } from './coordinator'

export const protectedPage = (navigate) => {
    const token = localStorage.getItem('token')
    if (!token){
      goToLoginPage(navigate)
    }
}

