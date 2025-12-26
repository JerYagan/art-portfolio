import CharacterHero from "./components/CharacterHero";
import InfoCard from "./components/InfoCard";
import WeaponPanel from "./components/WeaponPanel";
import TalentsCard from "./components/TalentsCard";
import StoryCard from "./components/StoryCard";
import MusicPlayer from "./components/MusicCard";
import GalleryCard from "./components/GalleryCard";
import ConstellationCard from "./components/ConstellationCard";
import MaterialsCard from "./components/MaterialsCard";
import Footer from "./components/Footer";
import MusicCard from "./components/MusicCard";
import { MusicProvider } from "@/app/components/music/MusicContext";
import StickyMiniPlayer from "@/app/components/music/StickyMiniPlayer";
import PlaylistDrawer from "@/app/components/music/PlaylistDrawer";

export default function MagnoliaPage() {
  return (
    <MusicProvider>
      <CharacterHero />
      <InfoCard />
      {/* <MaterialsCard /> */}
      <TalentsCard />
      <ConstellationCard />
      <StoryCard />
      {/* <MusicCard /> */}
      <GalleryCard />
      <Footer />
      <StickyMiniPlayer />
      <PlaylistDrawer />
    </MusicProvider>
  );
}
