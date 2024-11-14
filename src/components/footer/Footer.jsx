
export default function Footer() {
  return (
    <footer className="pl-10 pr-10 bg-white dark:bg-gray-900">
      <div className="py-6 lg:py-8">
              <hr className="my-6 border-gray200 sm:mx-auto dark:border-white-400 border-gray400 lg:my-8" />
        <div className="md:flex md:justify-between">
            {/*LOGO Y LINK A HOME O A HENRY??*/}
          <div className="mb-6 md:mb-0">
            <span className="pl-4 mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              PROYECTO FINAL PARA HENRY
            </span>
            <a href="https://www.soyhenry.com/" className="flex items-center">
              <img
                src="https://neurona-ba.com/wp-content/uploads/2021/07/HenryLogo.jpg"
                className="h-24 me-3"
                alt="Logo SoyHenry"
              />
            </a>
          </div>
            
            {/*COLUMNAS DEL LADO DERECHO*/}
          <div className="grid grid-cols-2 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                CATEGORIAS
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Primer 
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://tailwindcss.com/" className="hover:underline">
                    Segunda 
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Tercer 
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                OFERTAS
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Primer 
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://tailwindcss.com/" className="hover:underline">
                    Segunda 
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Tercer 
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              NOSOTR@S
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="/about" className="hover:underline">
                  About Us
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/ARagustinaramos/CompuTech/tree/develop/back" className="hover:underline">
                  GitHub BACK
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/ARagustinaramos/CompuTech/tree/develop/clientgit " className="hover:underline">
                  GitHub FRONT
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-gray-200 sm:mx-auto dark:border-white-400 border-gray-400 lg:my-4" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 - Hecho con ❤️ por "The migrant's company ". All Rights
            Reserved.
          </span>
        </div>
    </footer>
  );
}