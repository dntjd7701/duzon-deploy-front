import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

export const Navbar = () => {
  //나중에 ripple 넣어보자
  const handleFileSettingBtnClick: React.MouseEventHandler = (e) => {
    const btnElement = e.target as HTMLElement;
    const [ x, y ] = [ e.clientX - btnElement.offsetLeft, e.clientY - btnElement.offsetTop ]

    const animationElement = document.createElement('span');
    animationElement.style.left = x + 'px'; 
    animationElement.style.top = y + 'px'; 
    animationElement.className = 'ripple-btn';

    btnElement.appendChild(animationElement);
    removeElement(animationElement);
  };

  const removeElement = (animationElement: HTMLElement) => {
    setTimeout(() => {
      animationElement.parentNode?.removeChild(animationElement);
    }, 500)
  }

  return (
    <nav className="w-full px-10 sticky top-4 z-50 flex justify-center">
        <div className="container max-w-screen-xl h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
          <div className="h-full w-full px-5 py-2 flex flex-wrap items-center justify-between text-white">
            <span className="font-bold text-inherit mr-4 ml-2">설정</span>
            <div className="flex ml-auto gap-1.5 md:mr-4 ">
              <button
                className="relative overflow-hidden text-white font-bold h-full bg-black py-3 px-6 text-xs hover:opacity-80 active:bg-white/30 active:shadow-button_active rounded-lg shadow-button active:animation-ripple"
                onClick={handleFileSettingBtnClick}>
                배포 파일 세팅하기
              </button>
              <button className="w-10 h-10 hover:bg-white/10 active:bg-white/30 rounded-lg">
                <Cog6ToothIcon className="h-4 w-full" />
              </button>
              <button className="w-10 h-10 hover:bg-white/10 active:bg-white/30 rounded-lg">
                <BellIcon className="h-4 w-full" />
              </button>
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
