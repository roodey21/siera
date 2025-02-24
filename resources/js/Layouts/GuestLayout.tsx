import ApplicationLogo from '@/components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    );
}
