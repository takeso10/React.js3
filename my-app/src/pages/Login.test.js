import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Test',()=>{
    test('renders input email',()=>{
        render(<Login/>);
        const inputEmailElement = screen.getByPlaceholderText('email')
        expect(inputEmailElement).toBeInTheDocument();
    })
    
    test('renders input password',()=>{
        render(<Login/>);
        const inputPasswordElement = screen.getByPlaceholderText('password')
        expect(inputPasswordElement).toBeInTheDocument();
    })
    
    test('renders label',()=>{
        render(<Login/>);
        const labelEmailElement = screen.getByLabelText('メールアドレス')
        const labelPasswordElement = screen.getByLabelText('パスワード')
        expect(labelEmailElement).toBeInTheDocument();
        expect(labelPasswordElement).toBeInTheDocument();
    })
    
    test('renders button',()=>{
        render(<Login/>);
        const inputElement = screen.getByRole('button')
        expect(inputElement).toBeInTheDocument();
    })
})
