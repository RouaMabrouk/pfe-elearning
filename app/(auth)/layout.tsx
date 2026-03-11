export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-violet-100">
            {/* Ambient blobs */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-200/40 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-violet-200/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-pink-200/30 blur-[100px] pointer-events-none" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md px-4">
                {children}
            </div>
        </div>
    );
}

