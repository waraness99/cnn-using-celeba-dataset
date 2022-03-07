import { HiHome, HiBookOpen, HiCloudDownload, HiQuestionMarkCircle } from "react-icons/hi";
import { FaDiscord, FaInstagram, FaTwitter, FaMediumM } from "react-icons/fa";

export const navbar = [
  {
    id: "home",
    icon: HiHome,
    path: "/",
  },
  {
    id: "link 1",
    icon: HiCloudDownload,
    path: "#",
  },
  {
    id: "link 2",
    icon: HiQuestionMarkCircle,
    path: "#",
  },
  {
    id: "link 3",
    icon: HiBookOpen,
    path: "#",
  },
];

export const footer = [
  {
    id: "home",
    path: "/",
  },
  {
    id: "link 1",
    path: "#",
  },
  {
    id: "link 2",
    path: "#",
  },
  {
    id: "link 3",
    path: "#",
  },
];

export const externalLinks = {
  discord: "https://discord.com",
  twitter: "https://twitter.com/home",
  medium: "https://medium.com",
  instagram: "https://instagram.com",
  email: "hello@example.com",
};

export const social = [
  {
    id: "discord",
    icon: FaDiscord,
    href: externalLinks.discord,
  },
  {
    id: "twitter",
    icon: FaTwitter,
    href: externalLinks.twitter,
  },
  {
    id: "medium",
    icon: FaMediumM,
    href: externalLinks.medium,
  },
  {
    id: "instagram",
    icon: FaInstagram,
    href: externalLinks.instagram,
  },
];
