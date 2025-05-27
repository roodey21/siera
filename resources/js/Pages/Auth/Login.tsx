import Google from '@/components/icon/google';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleLoginWithGoogle = () => {
        window.location.href = '/auth/redirect';
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    value={data.email}
                                    autoComplete='username'
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && (<p className="text-[0.8rem] font-medium text-destructive">{errors.email}</p>)}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="inline-block ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    type='password'
                                    name='password'
                                    value={data.password}
                                    autoComplete='current-password'
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && (<p className="text-[0.8rem] font-medium text-destructive">{errors.password}</p>)}
                            </div>
                            <Button type="submit" className="w-full" disabled={processing}>
                                Login
                            </Button>
                            <div className="flex items-center gap-4">
                                <Separator className="flex-1" />
                                <span className="text-muted-foreground">or</span>
                                <Separator className="flex-1" />
                            </div>
                            <Button onClick={handleLoginWithGoogle} className="w-full text-white">
                                <Google />
                                Login With Google
                            </Button>
                        </div>
                        <div className="mt-4 text-sm text-center">
                            Don&apos;t have an account?{" "}
                            <Link href={route('register')} className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
