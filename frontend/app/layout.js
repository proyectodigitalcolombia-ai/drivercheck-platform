export const metadata = {
  title: "DriverCheck Platform",
  description: "Driver verification platform"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
