import React from "react";
import Link from "next/link";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  MailIcon,
} from "@/components/icons/socials";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  companyName?: string;
  copyrightYear?: number;
  links?: FooterLink[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    email?: string;
  };
  layout?: "centered" | "multi-column";
  className?: string;
  logo?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({
  companyName = "Kinderly",
  copyrightYear = new Date().getFullYear(),
  links,
  socialLinks,
  layout = "centered",
  className,
  logo,
}) => {
  const layoutClasses = {
    centered: "flex flex-col items-center justify-center text-center",
    "multi-column": "grid grid-cols-1 md:grid-cols-3 gap-8",
  };

  const renderSocialLinks = () => {
    if (!socialLinks) return null;

    return (
      <div className="flex justify-center md:justify-start space-x-4">
        {socialLinks.facebook && (
          <Link
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-gray-400"
          >
            <FacebookIcon className="h-6 w-6" />
          </Link>
        )}
        {socialLinks.twitter && (
          <Link
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-gray-400"
          >
            <TwitterIcon className="h-6 w-6" />
          </Link>
        )}
        {socialLinks.instagram && (
          <Link
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gray-400"
          >
            <InstagramIcon className="h-6 w-6" />
          </Link>
        )}
        {socialLinks.email && (
          <Link
            href={`mailto:${socialLinks.email}`}
            aria-label="Email"
            className="hover:text-gray-400"
          >
            <MailIcon className="h-6 w-6" />
          </Link>
        )}
      </div>
    );
  };

  return (
    <footer
      className={`bg-gray-900 text-white p-6 ${layoutClasses[layout]} ${
        className || ""
      }`}
      aria-label="Footer"
    >
      {logo && <div className="flex justify-center mb-4">{logo}</div>}
      {layout === "multi-column" ? (
        <>
          <div className="text-center md:text-left">
            {links && (
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-gray-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="text-center md:text-left">{renderSocialLinks()}</div>
          <div className="text-center md:text-right">
            <p>
              © {copyrightYear} {companyName}. All rights reserved.
            </p>
          </div>
        </>
      ) : (
        <>
          {links && (
            <ul className="flex justify-center space-x-4 mb-4">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {renderSocialLinks()}
          <p className="mt-4">
            © {copyrightYear} {companyName}. All rights reserved.
          </p>
        </>
      )}
    </footer>
  );
};

export default Footer;