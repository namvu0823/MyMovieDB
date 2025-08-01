import Header from "../../components/header/Header";
import banner from "../../assets/main_banner.jpg";
import Trending from "../../components/trending/trending";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header/>
      <div class="w-full h-12 bg-white"></div>
      <div id="main" class=" flex-col  justify-center">
        <section id="main_banner" class="relative w-full h-80 ">

          <img src={banner} class="w-full h-full object-cover object-center grayscale brightness-110 mix-blend-multiply "/>
          <div class="absolute inset-0 bg-blue-500 mix-blend-multiply brightness-[170%] z-0"></div>

          <div class="absolute inset-0 px-40 pt-10">

            <h2 class=" text-white text-[45px]  font-bold z-10">Welcome.</h2>
            <h3 class=" text-white text-3xl  font-semibold z-10">Millions of movies, TV shows and people to discover. Explore now.</h3>
            <div class=" mt-14 rounded-sm relative ">
              <input id=" inner_search" type="text" spellCheck="false" class=" w-full h-12 px-5 text-[18px] bg-white rounded-3xl placeholder:text-gray-700 focus:outline-none " placeholder="Search for a movie, tv show, person......"></input>
              <button class=" absolute top-1/2 right-[2px] -translate-y-1/2  h-11 w-24 bg-gradient-to-r from-teal-300 to-cyan-500 rounded-full shadow text-[18px] text-white hover:text-black "> Search</button>
            </div>
           
          </div>
        
        </section>
        <section class="w-full h-[432px] bg-white justify-items-center">
          <Trending/>
        </section>
        <section class="w-full h-80 bg-slate-800">

        </section>
        <section class="w-full h-80 bg-green-800">

        </section>
      </div>
    </div>
  );
}
