import { PropsWithChildren } from 'react';
import App from '../App';

const BlankLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <main className="min-h-screen">{children} </main>
        </App>
    );
};

export default BlankLayout;
