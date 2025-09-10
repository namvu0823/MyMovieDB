
import Trending from "../../components/ui/Trending";
import Main_Banner from "../../components/ui/main_banner";
import Trailers from "../../components/ui/Trailers";
import Popular from "../../components/ui/popular";


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col ">
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
