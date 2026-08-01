import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import Link from "next/link";
import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn, FaTwitter
} from "react-icons/fa";

export default function Footer() {
    const socialLinks = [
        {
            name: "Facebook",
            href: "https://facebook.com",
            icon: FaFacebookF,
        },
        {
            name: "X",
            href: "https://x.com",
            icon: FaTwitter,
        },
        {
            name: "Instagram",
            href: "https://instagram.com",
            icon: FaInstagram,
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            icon: FaLinkedinIn,
        },
        {
            name: "GitHub",
            href: "https://github.com",
            icon: FaGithub,
        },
    ];
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-16">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-bold text-primary"
                        >
                            RentNest
                        </Link>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            Discover verified rental properties, connect with trusted
                            landlords, and manage your rental journey effortlessly.
                        </p>

                        <div className="flex gap-3">
                            {socialLinks.map(({ name, href, icon: Icon }) => (
                                <Link
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border p-2 transition hover:border-primary hover:bg-primary hover:text-white"
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <Link
                                    href="/"
                                    className="transition hover:text-primary"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/properties"
                                    className="transition hover:text-primary"
                                >
                                    Properties
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="transition hover:text-primary"
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="transition hover:text-primary"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold">
                            Categories
                        </h3>

                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <Link
                                    href="/properties?category=apartment"
                                    className="transition hover:text-primary"
                                >
                                    Apartments
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/properties?category=house"
                                    className="transition hover:text-primary"
                                >
                                    Houses
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/properties?category=studio"
                                    className="transition hover:text-primary"
                                >
                                    Studio
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/properties?category=villa"
                                    className="transition hover:text-primary"
                                >
                                    Villas
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold">
                            Contact
                        </h3>

                        <div className="space-y-4 text-muted-foreground">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 h-5 w-5 text-primary" />
                                <span>Dhaka, Bangladesh</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <span>+880 1234 567890</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>support@rentnest.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
                    <p>
                        © {new Date().getFullYear()} RentNest. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link
                            href="/privacy"
                            className="hover:text-primary"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-primary"
                        >
                            Terms of Service
                        </Link>

                        <Link
                            href="/cookies"
                            className="hover:text-primary"
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}