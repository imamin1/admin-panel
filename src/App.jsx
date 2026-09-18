import Content from './components/content/index.jsx';
import Navbar from './components/navbar/index.jsx';
import Sidebar from './components/sidebar/index.jsx';

const App = () => {
  return (
    <div className='bg-[url(/image/162.png)] w-full h-screen bg-cover text-white flex'>
      <Sidebar />
      <div className="w-full pr-5">
        <Navbar />
        <Content />
      </div>
    </div>
  );
};

export default App;