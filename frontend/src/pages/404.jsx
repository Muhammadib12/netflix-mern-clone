import { Link } from "react-router-dom"



function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cover flex flex-col justify-center items-center text-white" style={{backgroundImage: `url('/404.png')`}}>
          <header className="absolute top-0 left-0 p-4 bg-black w-full">
            <Link to={"/"}>
                <img src={"/netflix-logo.png"} alt="Netflix" className="h-8"/>

            </Link>
          </header>

          <main className="text-center error-page--conten z-10 ">
              <h1 className="text-7xl font-semibold mb-4">
                Lost You'r Way?
              </h1>

              <p className="mb-6 text-3xl">
                Sorry, we can't find that page. You'll find lots to explore on the page.
              </p>
              <Link to={"/"} className="bg-white text-black py-2 px-4 rounded">Netflix Home.</Link>

          </main>


    </div>
  )
}

export default NotFoundPage