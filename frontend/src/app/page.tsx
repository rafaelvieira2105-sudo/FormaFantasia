import Header from "@/components/Header"
import Hero from "@/components/Hero"
import CategoriasDestaque from "@/components/CategoriasDestaque"
import Destaque from "@/components/Destaque"
import Valores from "@/components/Valores"
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/Footer"

export default function Home(){
    return(
      <main>
        <Hero />
        <CategoriasDestaque />
        <Destaque />
        <Valores />
        <Newsletter />
        <Footer />
      </main>
    )
}