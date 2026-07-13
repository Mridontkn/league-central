import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="content">
        {children}
      </main>
      <BottomNav />
    </>
  );
}