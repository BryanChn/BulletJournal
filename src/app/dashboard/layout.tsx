export default function DashbordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>layout dashboard</h1>
            {children}
        </div>
    );
}
