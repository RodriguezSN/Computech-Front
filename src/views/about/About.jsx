export default function AboutComponent() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
      {/* Primera fila de tarjetas */}
      <div className="pb-0 flex justify-center flex-wrap">
        <div className="w-60 mr-4 mb-4 pt-1">
          {/*Flor*/}
          <div className="group before:hover:scale-95 before:hover:h72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:absolute before:top-0 w-80 h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
            <img src="/assets/Flor.jpeg" className="w-25 h-28 mt-10 rounded-full border-4 border-slate-50 dark:border-gray-700 z-10 group-hover:scale-146 group-hover:-translate-x-15 group-hover:-translate-y-10 transition-all duration-500" />
            <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-bold">María Florencia</span>
              <p className="text-3 font-semibold pb-3">Batalla Córdoba</p>
              <a href="https://www.linkedin.com/in/mariflor/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Linkedin</a>
              <a href="https://github.com/MariaFlorenciaGala" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Github</a>
            </div>
          </div>
        </div>
        <div className="w-60 mr-4 mb-4 pt-1">
          {/*Gilbert*/}
          <div className="group before:hover:scale-95 before:hover:h72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:absolute before:top-0 w-80 h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
            <img src="assets/Gilbert.jpeg" className="w-25 h-28 mt-10 rounded-full border-4 dark:border-gray-700 z-10 group-hover:scale-146 group-hover:-translate-x-15 group-hover:-translate-y-10 transition-all duration-500" />
            <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-bold">Gilberto</span>
              <p className="text-3 font-semibold pb-3">Díaz Pimentel</p>
              <a href="https://www.linkedin.com/in/gilberto-d%C3%ADaz-pimentel-018a34165/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Linkedin</a>
              <a href="https://github.com/Gitbertod" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Github</a>
            </div>
          </div>
        </div>
        <div className="w-60 mr-4 mb-4 pt-1">
          {/*Agus*/}
          <div className="group before:hover:scale-95 before:hover:h72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:absolute before:top-0 w-80 h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
            <img src="/assets/Agus.jpg" className="w-25 h-28 mt-10 rounded-full border-4 border-slate-50 dark:border-gray-700 z-10 group-hover:scale-146 group-hover:-translate-x-15 group-hover:-translate-y-10 transition-all duration-500" />
            <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-bold">Agustina</span>
              <p className="text-3 font-semibold pb-3">Ramos</p>
              <a href="https://www.linkedin.com/in/agustina-ramos-b976738b/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Linkedin</a>
              <a href="https://github.com/ARagustinaramos" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Github</a>
            </div>
          </div>
        </div>
        <div className="w-80 mb-4 pt-1">
          {/*Jor*/}
          <div className="group before:hover:scale-95 before:hover:h72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:absolute before:top-0 w-80 h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
            <img src="/assets/Jorge.jpg" className="w-25 h-28 mt-10 rounded-full border-4 border-slate-50 dark:border-gray-700 z-10 group-hover:scale-146 group-hover:-translate-x-15 group-hover:-translate-y-10 transition-all duration-500" />
            <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-bold">Jorge</span>
              <p className="text-3 font-semibold pb-3">Gonzalez</p>
              <a href="https://www.linkedin.com/in/jorge-gonzález-garcía-548a33171/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Linkedin</a>
              <a href="https://github.com/JGonzalezGarcia10" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Github</a>
            </div>
          </div>
        </div>
      </div>
      {/* Segunda fila de tarjetas */}
      <div className="pt-0 flex justify-center flex-wrap">
        <div className="w-60 mr-4 mb-4 pt-1">
          {/*Sebas*/}
          <div className="group before:hover:scale-95 before:hover:h72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:absolute before:top-0 w-80 h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
            <img src="/assets/Sebas.jpg" className="w-25 h-28 mt-10 rounded-full border-4 border-slate-50 dark:border-gray-700 z-10 group-hover:scale-146 group-hover:-translate-x-15 group-hover:-translate-y-10 transition-all duration-500" />
            <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-bold">Nicolás Sebastian</span>
              <p className="text-3 font-semibold pb-3">Rodriguez</p>
              <a href="https://www.linkedin.com/in/sebastian-nicolas-rodriguez-271b26202/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Linkedin</a>
              <a href="https://github.com/RodriguezSN" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Github</a>
            </div>
          </div>
        </div>
        <div className="w-60 mr-4 mb-4 pt-1">
          {/*Ia*/}
          <div className="group before:hover:scale-95 before:hover:h72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:absolute before:top-0 w-80 h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
            <img src="/assets/Ia.jpg" className="w-25 h-28 mt-10 rounded-full border-4 border-slate-50 dark:border-gray-700 z-10 group-hover:scale-146 group-hover:-translate-x-15 group-hover:-translate-y-10 transition-all duration-500" />
            <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-bold">Iara</span>
              <p className="text-3 font-semibold pb-3">Baudino</p>
              <a href="https://www.linkedin.com/in/iara-yael-baudino-70158684/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Linkedin</a>
              <a href="https://github.com/IarBaudino" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Github</a>
            </div>
          </div>
        </div>
        <div className="w-60 mr-4 mb-4 pt-1">
          {/*Her*/}
          <div className="group before:hover:scale-95 before:hover:h72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:absolute before:top-0 w-80 h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
            <img src="/assets/Her.jpg" className="w-25 h-28 mt-10 rounded-full border-4 border-slate-50 dark:border-gray-700 z-10 group-hover:scale-146 group-hover:-translate-x-15 group-hover:-translate-y-10 transition-all duration-500" />
            <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-bold">Hernán</span>
              <p className="text-3 font-semibold pb-3">Ponce de León Aguirre</p>
              <a href="https://www.linkedin.com/in/hernán-ponce-de-león-aguirre-12031b21b/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Linkedin</a>
              <a href="https://github.com/HPoncedeLeonAguirre" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Github</a>
            </div>
          </div>
        </div>
        <div className="w-80 mb-4 pt-1">
          {/*Lau*/}
          <div className="group before:hover:scale-95 before:hover:h72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:absolute before:top-0 w-80 h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
            <img src="/assets/Lau.jpg" className="w-25 h-28 mt-10 rounded-full border-4 border-slate-50 dark:border-gray-700 z-10 group-hover:scale-146 group-hover:-translate-x-15 group-hover:-translate-y-10 transition-all duration-500" />
            <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-bold">Laura Camila</span>
              <p className="text-3 font-semibold pb-3">Tiusabá Gómez</p>
              <a href="https://www.linkedin.com/in/laura-tiusabá-005614268/" target="_blank" rel="noopener noreferrer" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Linkedin</a>
              <a href="https://github.com/LauraCamila99" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Github</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}