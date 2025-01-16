function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">

        <div className="flex flex-col-reverse items-center justify-between gap-4 md:h-24 md:flex-row " >


            

            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built By {" "} 
                
                <a href="https://github.com/Muhammadib12"
                
                    target="_blank"
                    className="underline font-medium underline-offset-4"
                >

                    Muhammad

                </a>


            </p>

        </div>


    </footer>
  )
}

export default Footer