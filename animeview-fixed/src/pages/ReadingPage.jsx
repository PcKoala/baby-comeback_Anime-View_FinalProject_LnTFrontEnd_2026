import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReadingPage = () => (
  <div className="min-h-screen w-full bg-[#141414] flex flex-col">
    <Navbar />
    <main className="flex-1 max-w-3xl mx-auto w-full px-8 py-8">
      <h1 className="text-white font-bold text-xl mb-6">Kimetsu No Yaba — Chapter 1</h1>
      {[1,2,3,4,5].map(i => (
        <div key={i} className="w-full bg-[#222] mb-3" style={{ height: '560px' }} />
      ))}
      <div className="flex items-center justify-between mt-6">
        <button className="border border-[#333] text-[#666] hover:border-white hover:text-white transition-colors px-5 py-2 text-sm">← Prev Chapter</button>
        <span className="text-[#555] text-sm">Chapter 1</span>
        <button className="border border-[#333] text-[#666] hover:border-white hover:text-white transition-colors px-5 py-2 text-sm">Next Chapter →</button>
      </div>
    </main>
    <Footer />
  </div>
);
export default ReadingPage;
