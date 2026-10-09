import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container-header flex justify-start text-white px-5 py-2 max-w-7xl mx-auto gap-8 align-center">
                <div className="logo">
                    <Image
                        src="/logo-header-new.png"
                        alt="PokeUniverse Logo"
                        width={180}
                        height={48}
                        priority
                    />
                </div>
                <nav className="flex items-center">
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/catalogo">
                                Catalogo
                            </Link>
                        </li>
                        <li>
                            <Link href="/catalogo-client">
                                Catalogo Client
                            </Link>
                        </li>
                        <li>
                            <Link href="/upload_videos">
                                Upload de videos
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}