import MainNav from "@/components/admin/main-nav";
import Footer from "@/components/footer";

export default function AdminLayout({children}:{children:React.ReactNode}){
    return (
    <html lang="en">
      <body>
       <MainNav/>
        {children}
        </body>
      <Footer/>
    </html>
    )

}