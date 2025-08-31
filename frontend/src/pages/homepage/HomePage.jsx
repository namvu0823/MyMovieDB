import Header from "../../components/header/Header";
import Trending from "../../components/trending/trending";
import Main_Banner from "../../components/main_banner/main_banner";
import Trailers from "../../components/trailers/Trailers";
import Popular from "../../components/popular/popular";
import SearchBar from "../../components/common/SearchBar";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header/>
      <SearchBar/>
      <div id="main" class=" flex-col  justify-center">
        <section class="w-full h-80 ">
          <Main_Banner/>
        </section>
        <section class="w-full h-[432px] bg-white justify-items-center">
          <Trending/>
        </section>
        <section class="w-full h-96  ">
          <Trailers/>
        </section>
        <section class="w-full h-[432px] justify-items-center">
          <Popular/>
        </section>
      </div>
    </div>
  );
}
